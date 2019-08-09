const pageModule = require('../database/models/pageModules');

module.exports = {
    getPageModue(req, res) {
        let type = req.query.type;
        let designId = req.query.designId;

        pageModule.findAll({
            where: {
                type: type,
                designId: designId
            },
            order: ['order']
        }).then(data => {
            res.send({
                pageModule: data
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get pageModule from the database',
            });
        })
    },
    addPageModule(req, res) {
        let type = req.body.type;
        let designId = req.body.designId;
        let module_id = req.body.module_id;
        let order = req.body.order;
        pageModule.count({
            where: {
                type: type,
                moduleId: module_id,
                designId: designId
            }
        }).then(count => {
            if (count != 0) {
                console.log("repeated");
            } else {
                pageModule.create({
                    type: type,
                    designId: designId,
                    moduleId: module_id,
                    order: order
                }).then(data => {
                    res.send({
                        pageModule: data,
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: 'something went wrong trying to save pageModule in the database'
                    });
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).send({
                error: 'something went wrong trying to query to page module database'
            })
        });
    },
    updatePageModuleOrder(req, res) {
        let id = req.body.id;
        let order = req.body.order;
        pageModule.findByPk(id)
            .then(result => {
                result.order = order;
                result.save()
                    .then(data => {
                        res.send({
                            pageModule: data,
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
    },
    deletePageModule(req, res) {
        let id = req.body.id;
        pageModule.destroy({
            where: {
                id: id
            }
        }).then(data => {
            res.send({
                pageModule: data
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    getPageModuleMaxOrder(req, res) {
        let type = req.query.type;
        let designId = req.query.designId;
        pageModule.max('order', {
            where: {
                type: type,
                designId: designId
            }
        }).then(max => {
            res.send({
                max: max
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
    }
};
