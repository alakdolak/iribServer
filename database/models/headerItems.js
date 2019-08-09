let sequelize = require('../config');
let Sequelize = require('sequelize');

module.exports = sequelize.define('headerItems', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    text: {
        type: Sequelize.STRING
    },
    redirectType: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    redirect: {
        // 0 --> page
        // 1 --> category
        // 2 --> subCategory
        type: Sequelize.INTEGER,
    },
    hasMenu: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isMenu: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    parentId: {
        type: Sequelize.INTEGER,
    }

}, { timestamps: false });
