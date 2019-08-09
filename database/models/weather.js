const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('weather', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    backgroundColor: {
        type: Sequelize.STRING, defaultValue: '#0c0c0c'
    },
    color: {
        type: Sequelize.STRING, defaultValue: '#ffffff'
    },
    ipLocationUrl: {
        type: Sequelize.STRING, defaultValue: 'http://ip-api.com/json'
    },
    ipLocationEnable: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    locationAutomatic: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    location: {
        type: Sequelize.STRING, defaultValue: 'tehran'
    },
    appKey: {
        type: Sequelize.STRING, defaultValue: 'e031bd64382f29dbfebc7bd555d1833f'
    }

}, {timestamps: false});
