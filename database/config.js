let Sequelize = require('sequelize');
const sequelize = new Sequelize('iranpress', 'newsroom', '@admin123456', {
    // host: '192.168.201.27',
    host: '127.0.0.1',
    dialect: 'mysql',
    dialectOptions: {
       multipleStatements: true
    },
    //operatorsAliases: false,
    // dialectOptions: {
    //     useUTC: false, //for reading from database
    //     dateStrings: true,
    //
    //     typeCast: function (field, next) { // for reading from database
    //         if (field.type === 'DATETIME') {
    //             return field.string()
    //         }
    //         return next()
    //     },
    // },
    timezone: '+03:30', //for writing to database,
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});


module.exports = sequelize;
