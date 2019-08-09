const Tag = require('../database/models/tag');


module.exports = {
    getTags(req, res) {
        Tag.findAll()
            .then(data => {
                res.send({
                    tags: data
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
};