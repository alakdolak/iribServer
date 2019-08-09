const News = require("../database/models/news");
const PageModule = require("../database/models/pageModules");
const Module = require("../database/models/modules");
const Design = require("../database/models/design");
const Image = require("../database/models/Images");
const Attachment = require("../database/models/Attachments");
const Tag = require("../database/models/tag");
module.exports = {
  getNews(req, res) {
    News.findAll({
      include: [
        {
          model: Image,
          required: false
        },
        {
          model: Tag,
          required: false
        }
      ],
      where: {
        status: 2
      }
    })
      .then(news => {
        res.send({
          news: news
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: "something went wrong trying to get news"
        });
      });
  },
  async getNewsDetails(req, res) {
    let news_id = req.query.news_id;
    try {
      let [news, sidebarModules, mainModules, design] = await Promise.all([
        News.findByPk(news_id, {
          include: [
            {
              model: Image,
              required: false
            },
            {
              model: Tag,
              required: false
            },
            {
              model: Attachment,
              required: false
            }
          ]
        }),
        PageModule.findAll({
          where: { type: 0, designId: 1 },
          include: [Module],
          order: ["order"]
        }),
        PageModule.findAll({
          where: { type: 1, designId: 1 },
          include: [Module],
          order: ["order"]
        }),
        Design.findOne({ where: { pageId: 2 } })
      ]);
      news.viewed = news.viewed + 1;
      news.score = news.score + 1;
      news.save();
      res.send({
        news: news,
        sidebarModules: sidebarModules,
        mainModules: mainModules,
        design: design
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    }
  }
};
