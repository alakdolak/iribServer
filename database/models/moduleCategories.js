let Sequelize = require('sequelize');
let sequelize = require('../config');

const Module = sequelize.define('moduleCategories', {
    id: {type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true},
});

module.exports = Module;


