const footerDesignModel = require("../database/models/footerDeisng");
const footerListModel = require("../database/models/footerLists");
const footerListItemModel = require("../database/models/footerListItems");
const Page = require("../database/models/pages");
const Category = require("../database/models/category");
const subCategory = require("../database/models/subCategory");

let self = (module.exports = {
  async getFooterAll(req, res) {
    let [footerDesign, footerLists] = await Promise.all([
      footerDesignModel.findByPk(1),
      footerListModel.findAll({
        include: footerListItemModel,
        order: [["id", "ASC"]]
      })
    ]);

    res.send({
      footer: footerDesign,
      footerLists: footerLists
    });
  },
  async getFooter(req, res) {
    try {
      let [footerDesign, footerLists] = await Promise.all([
        footerDesignModel.findOne({ where: { id: 1 } }),
        footerListModel.findAll({
          include: footerListItemModel,
          order: [["id", "ASC"]]
        })
      ]);
      if (!footerDesign) {
        footerDesign = await footerDesignModel.create();
        await self.createListItems(
          footerDesign.numberOfRows,
          footerDesign.numberOfListsPerRow
        );
        let footerLists = await footerListModel.findAll({
          include: footerListItemModel,
          order: [["id", "ASC"]]
        });
        res.send({
          footerDesign: footerDesign,
          footerLists: footerLists
        });
      } else {
        res.send({
          footerDesign: footerDesign,
          footerLists: footerLists
        });
      }
    } catch (e) {
      res.status(500).send({
        error: e
      });
    }
  },
  async createListItems(numberOfRows, numberOfListsPerRow) {
    let all = numberOfRows * numberOfListsPerRow;
    footerListModel
      .count()
      .then(async c => {
        if (c < all) {
          for (let counter = 0; counter < all - c; counter++) {
            await footerListModel.create({
              title: "title"
            });
          }
        } else if (c > all) {
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  async createListItems2(numberOfRows, numberOfListsPerRow) {
    return new Promise(function (resolve, reject) {
      let all = numberOfRows * numberOfListsPerRow;
      footerListModel
        .count()
        .then(async c => {
          if (c < all) {
            for (let counter = 0; counter < all - c; counter++) {
              await footerListModel.create({
                title: "title"
              });
              if (counter === all - c - 1) {
                resolve("hello");
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            error: err
          });
          reject(err);
        });
    });
  },
  async updateFooter(req, res) {
    let {
      numberOfRows,
      numberOfListsPerRow,
      textColor,
      backgroundColor
    } = req.body;
    try {
      let footerDesign = await footerDesignModel.findOne({ where: { id: 1 } });
      footerDesign.numberOfRows = numberOfRows;
      footerDesign.numberOfListsPerRow = numberOfListsPerRow;
      footerDesign.textColor = textColor;
      footerDesign.backgroundColor = backgroundColor;
      await footerDesign.save();
      await self
        .createListItems2(numberOfRows, numberOfListsPerRow)
        .then(() => {
          footerListModel
            .findAll({
              include: footerListItemModel,
              order: [["id", "ASC"]]
            })
            .then(footerLists => {
              console.log(footerLists.length);
              res.send({
                footerDesign: footerDesign,
                footerLists: footerLists
              });
            });
        });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    }
  },
  async getListData(req, res) {
    try {
      let [pages, categories, subCategories] = await Promise.all([
        Page.findAll(),
        Category.findAll(),
        subCategory.findAll()
      ]);
      res.send({
        pages: pages,
        categories: categories,
        subCategories: subCategories
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    }
  },
  addItem(req, res) {
    let type = req.body.type;
    let id = req.body.id;
    let footerListId = req.body.footerListId;
    let text = req.body.text;
    let url = req.body.url;
    switch (type) {
      case 0:
        footerListItemModel
          .create({
            type: type,
            text: text,
            footerListId: footerListId,
            pageId: id
          })
          .then(data => {
            res.send({
              footerListItem: data
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
        break;
      case 1:
        footerListItemModel
          .create({
            type: type,
            text: text,
            footerListId: footerListId,
            categoryId: id
          })
          .then(data => {
            res.send({
              footerListItem: data
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
        break;
      case 2:
        footerListItemModel
          .create({
            type: type,
            text: text,
            footerListId: footerListId,
            subCategoryId: id
          })
          .then(data => {
            res.send({
              footerListItem: data
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
        break;
      case 3:
        footerListItemModel
          .create({
            type: type,
            text: text,
            url: url,
            footerListId: footerListId
          })
          .then(data => {
            res.send({
              footerListItem: data
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err
            });
          });
        break;
    }
  },
  deleteItem(req, res) {
    let id = req.body.id;
    footerListItemModel
      .destroy({ where: { id: id } })
      .then(data => {
        res.send({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },

  changeTitle(req, res) {
    let { id, title } = req.body;
    footerListModel
      .findByPk(id)
      .then(list => {
        list.title = title;
        list
          .save()
          .then(data => {
            res.send({
              list: data
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
  editItemText(req, res) {
    let id = req.body.id;
    let text = req.body.text;

    footerListItemModel
      .findByPk(id)
      .then(item => {
        item.text = text;
        item
          .save()
          .then(data => {
            res.send({
              footerListItem: data
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
  async updateListItem(req, res) {
    let { id, selectedItem, type, text, url } = req.body;
    try {
      let footerListItem = await footerListItemModel.findByPk(id);
      footerListItem.text = text;
      footerListItem.type = type;
      switch (type) {
        case 0:
          footerListItem.pageId = selectedItem;
          footerListItem.url = "";
          break;
        case 1:
          footerListItem.categoryId = selectedItem;
          footerListItem.url = "";
          break;
        case 2:
          footerListItem.subCategoryId = selectedItem;
          footerListItem.url = "";
          break;
        case 3:
          footerListItem.url = url;
          break;
      }
      footerListItem
        .save()
        .then(data => {
          res.send({
            footerListItem: data
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            error: err
          });
        });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        error: err
      });
    }
  }
});
