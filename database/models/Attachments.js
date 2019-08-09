const sequelize = require("../config");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "attachements",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },

    type: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    tableName: "attachements"
  }
);
