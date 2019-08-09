let Sequelize = require('sequelize');
let sequelize = require('../config');
let Module = require('./modules');
let News = require('./news');

const ModuleNews = sequelize.define('module_news', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    active_since: {
        type: Sequelize.DATE,
        allowNull: true,
    }

});

module.exports = ModuleNews;


