// importing genereal modules

//load environment
require("dotenv").config();

// module for handling http requests and responses and managing routes
const express = require("express");

// helper for concatinating paths
const path = require("path");
// some helper functions
const { sleep } = require("./util/helper");

// importing self-developed moudules
const routes = require("./routes/main");

// importing log utilities
const logger = require("./util/log");

// importing constants
const { HTTP_STATUS_INETERNAL_SERVER_ERROR } = require("./util/const");

// importing helper functions
const { isEmpty } = require("./util/helper");

const api = express();

// initialize body-parser for JSON-format
api.use(express.json());

// get constants
const { STATIC_DIR } = require("./util/const");

// Setting response header to allow cross origin requests
// CORS-Settings.
api.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// set static path for public dirctory
api.use(express.static(path.join(process.cwd(), STATIC_DIR)));

api.use(routes);
// fallback: redirect to / in case there is no routing match
api.use((req, res, next) => {
  res.redirect("/");
});

// error handler sends error message as json
// error handler sends error message as json
api.use((err, req, res, next) => {
  if (isEmpty(err.statusCode)) {
    err.statusCode = HTTP_STATUS_INETERNAL_SERVER_ERROR;
  }

  logger.error(err.message, {
    errno: err.errno,
    error: err,
  });
  res.status(err.statusCode).json({
    errorMessage: err.message,
  });
});



// initialize database connection
const db = require("./util/db");

// initialize models
const { User, Posting, Vote } = require("./models/main");

// get sample data
const { sampleUsers, samplePostings, sampleVotes } = require("./util/sampledata");


// try to connect to database. load sample data to db and start listener
(async () => {
  try {
    // sync database and load sample data while project code is under developement
    // check environment variable NODE_DBSYNC
    if (process.env.NODE_DBSYNC === "true") {
      // polling five times for ready database
      let isDbReady = false;
      for (let i = 0; i < 5; i++) {
        try {
          await db.authenticate();
          isDbReady = true;
          break;
        } catch (err) {}
        await sleep(10000);
      }

      if (isDbReady) {
        await db.sync({ force: true });
        // load sample users
        for (const user of sampleUsers) {
          await User.create({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            pwd: user.pwd,
            avatar: user.avatar,
          });
        }
        // load sample postings
        for (const posting of samplePostings) {
          await Posting.create({
            id: posting.id,
            title: posting.title,
            content: posting.content,
            timestamp: posting.timestamp,
            authorId: posting.author_id,
            parentId: posting.parent_id,
          });
        }
        // load sample users
        for (const vote of sampleVotes) {
          await Vote.create({
            userId: vote.user_id,
            postingId: vote.posting_id,
            isupvote: vote.isupvote,
          });
        }
      } else {
        throw new Error("Database connection could not be established");
      }
    }
  } catch (err) {
    logger.error(err.message, {
      errno: err.errno,
      error: err,
    });
  } finally {
    api.listen(3000);
  }
})();
