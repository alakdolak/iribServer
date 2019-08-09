const sequelize = require('../config');
const Sequelize = require('sequelize');


module.exports = sequelize.define('main_rows', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    order: {
        type: Sequelize.INTEGER, defaultValue: 0
    },
    title: {
        type: Sequelize.STRING, defaultValue: ''
    },
    fluid: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    type: {
        type: Sequelize.INTEGER, defaultValue: 0
    },
    height: {
        type: Sequelize.INTEGER, defaultValue: 0,
    },
    width: {
        type: Sequelize.INTEGER, defaultValue: 0,
    },
    right: {
        type: Sequelize.INTEGER, defaultValue: 0,
    },
    top: {
        type: Sequelize.INTEGER, defaultValue: 0,
    },
    backgroundColor: {
        type: Sequelize.STRING,
        defaultValue: '#ffffff'
    },
    color: {
        type: Sequelize.STRING,
        defaultValue: '#ffffff'
    },
    headerBackgroundColor: {
        type: Sequelize.STRING,
        defaultValue: '#004890'
    },
    // borderColor: {
    //     type: Sequelize.STRING,
    //     defaultValue: '#ffffff'
    // },
    font: {
        type: Sequelize.STRING,
        defaultValue: 1
    }
}, { timestamps: false });
