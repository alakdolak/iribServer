const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('statistics', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    totalVisits: {
        type: Sequelize.INTEGER, defaultValue: 0
    },
    currentDate: {
        type: Sequelize.STRING
    }

}, {timestamps: false});
