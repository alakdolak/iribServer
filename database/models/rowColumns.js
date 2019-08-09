const sequelize = require('../config');
const Sequelize = require('sequelize');


module.exports = sequelize.define('row_columns', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    size: {
        type: Sequelize.INTEGER, defaultValue: 12,
    },
    module_type: {
        type: Sequelize.INTEGER, defaultValue: 0
    },
    column_type: {
        type: Sequelize.INTEGER, defaultValue: 0
    }
});
