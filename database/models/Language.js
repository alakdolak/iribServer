let sequelize = require('../config');
let Sequelize = require('sequelize');

module.exports = sequelize.define('languages', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: Sequelize.STRING,
    },

    createdBy: {
        type: Sequelize.STRING
    },

    editedBy: {
        type: Sequelize.STRING
    },


}, { timestamps: false });
