const log = require("winston");
// destructuring: get properties from log.format object
const { combine, timestamp, prettyPrint, errors } = log.format;
const path = require("path");

module.exports = log.createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
    errors({stack: true})
    ),
  transports: [
    new log.transports.File({
      filename: path.join("log", "api.log"),
      level: process.env.NODE_LOGLEVEL,
    }),
  ],
});
