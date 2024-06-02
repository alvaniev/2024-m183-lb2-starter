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
  SEQ_DB_ERR,
  SEQ_UNIQUE_CONSTRAINT_ERR,
} = require("../util/const");

const { isEmpty } = require("../util/helper");
const { Posting, User, Vote } = require("../models/main");
const { Op, Sequelize } = require("sequelize");

const voteCounts = {
  include: [
    [
      Sequelize.literal(`(SELECT 
                COUNT(*)
            FROM
                vote
            WHERE
                vote.postingid = posting.id
                    AND vote.isupvote = 1)`),
      "upvotes",
    ],
    [
      Sequelize.literal(`(SELECT 
                COUNT(*)
            FROM
                vote
            WHERE
                vote.postingid = posting.id
                    AND vote.isupvote = 0)`),
      "downvotes",
    ],
  ],
};

function preparePostingObj(posting) {
  return {
    id: posting.id,
    title: posting.title,
    content: posting.content,
    timestamp: posting.timestamp,
    upvotes: posting.getDataValue("upvotes"),
    downvotes: posting.getDataValue("downvotes"),
    parentId: posting.parentId,
    authorId: posting.authorId,
    firstname: posting.user.firstname,
    lastname: posting.user.lastname,
    username: posting.user.username,
    avatar: posting.user.avatar,
  };
}

function preparePostingObjList(postings) {
  let preparedPostingObjList = new Array(0);
  for (const posting of postings) {
    preparedPostingObjList.push(preparePostingObj(posting));
  }
  return preparedPostingObjList;
}

exports.getToplevelPostings = async (req, res, next) => {
  try {
    let postings = new Array(0);
    postings = await Posting.findAll({
      where: { parentId: { [Op.is]: null } },
      include: User,
      attributes: voteCounts,
      order: [["timestamp", "DESC"]],
    });
    res.status(HTTP_STATUS_OK).json(preparePostingObjList(postings));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.getPostingById = async (req, res, next) => {
  try {
    const posting = await Posting.findByPk(req.params.id, {
      include: User,
      attributes: voteCounts,
    });
    res.status(HTTP_STATUS_OK).json(preparePostingObj(posting));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.getPostingsOfAuthor = async (req, res, next) => {
  try {
    const postings = await Posting.findAll({
      where: { authorId: req.params.id },
      order: [["id", "ASC"]],
    });
    res.status(HTTP_STATUS_OK).json(postings);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.vote = async (req, res, next) => {
  try {
    const vote = await Vote.create({
      postingId: req.body.postingId,
      isupvote: req.body.isupvote,
      userId: parseInt(req.params.id),
    });

    let posting = await Posting.findByPk(req.body.postingId, {
      include: User,
      attributes: voteCounts,
    });
    res.status(HTTP_STATUS_CREATED).json(preparePostingObj(posting));
  } catch (err) {
    if (err.name === SEQ_UNIQUE_CONSTRAINT_ERR) {
      // that's normal. user has already voted that post, so continue by returning current posting
      // untouched votings
      try {
        posting = await Posting.findByPk(req.body.postingId, {
          include: User,
          attributes: voteCounts,
        });
        res.status(HTTP_STATUS_OK).json(preparePostingObj(posting));
      } catch (err1) {
        err1.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
        next(err1);
      }
    } else {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
      next(err);
    }
  }
};

exports.getSubPostings = async (req, res, next) => {
  try {
    let postings = new Array(0);
    postings = await Posting.findAll({
      where: { parentId: req.params.id },
      include: User,
      attributes: voteCounts,
      order: [["timestamp", "DESC"]],
    });
    res.status(HTTP_STATUS_OK).json(preparePostingObjList(postings));
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.addToplevelPosting = async (req, res, next) => {
  try {
    const posting = await Posting.create({
      title: isEmpty(req.body.title) ? "" : req.body.title,
      content: isEmpty(req.body.content) ? "" : req.body.content,
      authorId: req.body.authorId,
      timestamp: new Date(),
    });

    res.status(HTTP_STATUS_CREATED).json(posting);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.addSubPosting = async (req, res, next) => {
  try {
    const posting = await Posting.create({
      title: isEmpty(req.body.title) ? "" : req.body.title,
      content: isEmpty(req.body.content) ? "" : req.body.content,
      authorId: req.body.authorId,
      parentId: parseInt(req.params.id),
      timestamp: new Date(),
    });

    res.status(HTTP_STATUS_CREATED).json(posting);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};

exports.unvote = async (req, res, next) => {
  try {
    let countDeletedVotes = 0;
    let httpStatus = HTTP_STATUS_NOT_FOUND;
    countDeletedVotes = await Vote.destroy({
      where: { userId: req.params.userId, postingId: req.params.postingId },
    });
    if (countDeletedVotes != 0) {
      httpStatus = HTTP_STATUS_OK;
    }
    res.status(httpStatus).json({ votesDeleted: countDeletedVotes });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
    }
    next(err);
  }
};
