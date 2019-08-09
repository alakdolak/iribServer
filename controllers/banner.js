const Banner = require("../database/models/banner");
const fs = require("fs");

module.exports = {
  getBanner(req, res) {
    let id = req.body.id;
    Banner.findByPk(id)
      .then(data => {
        res.send({
          banner: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  getBanners(req, res) {
    Banner.findAll()
      .then(data => {
        res.send({
          banners: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  addBanner(req, res) {
    let name = req.body.name;
    let file = req.file;
    Banner.create({
      image: file.filename,
      name: name
    })
      .then(banner => {
        res.send({
          banner: banner
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  updateBanner(req, res) {
    let { id, redirect, name } = req.body;
    Banner.findByPk(id)
      .then(banner => {
        banner.redirect = parseInt(redirect);
        banner.name = name;
        banner
          .save()
          .then(data => {
            res.send({
              banner: data
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send({
              error: err``
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
  deleteBanner(req, res) {
    // TODO: delete banner from the main modules
    let id = req.body.id;
    Banner.findByPk(id)
      .then(banner => {
        fs.unlink("./public/uploads/banners/" + banner.image, err => {
          console.log(err);
        });
        banner
          .destroy()
          .then(data => {
            res.send({
              banner: data
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
  }
};
