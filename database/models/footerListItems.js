let sequelize = require("../config");
let Sequelize = require("sequelize");

module.exports = sequelize.define(
  "footerListItem",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    // 0 FOR PAGE
    // 1 FOR CATEGORY
    // 2 FOR SUBCATEGORY
    type: Sequelize.INTEGER,
    text: Sequelize.STRING,
    url: Sequelize.STRING
  },
  { timestamps: false }
);
