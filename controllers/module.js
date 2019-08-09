const Module = require("../database/models/modules");
const moduleCategory = require("../database/models/moduleCategories");
const sequelize = require("../database/config.js");
const Promise = require("bluebird");

module.exports = {

    getModules(req, res) {
    Module.findAll()
      .then(modules => {
        res.send({
          modules: modules
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },

    getModule(req, res) {
    let id = req.query.id;
    Module.findByPk(id)
      .then(module => {
        res.send({
          module: module
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },

    getSubCategories(req, res) {

		let sql = "";
		let first = true;
		let categories = req.body.categories;

		for (let i = 0; i < categories.length; i++) {
			if(first) {
				sql += "categoryId = " + categories[i].id;
				first = false;
			}
			else {
				sql += " or categoryId = " + categories[i].id;
			}

		}

		if(first)
			sql = "1 = 2";

		sequelize.query("select s.id, s.englishTitle, c.categoryId from Category_Subcategory c, subcategories s where c.subcategoryId = s.id and (" + sql + ")", {
			type: sequelize.QueryTypes.SELECT
		}).then(subCategories => {

		    let out = [];

		    for(let i = 0; i < subCategories.length; i++) {

		        let allow = true;

		        for(let j = 0; j < out.length; j++) {
                    if(out[j].id === subCategories[i].id) {
                        allow = false;
                        break;
                    }
                }
                if(allow) {
                    out.push(subCategories[i]);
                }
            }

			return res.send({"subCategories": out})
		});
	},

    updateModule(req, res) {

        let id = req.body.id;
        let automatic = req.body.automatic;
        let newsNumber = req.body.newsNumber;
        let replaceMode = req.body.replaceMode;
        let maxActives = req.body.maxActives;
        let categories = req.body.categories;
        let subCategories = req.body.subCategories;
        let newsAutomatic = req.body.newsAutomatic;

        moduleCategory.destroy({ where: { moduleId: null } });

        sequelize.query("delete from moduleCategories where moduleId = " + id, {
            type: sequelize.QueryTypes.DELETE
        }).then(tmp => {
            Promise.each(categories, function (category) {
                moduleCategory.create({
                    moduleId: id,
                    categoryId: category.id
                });
            });
        });

        let sql = "";
        for (let i = 0; i < subCategories.length; i++) {
            sql += "insert into moduleSubCategories (moduleId, subcategoryId) values ('" + id + "', '" + subCategories[i].id + "');";
        }

        sequelize.query("delete from moduleSubCategories where moduleId = " + id, {
            type: sequelize.QueryTypes.DELETE
        }).then(x => {

            if(subCategories.length > 0) {
                sequelize.query(sql, {
                    type: sequelize.QueryTypes.INSERT
                });
            }
        });


        Module.findByPk(id)
          .then(module => {
            module.automatic = automatic;
            module.newsNumber = newsNumber;
            module.replaceMode = replaceMode;
            module.maxActives = maxActives;
            module.newsAutomatic = newsAutomatic;
            module
              .save()
              .then(data => {
                res.send({
                  module: data
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

    addModule(req, res) {
    let { name } = req.body;
    Module.create({
      name: name
    })
      .then(module => {
        res.send({
          module: module
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
    deleteModule(req, res) {
    let { moduleId } = req.body;
    Module.destroy({
      where: { id: moduleId }
    }).then(data => {
      res.send({
        msg: 'done'
      });
    }).catch(err => {
      res.status(500).send({
        error: err
      });
    })
  }

};
