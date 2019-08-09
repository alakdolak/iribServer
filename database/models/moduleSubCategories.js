let Sequelize = require('sequelize');
let sequelize = require('../config');

const Module = sequelize.define('moduleSubCategories', {
    id: {type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true},
});

module.exports = Module;


