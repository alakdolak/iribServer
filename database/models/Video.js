const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('videos', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
    },
    location: {
        type: Sequelize.STRING,
    },

    description: {
        type: Sequelize.TEXT
    },

    originalName: {
        type: Sequelize.STRING,
    },
    type: {
        type: Sequelize.STRING
    },


}, {
        freezeTableName: true,

        // define the table's name
        tableName: 'videos',
    });
