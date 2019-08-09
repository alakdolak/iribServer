let sequelize = require('../config');
let Sequelize = require('sequelize');

module.exports = sequelize.define('footerList', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    title: Sequelize.STRING,

}, {timestamps: false});
