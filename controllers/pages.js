const Page = require('../database/models/pages');
const columnModule = require('../database/models/columnModules');
const rowColumn = require('../database/models/rowColumns');
const mainRow = require('../database/models/mainRows');
const Design = require('../database/models/design');
const pageModule = require('../database/models/pageModules');

module.exports = {
    getPages(req, res) {
        Page.findAll({}).then(data => {
            res.send({
                pages: data
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    getPage(req, res) {
	    console.log("getting page here");
        let pageId = req.body.pageId;
	    console.log(pageId);
        Page.findByPk(pageId)
            .then(data => {
                res.send({
                    page: data
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    addPage(req, res) {
        let name = req.body.name;
        Page.create({
            name: name
        }).then(data => {
            res.send({
                page: data
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
    },
    async deletePage(req, res) {
        let pageId = req.body.pageId;
        try {
            let page = await Page.findByPk(pageId);
            let mainRows = await mainRow.findAll({where: {pageId: pageId}});
            for (let i = 0; i < mainRows.length; i++) {
                let rowColumns = await rowColumn.findAll({where: {mainRowId: mainRows[i].id}});
                for (let j = 0; j < rowColumns.length; j++) {
                    await columnModule.destroy({where: {rowColumnId: rowColumns[j].id}});
                    await columnModule.destroy({where: {rowColumnId: null}});
                    await rowColumns[j].destroy();
                }
                await rowColumn.destroy({where: {mainRowId: null}});
                await mainRows[i].destroy();
            }
            await mainRow.destroy({where: {pageId: null}});
            let pageDesign = await Design.findOne({where: {pageId: pageId}});
            if(pageDesign){
                await pageModule.destroy({where: {designId: pageDesign.id}});
                await pageModule.destroy({where: {designId: null}});
                await pageDesign.destroy();
            }
            await Design.destroy({where: {pageId: null}});
            await page.destroy();
            res.send({
                status: 'done'
            })

        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            })
        }

    },
    changeType(req, res) {
        let pageId = req.body.pageId;
        Page.findByPk(pageId).then(page => {
            page.type = (page.type === 1) ? 0 : 1;
            page.save().then(data => {
                res.send({
                    page: data
                });
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
};
