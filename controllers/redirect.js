const Redirect = require('../database/models/redirects');
const Category = require('../database/models/category');
const subCategory = require('../database/models/subCategory');
const Page = require('../database/models/pages');

module.exports = {
    getRedirect(req, res) {
        let id = req.body.id;
        Redirect.findByPk(id)
            .then(data => {
                res.send({
                    redirect: data
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            })
    },
    async getRedirects(req, res) {
        try {
            let [redirects, categories, subCategories, pages] = await Promise.all([
                Redirect.findAll(),
                Category.findAll(),
                subCategory.findAll(),
                Page.findAll({ where: { redirectable: true } })
            ]);
            res.send({
                redirects: redirects,
                categories: categories,
                subCategories: subCategories,
                pages: pages
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            })
        }

    },
    addRedirect(req, res) {
        let name = req.body.name;
        let file = req.file;
        Redirect.create({
            image: file.filename,
            name: name
        }).then(redirect => {
            res.send({
                redirect: redirect
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    },
    deleteRedirect(req, res) {
        let redirectId = req.body.redirectId;
        Redirect.destroy({
            where: {
                id: redirectId
            }
        }).then(data => {
            res.send({
                redirect: data
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    },
    updateRedirect(req, res) {
        let {
            type,
            id,
            redirect,
            name,
            url
        } = req.body
        Redirect.findByPk(id)
            .then(result => {
                console.log(redirect)
                result.type = type;
                result.name = name;
                result.redirect = redirect
                result.url = url;
                result.save()
                    .then(data => {
                        res.send({
                            redirect: data
                        })
                    }).catch(err => {
                        console.log(err)
                        res.status(500).send({
                            error: err
                        })
                    })
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    error: err
                });
            })
    }
}