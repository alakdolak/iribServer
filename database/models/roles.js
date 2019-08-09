const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('siteRoles', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    description: Sequelize.STRING,

    //dashboard
    dashboardOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true,
    },
    dashboardRead: {
        type: Sequelize.BOOLEAN, defaultValue: true,
    },
    //news
    newsOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    newsRead: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    newsSend: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    newsReject: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
//    comments
    commentsOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    commentsAction: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    commentsRead: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
//    live feeds
    liveFeedsOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    liveRead: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    liveCreate: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
//    modules
    modulesOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    modulesRead: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    modulesCreate: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    modulesActive: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    modulesSetting: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
//    menus
    menusOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    menusRead: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    headerSetting: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    footerSetting: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    //designs
    designOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    designCreate: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    designRead: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    designSetting: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    //roles
    rolesOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    rolesRead: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    rolesCreate: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    rolesChange: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    //users
    usersOverall: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    usersCreate: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
    usersDelete: {
        type: Sequelize.BOOLEAN, defaultValue: true
    },
}, {timestamps: false});
