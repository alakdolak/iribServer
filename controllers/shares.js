const Share = require('../database/models/share');

module.exports = {
    getShare(req, res) {
        Share.findAll()
            .then(data => {
                res.send({
                    shares: data
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    updateShare(req, res) {
        let {id, title, enabled, showTitle, icon} = req.body;
        console.log(req.body)
        Share.findByPk(id)
            .then(share => {
                share.title = title;
                share.enabled = enabled;
                share.showTitle = showTitle;
                share.icon = icon;
                share.save()
                    .then(data => {
                        res.send({
                            share: data
                        })
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

};