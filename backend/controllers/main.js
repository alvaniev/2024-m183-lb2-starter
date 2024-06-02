const token = require("jsonwebtoken");
const { User, Posting, Vote } = require("../models/main");

const c = require("../util/const");
const helper = require("../util/helper");
const bcrypt = require("bcrypt");

exports.getHelloWorld = (req, res, next) => {
  res.status(200).json({
    message: "Hello World",
  });
};

exports.doNothing = (req, res, next) => {
  res.status(200).json({});
};

exports.postMessage = (req, res, next) => {
  const header = req.body.header;
  const content = req.body.content;

  res.status(201).json({
    statusmessage: "Message posted successfully",
    post: { id: new Date().toISOString(), header: header, content: content },
  });
};

exports.signup = async (req, res, next) => {
  try {
    await User.add(
      req.body.firstname,
      req.body.lastname,
      req.body.username,
      req.body.pwd,
      req.body.avatar
    );
    let result = await User.getByUsername(req.body.username);
    res.status(c.HTTP_STATUS_CREATED).json(result);
  } catch (err) {
    if (err.errno == c.ERR_DB_DUP_ENTRY) {
      err.statusCode = c.HTTP_STATUS_CONFLICT;
      err.message = `User already exists.`;
    } else {
      err.statusCode = c.HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    let result = new Array(0);
    if (helper.isEmpty(req.query)) {
      result = await User.getByIds(req.params.ids);
    } else {
      try {
        result = await User.filter(req.query);
      } catch (err) {
        if (err.errno != c.ERR_DB_UNKONW_COLUMN) {
          throw err;
        }
      }
    }
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUsers = async (req, res, next) => {
  try {
    const result = await User.deleteByIds(req.params.ids);
    res.status(200).json({usersDeleted: result.affectedRows});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePostings = async (req, res, next) => {
  try {
    const result = await Posting.deleteByIds(req.params.ids);
    res.status(200).json({postingsDeleted: result.affectedRows});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.login = async (req, res, next) => {
  const username = req.body.username;
  const pwd = req.body.pwd;

  try {
    const result = await User.getByUsername(username);

    if (result.length == 1 && bcrypt.compareSync(pwd, result[0].pwd)) {
      const jwt = token.sign({ userid: result[0].id }, c.JWTSECTRET, {
        expiresIn: c.JWTEXPIRATION,
      });
      res.status(c.HTTP_STATUS_OK).json({
        jwt: jwt,
        id: result[0].id,
        username: result[0].username,
        firstname: result[0].firstname,
        lastname: result[0].lastname,
        avatar: result[0].avatar,
      });
    } else {
      const err = new Error("Authentication failed.");
      err.statusCode = c.HTTP_STATUS_UNAUTHORIZED;
      throw err;
    }
  } catch (err) {
    if (err.statusCode != c.HTTP_STATUS_UNAUTHORIZED) {
      err.statusCode = c.HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.getPostings = async (req, res, next) => {
  try {
    let result = new Array(0);
    if (helper.isEmpty(req.query)) {
      result = await Posting.getByIds(req.params.ids);
    } else {
      try {
        result = await User.Posting(req.query);
      } catch (err) {
        if (err.errno != c.ERR_DB_UNKONW_COLUMN) {
          throw err;
        }
      }
    }
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getSubPostings = async (req, res, next) => {
  try {
    let result = new Array(0);
    if (req.params.id.toLowerCase() === "null") {
      result = await Posting.getByParentId(null);
    } else {
      result = await Posting.getByParentId(req.params.id);
    }
    res.status(200).json(result);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.vote = async (req, res, next) => {
  try {
    await Vote.add(req.body.postingid, req.body.userid, req.body.isupvote);
    let result = await Posting.getByIds(req.body.postingid);
    res.status(c.HTTP_STATUS_CREATED).json(result);
  } catch (err) {
    if (err.errno == c.ERR_DB_DUP_ENTRY) {
      // that's normal. user has already voted that post, so continue by returning current posting
      // untouched votings
      try {
        let result = await Posting.getByIds(req.body.postingid);
        res.status(c.HTTP_STATUS_CREATED).json(result);
      } catch (err1) {
        err1.statusCode = c.HTTP_STATUS_INETERNAL_SERVER_ERROR;
        next(err1);
      }
    } else {
      err.statusCode = c.HTTP_STATUS_INETERNAL_SERVER_ERROR;
      next(err);
    }
  }
};

exports.addPosting = async (req, res, next) => {
  try {
    const now = new Date().toISOString().replace('T', ' ').replace('Z', '');
    let dbResult;

    dbResult = await Posting.add(
      req.body.title,
      req.body.content,
      now,
      req.body.authorid,
      req.body.parentid
    );
    let result = await Posting.getByIds(dbResult.insertIds[0]);
    res.status(c.HTTP_STATUS_CREATED).json(result);
  } catch (err) {
    err.statusCode = c.HTTP_STATUS_INETERNAL_SERVER_ERROR;
    next(err);
  }
};

exports.unvote = async (req, res, next) => {
  try {
    const result = await Vote.remove(req.params.postingid, req.params.userid);
    res.status(200).json({ votesDeleted: result.affectedRows });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
