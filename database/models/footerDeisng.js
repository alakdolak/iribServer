let sequelize = require('../config');
let Sequelize = require('sequelize');

module.exports = sequelize.define('footerDesign', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    numberOfRows: {
        type: Sequelize.INTEGER, defaultValue: 1
    },
    numberOfListsPerRow: {
        type: Sequelize.INTEGER, defaultValue: 3
    },
    textColor: {
        type: Sequelize.STRING, defaultValue: '#ffffff',
    },
    backgroundColor: {
        type: Sequelize.STRING, defaultValue: '#000000'
    }
}, {timestamps: false});
