const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('redirect', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    type: {
        // 0 --> page
        // 1 --> category
        // 2--> subCategory
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    redirect: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    url: {
        type: Sequelize.STRING
    }
}, {
        timestamps: false
    });