const sequelize = require("../config");
const Sequelize = require("sequelize");

module.exports = sequelize.define("breakingDesign", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  backgroundColor: {
    type: Sequelize.TEXT,
    defaultValue: "#dc3545"
  },
  textColor: {
    type: Sequelize.TEXT,
    defaultValue: "#000000"
  },
  interval: {
    type: Sequelize.INTEGER,
    defaultValue: 4000
  }
});
