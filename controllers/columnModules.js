const ColumnModules = require("../database/models/columnModules");
const Banner = require("../database/models/banner");

module.exports = {
  changeShowTitle(req, res) {
    let column_module_id = req.body.column_module_id;
    let show_title = req.body.show_title;
    ColumnModules.findByPk(column_module_id).then(module => {
      module.show_title = show_title;
      module
        .save()
        .then(data => {
          res.send({
            columnModule: data
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            error: err
          });
        });
    });
  },
  updateSwiperSetting(req, res) {
    let {
      id,
      swiperAnimations,
      swiperInterval,
      swiperAutomatic,
      showTag,
      showDescription,
      descriptionType,
      tagText,
      font,
      color,
      backgroundColor
    } = req.body;
    ColumnModules.findByPk(id)
      .then(data => {
        data.swiperAnimations = swiperAnimations;
        data.swiperInterval = swiperInterval;
        data.swiperAutomatic = swiperAutomatic;
        data.showTag = showTag;
        data.tagText = tagText;
        data.font = font;
        data.color = color;
        data.backgroundColor = backgroundColor;
        data.showDescription = showDescription;
        data.descriptionType = descriptionType;
        data
          .save()
          .then(result => {
            res.send({
              columnModule: result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  updateSimpleListSetting(req, res) {
    let { id, showDescription, descriptionType, font, color, backgroundColor } = req.body;
    ColumnModules.findByPk(id)
      .then(data => {
        data.showDescription = showDescription;
        data.descriptionType = descriptionType;
        data.font = font;
        data.color = color;
        data.backgroundColor = backgroundColor;
        data
          .save()
          .then(result => {
            res.send({
              columnModule: result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  updateHorizontalListSetting(req, res) {
    let { id, showDescription, descriptionType, font, color, backgroundColor } = req.body;
    ColumnModules.findByPk(id)
      .then(data => {
        data.showDescription = showDescription;
        data.descriptionType = descriptionType;
        data.font = font;
        data.color = color;
        data.backgroundColor = backgroundColor;
        data
          .save()
          .then(result => {
            res.send({
              columnModule: result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  updateSimpleListWithImagesSetting(req, res) {
    let { id, showDescription, descriptionType, font, backgroundColor, color } = req.body;
    ColumnModules.findByPk(id)
      .then(data => {
        data.showDescription = showDescription;
        data.descriptionType = descriptionType;
        data.font = font;
        data.backgroundColor = backgroundColor;
        data.color = color;
        data
          .save()
          .then(result => {
            res.send({
              columnModule: result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  async updateBannerSetting(req, res) {
    let { id, defaultId, height } = req.body;
    try {
      let banner = await Banner.findByPk(defaultId);
      let columnModule = await ColumnModules.findByPk(id);
      banner.height = height;
      columnModule.height = height;
      await columnModule.save();
      await banner.save();
      res.send({
        banner: banner,
        columnModule: columnModule
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: e
      });
    }
  }
};
