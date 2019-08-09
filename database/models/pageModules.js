const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('page_modules', {
    id: {type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true},
    //0 --> detail sidebar      1 --> detail main
    type: Sequelize.INTEGER,
    order: {
        type: Sequelize.INTEGER , defaultValue: 0
    }
}, {timestamps: false});
