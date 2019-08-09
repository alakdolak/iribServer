const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('pages', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    type: {
        type: Sequelize.INTEGER, defaultValue: 0
    },
    redirectable: {
        type: Sequelize.BOOLEAN, defaultValue: true
    }
}, {
        timestamps: false
    });