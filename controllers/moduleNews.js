const Module = require("../database/models/modules");
const ModuleNews = require("../database/models/module_news");
const News = require("../database/models/news");
let Image = require("../database/models/Images.js");
const sequalize = require("../database/config");
const Sequelize = require("sequelize");

let self = (module.exports = {
  getModuleNews(req, res) {
    let module_id = req.query.module_id;
    ModuleNews.findAll({
      where: {
        moduleId: module_id
      },
      include: [News]
    })
      .then(data => {
        return res.send({
          moduleNews: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error:
            "something went wrong trying to get module News from the database"
        });
      });
  },
  async deactivateModuleNews(req, res) {
    let id = req.body.id;

    ModuleNews.findByPk(id)
      .then(result => {
        result.status = 0;
        result.active_since = null;
        result
          .save()
          .then(() => {
            res.send(result);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: "something went wrong trying to update ModuleNews"
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error:
            "something went wrong trying to get ModuleNews from the database"
        });
      });
  },
  activateModuleNews: function(req, res) {
    let id = req.body.id;

    ModuleNews.findByPk(id)
      .then(result => {
        result.status = 1;
        result.active_since = new Date();
        result
          .save()
          .then(() => {
            res.send(result);
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: "something went wrong trying to update ModuleNews"
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error:
            "something went wrong trying to get ModuleNews from the database"
        });
      });
  },
  replaceNews: async function(module_id, replaceMode) {
    try {
      let module = await Module.findByPk(module_id);
      let active_news = await ModuleNews.findAll({
        where: { status: 1, moduleId: module_id },
        order: [["active_since"]],
        include: [News]
      });

      if (module.maxActives >= active_news.length) {
        console.log("maxActives is bigger so there is no need to replace news");
        return;
      }
      if (!active_news.length) return;

      console.log("replace mode is " + replaceMode);

      switch (replaceMode) {
        case 0:
          let min_score = active_news[0].news.point;
          let idxMinScore = 0;
          for (let i = 1; i < active_news.length; i++) {
            if (active_news[i].news.point < min_score) {
                min_score = active_news[i].news.point;
                idxMinScore = i;
            }
          }

          console.log("min_score " + min_score + " idx_ " + idxMinScore);
          active_news[idxMinScore].status = 0;
          active_news[idxMinScore].active_since = null;
          await active_news[idxMinScore].save();
          break;
        case 1:
          //oldest active_since
          active_news[0].status = 0;
          active_news[0].active_since = null;
          await active_news[0].save();
          break;
        case 2:
          //oldest news create date
          let least_create_date = active_news[0].news.createdAt;
          let idx = 0;

          for (let i = 1; i < active_news.length; i++) {
            if (active_news[i].news.createdAt < least_create_date) {
                least_create_date = active_news[i].news.createdAt;
                idx = i;
            }
          }

          active_news[idx].status = 0;
          active_news[idx].active_since = null;
          await active_news[idx].save();
          break;
      }
    } catch (err) {
      throw err;
    }
  },
  replaceAllNews: async function(module_id, replaceMode) {
      try {

          console.log("replace all news");

          let module = await Module.findByPk(module_id);
          let active_news;

          switch (replaceMode) {
              case 0:
                  active_news = await ModuleNews.findAll({
                      where: { moduleId: module_id },
                      order: [[Sequelize.literal("news.point"), "DESC"]],
                      include: [News]
                  });
                break;
              case 1:
                  active_news = await ModuleNews.findAll({
                      where: { moduleId: module_id },
                      order: [["active_since", "DESC"]],
                      include: [News]
                  });
                break;
              case 2:
                  active_news = await ModuleNews.findAll({
                      where: { moduleId: module_id },
                      order: [[Sequelize.literal("news.createdAt"), "DESC"]],
                      include: [News]
                  });
                break;
          }

          if (module.maxActives >= active_news.length) {
              console.log("maxActives is bigger so there is no need to replace news");
              return;
          }
          if (!active_news.length) return;

          for(let i = 0; i < active_news.length; i++) {

            if(i < module.maxActives && !active_news[i].status) {
                active_news[i].status = 1;
                active_news[i].active_since = new Date();
                await active_news[i].save();
            }
            else if(i >= module.maxActives && active_news[i].status) {
              active_news[i].status = 0;
              active_news[i].active_since = null;
              await active_news[i].save();
            }
          }
      } catch (err) {
          throw err;
      }
    },
  addModuleNewsExport: function(module, news) {

    return new Promise(async function(resolve, reject) {
      try {

        console.log(news.id);

        news.status = 3;
        await news.save();

        let count = await ModuleNews.count({
          where: { moduleId: module.id, newsId: news.id }
        });
        if (count !== 0) {
          console.log("news already there");
          reject(false);
        } else {
          if (module.automatic) {

            ModuleNews.create({
              moduleId: module.id,
              newsId: news.id,
              active_since: new Date(),
              status: 1
            })
              .then(module_news => {
                  Promise.all([self.replaceNews(module.id, module.replaceMode)]).then(tmp => {
                    resolve(module_news);
                  });
              })
              .catch(err => {
                    reject(err);
              });
          } else {
            ModuleNews.create({
              moduleId: module.id,
              newsId: news.id,
              active_since: null,
              status: 0
            })
              .then(module_news => {
                resolve(module_news);
              })
              .catch(err => {
                reject(err);
              });
          }
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  addModuleNews: async function(req, res) {
    let module_id = req.body.module_id;
    let news_id = req.body.news_id;
    News.findByPk(news_id).then(news => {
      news.status = 3;
      news.save();
    });
    try {
      let count = await ModuleNews.count({
        where: { moduleId: module_id, newsId: news_id }
      });
      let module = await Module.findByPk(module_id);
      if (count !== 0) {
        res.send({
          msg: "news already exists"
        });
      } else {
        if (module.automatic) {
          await self.replaceNews(module.id, module.replaceMode);
          ModuleNews.create({
            moduleId: module_id,
            newsId: news_id,
            active_since: new Date(),
            status: 1
          })
            .then(module_news => {
              res.send({
                moduleNews: module_news
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                error: err
              });
            });
        } else {
          ModuleNews.create({
            moduleId: module_id,
            newsId: news_id,
            active_since: null,
            status: 0
          })
            .then(module_news => {
              res.send({
                moduleNews: module_news
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send({
                error: err
              });
            });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    }
  },
  async getActiveModules(req, res) {
    let module_id = req.query.module_id;
    try {
      let [module, moduleNews] = await Promise.all([
        Module.findByPk(module_id),
        ModuleNews.findAll({
          where: { moduleId: module_id, status: 1 },
          include: { model: News, include: { model: Image, required: false } }
        })
      ]);
      res.send({
        module: module,
        moduleNews: moduleNews
      });
    } catch (err) {
      res.status(500).send({
        error: err
      });
    }
  }
});
