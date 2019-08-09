let sequelize = require('../config');
let Sequelize = require('sequelize');

module.exports = sequelize.define('headerDesign', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    type: {
        // 0 for default
        // 1 for sticky
        type: Sequelize.INTEGER, defaultValue: 1
    },
    menuItems: {
        type: Sequelize.INTEGER, defaultValue: 4
    },
    backgroundColor: {
        type: Sequelize.STRING, defaultValue: '#203E90'
    },
    textColor: {
        type: Sequelize.STRING, defaultValue: '#ffffff'
    },
    pagesString: {
        type: Sequelize.STRING
    },
    height: {
        type: Sequelize.INTEGER, defaultValue: 210
    }

}, { timestamps: false });
