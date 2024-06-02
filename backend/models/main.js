const { Model, DataTypes } = require("sequelize");
const db = require("../util/db");

class User extends Model {}
User.init(
  {
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      get() {
        return `${process.env.NODE_HOST}/${this.getDataValue("avatar")}`;
      },
    },
  },
  { sequelize: db, modelName: "user", freezeTableName: true }
);

class Posting extends Model {}
Posting.init(
  {
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING(4096),
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "posting", freezeTableName: true }
);

class Vote extends Model {}
Vote.init(
  {
    isupvote: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize: db, modelName: "vote", freezeTableName: true }
);

// define model associations
User.hasMany(Posting, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "authorId",
});

Posting.belongsTo(User, { foreignKey: "authorId" });

User.belongsToMany(Posting, { through: "vote" });
Posting.belongsToMany(User, { through: "vote" });

Posting.hasMany(Posting, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "parentId",
});

module.exports = {
  User,
  Posting,
  Vote,
};
