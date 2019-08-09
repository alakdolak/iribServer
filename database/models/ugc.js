const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('ugc', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: {
        type: Sequelize.STRING,
    },
    name: Sequelize.STRING,
    userId: Sequelize.STRING,
    password: Sequelize.STRING
});
