const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('tags', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    englishTitle: {

        type: Sequelize.STRING,


    },

    title: {

        type: Sequelize.STRING,


    },

    createdBy: {

        type: Sequelize.STRING
    },

    editedBy: {

        type: Sequelize.STRING
    },

}, {
    freezeTableName: true,

    // define the table's name
    tableName: 'tags',
});
