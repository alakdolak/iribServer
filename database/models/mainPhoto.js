const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('mainphoto', {
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
	tableName: 'mainphoto',
	freezeTableName: true
});
