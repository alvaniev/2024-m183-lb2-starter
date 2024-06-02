const {
  JWTSECTRET,
  JWTEXPIRATION,
  BCRYPTSALTROUNDS,
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INETERNAL_SERVER_ERROR,
  HTTP_STATUS_UNPROCESSABLE_CONTENT,
  SEQ_DB_ERR,
  SEQ_UNIQUE_CONSTRAINT_ERR,
} = require("../util/const");

const { isEmpty } = require("../util/helper");
const { User } = require("../models/main");
const logger = require("../util/log");

const bcrypt = require("bcrypt");
const token = require("jsonwebtoken");
const {isAlpha, isEmail, isStrongPassword} = require("validator");
const { SequelizeUniqueConstraintError } = require("sequelize");
const { loggers } = require("winston");
const { restart } = require("nodemon");

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const pwd = req.body.pwd;

  try {
    let user = await User.findOne({
      where: { username: username },
    });

    if (!isEmpty(user) && bcrypt.compareSync(pwd, user.pwd)) {
      let jwt = token.sign({}, JWTSECTRET, {
        expiresIn: JWTEXPIRATION,
        subject: user.id.toString(),
      });
      user.setDataValue("jwt", jwt);
      // do not disclose pwd, even if hashed
      user.setDataValue("pwd", null);
      res.status(HTTP_STATUS_OK).json(user);
    } else {
      const err = new Error("Authentication failed.");
      err.statusCode = HTTP_STATUS_UNAUTHORIZED;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {

    //do validatioin stuff
    const acceptSpecialChars = { ignore: "-'âàáêèëéïíîìòóôûùúñÂÀÁÊÈËÉÏÍÎÌÒÓÔÛÙÚÑ" };
    if (
      !isStrongPassword (req.body.pwd, {minLength: 7}) ||
      !isAlpha(req.body.firstname, "de-DE", acceptSpecialChars) ||
      !isAlpha(req.body.lastname, "de-DE", acceptSpecialChars) ||
      !isEmail(req.body.username, { allow_underscores: true })
    ) {
      const err = new Error("Unprocessable Content");
      err.statusCode = HTTP_STATUS_UNPROCESSABLE_CONTENT;
      throw err;
    }

    const hashedPwd = bcrypt.hashSync(req.body.pwd, BCRYPTSALTROUNDS);
    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      pwd: hashedPwd,
      avatar: req.body.avatar,
    });
    // do not disclose pwd, even if hashed
    user.setDataValue("pwd", null);
    res.status(HTTP_STATUS_CREATED).json(user);
  } catch (err) {
    if (err.name === SEQ_UNIQUE_CONSTRAINT_ERR) {
      err.statusCode = HTTP_STATUS_CONFLICT;
      err.message = `User already exists.`;
    }
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    let users = new Array();
    users = await User.findAll({ where: { id: req.params.ids.split(",") } });
    for (const user of users) {
      // do not disclose pwd, even if hashed
      user.setDataValue("pwd", null);
    }
    res.status(HTTP_STATUS_OK).json(users);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.filterUsers = async (req, res, next) => {
  try {
    let users = new Array(0);
    if (isEmpty(req.query)) {
      users = await User.findAll();
    } else {
      try {
        users = await User.findAll({ where: req.query });
      } catch (err) {
        if (err.name === SEQ_DB_ERR) {
          err.message = "Invalid query string.";
          err.statusCode = HTTP_STATUS_BAD_REQUEST;
          throw err;
        }
      }
    }
    for (const user of users) {
      // do not disclose pwd, even if hashed
      user.setDataValue("pwd", null);
    }

    res.status(HTTP_STATUS_OK).json(users);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let countDeletedUsers = 0;
    let httpStatus = HTTP_STATUS_NOT_FOUND;
    if (!isEmpty(req.params.id)) {
      countDeletedUsers = await User.destroy({
        where: { id: req.params.id },
      });
    }
    if (countDeletedUsers != 0) {
      httpStatus = HTTP_STATUS_OK;
    }
    res.status(httpStatus).json({ usersDeleted: countDeletedUsers });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};


exports.getUser = async (req, res, next) => {
  try {
    let httpStatus = HTTP_STATUS_NOT_FOUND;
    let user = null;
    if (!isEmpty(req.params.id)) {
      user = await User.findByPk(req.params.id);
    }
    if (!isEmpty(user)) {
      httpStatus = HTTP_STATUS_OK;
      user.setDataValue("pwd", null);
    }
    res.status(httpStatus).json(user);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};
