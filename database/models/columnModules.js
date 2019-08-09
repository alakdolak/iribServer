const sequelize = require("../config");
const Sequelize = require("sequelize");

module.exports = sequelize.define(
  "column_modules",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    module_type: {
      // 0 --> simple list
      // 1 --> list with Images
      // 2 --> grid
      // 3 --> swiper
      // 4 --> one image
      // 5 --> horizontal list
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    default: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    defaultType: {
      // 1 --> banner
      // 2 --> redirects
      // 3 --> lives
      // 4 --> weather
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    defaultId: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    show_title: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    showTag: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    tagText: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    swiperAutomatic: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    swiperInterval: {
      type: Sequelize.INTEGER,
      defaultValue: 3000
    },
    swiperAnimations: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    showDescription: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    descriptionType: {
      // 1 --> title
      // 2 --> title2
      // 3 --> lead
      // 4 --> content
      type: Sequelize.INTEGER,
      defaultValue: 2
    },
    titleType: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    showSwiperTitle: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    height: {
      type: Sequelize.INTEGER,
      defaultValue: 300
    },
    font: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    backgroundColor: {
      type: Sequelize.STRING,
      defaultValue: '#ffffff'
    },
    color: {
      type: Sequelize.STRING,
      defaultValue: '#000000'
    }
  },
  {
    timestamps: false
  }
);
