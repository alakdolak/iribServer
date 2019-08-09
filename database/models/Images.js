const sequelize = require("../config");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "images",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Name: {
      type: Sequelize.STRING
    },

    Description: {
      type: Sequelize.TEXT
    },

    originalName: {
      type: Sequelize.STRING
    },
    type: Sequelize.STRING
  },
  {
    freezeTableName: true,

    // define the table's name
    tableName: "images"
  }
);
