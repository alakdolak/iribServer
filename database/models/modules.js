let Sequelize = require('sequelize');
let sequelize = require('../config');

const Module = sequelize.define('modules', {
    id: {type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    automatic: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    replaceMode: {
        // 0 ==> least point
        // 1 ==> oldest active_since
        // 2 ==> oldest news create data
        type: Sequelize.INTEGER, defaultValue: 0
    },
    newsNumber: {
        type: Sequelize.INTEGER, defaultValue: 20,
    },
    maxActives: {
        type: Sequelize.INTEGER, defaultValue: 5
    },
    newsAutomatic: {
        // 0 --> manually
        // 1 --> automatically by category and subcategory
        type: Sequelize.INTEGER, defaultValue: 0
    },
    type: {
        // 0 --> for custom modules
        // 1 --> for comments modules
        // 2 --> for tags
        // 3 --> for related articles module
        // 4 --> for social module
        type: Sequelize.INTEGER, defaultValue: 0
    }
});

module.exports = Module;


