const { Sequelize } = require("sequelize");
const logger = require("./log");

const db = new Sequelize(
  process.env.NODE_DBSCHEMA,
  process.env.NODE_DBUSER,
  process.env.NODE_DBPWD,
  {
    dialect: process.env.NODE_DBDIALECT,
    port: parseInt(process.env.NODE_DBPORT),
    host: process.env.NODE_DBHOST,
    logging: logger.debug.bind(logger),
  }
);

module.exports = db;
