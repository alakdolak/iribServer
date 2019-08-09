const Design = require('../database/models/design');
const pageModule = require('../database/models/pageModules');
const Module = require('../database/models/modules')

module.exports = {
    getDesign(req, res) {
        let pageId = req.query.pageId;
        Design.count({
            where: {
                pageId: pageId
            }
        }).then(count => {
            if (count == 0)
                Design.create({
                    pageId: pageId
                });
        }).catch(err => {
            console.log(err)
        });
        Design.findOne({
            where: {
                pageId: pageId
            }
        }).then(result => {
            res.send({
                design: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get design from the database',
            })
        })
    },
    updateDesign(req, res) {
        let pageId = req.body.pageId;
        let sidebar = req.body.sidebar;
        let sidebar_size = req.body.sidebar_size;
        let direction = req.body.direction;
        Design.findOne({
            where: {
                pageId: pageId,
            }
        }).then(design => {
            design.sidebar = sidebar;
            design.sidebar_size = sidebar_size;
            design.direction = direction;
            design.save()
                .then(design => {
                    res.send({
                        design: design
                    });
                }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: 'something went wrong trying to update the design',
                })
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get design from the database'
            })
        });
    },

    async getPageModules(req, res) {
        let designId = req.body.designId;
        try {
            let [sidebarModules, mainModules] = await Promise.all([
                pageModule.findAll({where: {type: 0, designId: designId}, include: [Module], order: ['order']}),
                pageModule.findAll({where: {type: 1, designId: designId}, include: [Module], order: ['order']}),
            ]);
            res.send({
                sidebarModules: sidebarModules,
                mainModules: mainModules,
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err,
            });
        }
    }
};
