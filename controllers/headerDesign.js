const headerDesign = require('../database/models/headerDesign');
const headerImages = require('../database/models/headerImages');
const headerItems = require('../database/models/headerItems');
const Page = require('../database/models/pages');
const Category = require('../database/models/category');
const subCategory = require('../database/models/subCategory');
const path = require('path');


let self = {
    async getHeaderWithPages(req, res) {
        let selectedPages = [];
        let pagesString = '';
        let [header, image, items, categories, subCategories, pages] = await Promise.all([
            headerDesign.findOne({
                where: { id: 1 },
            }),
            headerImages.findOne({ where: { selected: true } }),
            headerItems.findAll(),
            Category.findAll(),
            subCategory.findAll(),
            Page.findAll()
        ]);

        pagesString = header.pagesString;
        res.send({
            selectedPages: selectedPages,
            pages: pages,
            header: header,
            image: image,
            items: items,
            categories: categories,
            subCategories: subCategories
        })

        // if (pagesString && pagesString.length)
        //     selectedPages = pagesString.split('-');
        // for (let i = 0; i < selectedPages.length; i++) {
        //     selectedPages[i] = parseInt(selectedPages[i]);
        //     if (selectedPages[i] !== 0 && i < header.menuItems)
        //         pages[i] = await Page.findByPk(selectedPages[i]);
        //     if (i === selectedPages.length - 1) {
        //         res.send({
        //             selectedPages: selectedPages,
        //             pages: pages,
        //             header: header,
        //             image: image,
        //             items: items
        //         })
        //     }
        // }

    },
    async getHeader(req, res) {
        try {
            let [header, images] = await Promise.all([
                headerDesign.findOne({ where: { id: 1 } }),
                headerImages.findAll()
            ]);
            res.send({
                headerDesign: header,
                images: images
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: e
            });
        }
    },
    updateHeader(req, res) {
        let { type, menuItems, backgroundColor, textColor, pagesString, height } = req.body;
        headerDesign.findOne().then(data => {
            data.type = type;
            data.menuItems = menuItems;
            data.backgroundColor = backgroundColor;
            data.textColor = textColor;
            data.pagesString = pagesString;
            data.height = height;
            data.save()
                .then(design => {
                    res.send({
                        headerDesign: design
                    })
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: err
                    })
                })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    },
    async getHeaderSetting(req, res) {
        try {
            let [pages, categories, subCategories, header, images] = await Promise.all([
                Page.findAll(),
                Category.findAll(),
                subCategory.findAll(),
                headerDesign.findOne(),
                headerImages.findAll()
            ]);
            res.send({
                categories: categories,
                pages: pages,
                subCategories: subCategories,
                headerDesign: header,
                images: images
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            })
        }
    },
    async getHeaderItems(req, res) {
        try {
            let items = await headerItems.findAll();
            res.send({
                headerItems: items
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
        }
    },
    addHeaderItem(req, res) {
        let { redirect, redirectType, text } = req.body;
        headerItems.create({
            redirect: redirect,
            redirectType: redirectType,
            text: text,
            isMenu: false,
            hasMenu: false
        }).then(item => {
            res.send({
                headerItem: item
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    async fix_fathers() {
        try {
            let fathers = await headerItems.findAll({
                where: {
                    hasMenu: true
                }
            });
            for (let i = 0; i < fathers.length; i++) {
                let c = await headerItems.count({ where: { parentId: fathers[i].id } });
                if (c == 0) {
                    fathers[i].hasMenu = false;
                    await fathers[i].save();
                }
            }
        } catch (err) {
            console.log(err);
        }

    },
    async deleteHeaderItem(req, res) {
        let { id } = req.body;
        try {
            let item = await headerItems.findByPk(id);
            let children = await headerItems.findAll({ where: { parentId: id } });
            for (let i = 0; i < children.length; i++) {
                let grandChildren = await headerItems.findAll({ where: { parentId: children[i].id } });
                for (let j = 0; j < grandChildren.length; j++) {
                    await headerItems.destroy({ where: { parentId: grandChildren[j].id } });
                    await grandChildren[j].destroy();
                }
                await children[i].destroy();
            }
            await item.destroy();
            await self.fix_fathers();
            res.send({
                msg: 'done'
            });
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
        }
    },
    updateHeaderItem(req, res) {
        let { id, redirectType, redirect, text } = req.body;
        headerItems.findByPk(id)
            .then(item => {
                item.redirectType = redirectType;
                item.redirect = redirect;
                item.text = text;
                item.save()
                    .then(data => {
                        res.send({
                            headerItem: data
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({
                            error: err
                        })
                    })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                })
            })
    },
    async addSubHeaderItem(req, res) {
        let { parentId, text, redirect, redirectType } = req.body;
        try {
            let parent = await headerItems.findByPk(parentId);
            headerItems.create({
                text: text,
                redirect: redirect,
                redirectType: redirectType,
                parentId: parentId,
                isMenu: true,
                hasMenu: false
            }).then(item => {
                parent.hasMenu = true;
                parent.save();
                res.send({
                    headerItem: item
                })
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
        }
    },
    addPhoto(req, res) {
        let file = req.file;
        headerImages.create({
            name: file.filename
        }).then(data => {
            res.send({
                image: data
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
    ,
    selectImage(req, res) {
        let imageId = req.body.imageId;
        let images = [];
        headerImages.findAll()
            .then(async images => {
                for (let i = 0; i < images.length; i++) {
                    images[i].selected = images[i].id === imageId;
                    await images[i].save();
                    if (i === images.length - 1) {
                        let images = await headerImages.findAll();
                        res.send({
                            images: images
                        })
                    }
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                })
            })
    }
};

module.exports = self;