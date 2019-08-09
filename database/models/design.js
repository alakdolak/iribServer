let sequelize = require('../config');
let Sequelize = require('sequelize');

module.exports = sequelize.define('design', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    sidebar: {type: Sequelize.BOOLEAN, defaultValue: true},
    sidebar_size: {type: Sequelize.INTEGER, defaultValue: 1},
    //TRUE ==> RTL
    //FALSE ==> LTR
    direction: {
        type : Sequelize.BOOLEAN , defaultValue: true
    },
    // newsOrder: {
    //     type: Sequelize.INTEGER, defaultValue: 1
    // },
    // commentsOrder: {
    //     type: Sequelize.INTEGER, defaultValue: 2
    // }

}, {timestamps: false});
