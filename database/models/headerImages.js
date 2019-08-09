const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('headerImage', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    selected: {
        type: Sequelize.BOOLEAN, defaultValue: false
    }
});
