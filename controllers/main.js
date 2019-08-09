const MainRows = require('../database/models/mainRows');
const Module = require('../database/models/modules');
const RowColumns = require('../database/models/rowColumns');
const ModuleNews = require('../database/models/module_news');
const News = require('../database/models/news');
const columnModules = require('../database/models/columnModules');
const Image = require('../database/models/Images');
const mainPhoto = require('../database/models/mainPhoto');
const Category = require('../database/models/category');
const SubCategory = require('../database/models/subCategory');
const moduleCategory = require('../database/models/moduleCategories');
const moduleSubCategory = require('../database/models/moduleSubCategories');
const Tag = require('../database/models/tag');
const Promise = require('bluebird');
//controllers
const moduleNewsController = require('./moduleNews');


let self = module.exports = {




    async getMain(req, res) {
        let pageId = req.query.page ? req.query.page : 1;
        let mainRows = await MainRows.findAll({
            where: {
                pageId: pageId
            },
            include: [{
                model: RowColumns,
                include: [{
                    model: columnModules,
                    include: [{
                        model: Module,
                        required: false,
                        include: [{
                            model: ModuleNews,
                            required: false,
                            where: {
                                status: 1
                            },
                            include: [{
                                model: News,
                                include: [{
                                    model: mainPhoto,
                                    required: false
                                }, {
                                    model: Category,
                                    required: false
                                }, {
                                    model: SubCategory,
                                    required: false
                                }, {
                                    model: Tag,
                                    required: false
                                }]
                            }]
                        }]
                    }],

                }]
            }],
            order: [
                ['order'],
                [RowColumns, 'id', 'asc'],
                [{
                    model: RowColumns
                }, {
                    model: columnModules
                }, 'id', 'asc'],
            ],
        });

        if (pageId == '3') {
            let tagId = req.query.tagId;
            self.getTagsData(tagId).then(tagData => {
                for (let i = 0; i < mainRows.length; i++) {
                    for (let j = 0; j < mainRows[i].row_columns.length; j++) {
                        for (let k = 0; k < mainRows[i].row_columns[j].column_modules.length; k++) {
                            if (mainRows[i].row_columns[j].column_modules[k].module.id === 1) {
                                for (let l = 0; l < tagData.length; l++) {
                                    mainRows[i].row_columns[j].column_modules[k].module.module_news.push(tagData[l]);
                                }
                            }
                        }
                    }
                    if (i === mainRows.length - 1) {
                        res.send({
                            mainRows: mainRows
                        })
                    }
                }

            }).catch(err => {
                res.send({
                    mainRows: mainRows
                })
            })

        } else if (pageId == '4') {
            let subCategoryId = req.query.subCategoryId;
            self.getSubCategoriesData(subCategoryId).then(subCategoryData => {
                console.log(subCategoryData.length);
                for (let i = 0; i < mainRows.length; i++) {
                    for (let j = 0; j < mainRows[i].row_columns.length; j++) {
                        for (let k = 0; k < mainRows[i].row_columns[j].column_modules.length; k++) {
                            if (mainRows[i].row_columns[j].column_modules[k].module.id === 2) {
                                for (let l = 0; l < subCategoryData.length; l++) {
                                    mainRows[i].row_columns[j].column_modules[k].module.module_news.push(subCategoryData[l]);
                                }
                            }
                        }
                    }
                    if (i === mainRows.length - 1) {
                        res.send({
                            mainRows: mainRows
                        })
                    }
                }

            }).catch(err => {
                res.send({
                    mainRows: mainRows
                })
            })
        }
        else {
            res.send({
                mainRows: mainRows
            })
        }
    },

    async getTagsData(tagId) {
        return new Promise(function (resolve, reject) {
            News.findAll({
                order: [
                    ['id', 'DESC'],
                    ['createdAt', 'DESC'],
                ],
                include: [
                    { model: Tag, where: { id: tagId }, required: true },
                    { model: mainPhoto, required: false },
                    { model: Category, required: false },
                    { model: SubCategory, required: false }
                ],
                limit: 20
            }).then(news => {
                resolve(news);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        });
    },

    async getSubCategoriesData(subCategoryId) {
        return new Promise(function (resolve, reject) {
            News.findAll({
                order: [
                    ['id', 'DESC'],
                    ['createdAt', 'DESC'],
                ],
                include: [
                    { model: SubCategory, where: { id: subCategoryId }, required: true },
                    { model: Tag, required: false },
                    { model: mainPhoto, required: false },
                    { model: Category, required: false }
                ],
                limit: 20
            }).then(news => {
                resolve(news);
            }).catch(err => {
                console.log(err);
                reject(err);
            })
        });
    },

    async automaticAssignment() {
        //Todo : remove category and subcategory models if not necessary
        //Todo : check for automatic activating of assigned news
        //Todo : change news status after assigning
        //Todo : check for priorities

        console.log("calling automaticAssignment");

        let [modules, news] = await Promise.all([
            Module.findAll({
                where: {
                    newsAutomatic: 1
                },
                include: [{
                    model: moduleCategory
                },
                {
                    model: moduleSubCategory
                }
                ]
            }),
            News.findAll({
                where: {
                    status: 2
                },
                include: [
                    { model: Category },
                    { model: SubCategory }
                ]
            })
        ]);

        let selecteds = [];

	    try {

	        if(news.length) {
                await Promise.all(
                    modules.map(module => {
                        if (module.moduleCategories.length) {
                            news.map(item => {
                                //         module.moduleCategories.map(moduleCat => {
                                //             item.categories.map(itemCat => {
                                //                 if (moduleCat.categoryId === itemCat.id) {
                                //                     moduleNewsController.addModuleNewsExport(module, item)
                                //                         .then(data => {
                                //                             console.log("module news created for --> " + itemCat.title + " between module:news " + module.id + ":" + item.id)
                                //                         }).catch(err => {
                                //                             console.log(err);
                                //                             console.log("something bad happened")
                                //                         })
                                //                 }
                                //             });
                                //         });


                                if (module.moduleSubCategories.length) {
                                    module.moduleSubCategories.map(moduleSubCat => {
                                        item.subcategories.map(itemSubCat => {
                                            if (moduleSubCat.subcategoryId === itemSubCat.id) {
                                                selecteds.push([item, module]);
                                            }
                                        });

                                    })
                                }
                            })
                        }
                    })
                ).then(tmp => {

                    if(selecteds > 0) {
                        Promise.each(selecteds, function (selected) {
                            return moduleNewsController.addModuleNewsExport(selected[1], selected[0])
                                .then(data => {
                                    console.log("done!");
                                }).catch(err => {
                                    console.log(err);
                                    console.log("something bad happened")
                                });
                        });
                    }
                    else {
                        Promise.each(modules, function (module) {
                            return moduleNewsController.replaceAllNews(module.id, module.replaceMode);
                        })
                    }
                })
            }
            else {
                Promise.each(modules, function (module) {
                    return moduleNewsController.replaceAllNews(module.id, module.replaceMode);
                })
            }
        }
        catch(err){
            console.log(err);
        }

        // res.send({
        //     module: modules,
        //     news: news
        // });

    }
};
