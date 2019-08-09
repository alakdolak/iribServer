const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('share', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    icon: Sequelize.STRING,
    title: Sequelize.STRING,
    showTitle: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: false
});