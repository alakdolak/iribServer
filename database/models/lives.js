const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('lives', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    url: Sequelize.STRING,
    backup: Sequelize.STRING
});
