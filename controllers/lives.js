const lives = require("../database/models/lives");

module.exports = {
  getLive(req, res) {
    let id = req.body.id;
    console.log("get live");
    console.log(id);
    lives
      .findByPk(id)
      .then(data => {
        res.send({
          live: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  getLives(req, res) {
    lives
      .findAll()
      .then(data => {
        res.send({
          lives: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  async deleteLive(req, res) {
    let liveId = req.body.liveId;
    console.log(liveId)
    let live = await lives.findByPk(liveId);
    live.destroy().then(data => {
      res.send({
        status: 'done'
      })
    }).catch(err => {
      console.log(err);
      res.status(500).send({
        error: err
      });
    })
  },
  addLive(req, res) {
    let { url, name, backup } = req.body;
    lives
      .create({
        name: name,
        url: url,
        backup: backup
      })
      .then(data => {
        res.send({
          live: data
        });
      })
      .catch(er => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  updateLive(req, res) {
    let { id, url, backup } = req.body;
    lives
      .findByPk(id)
      .then(live => {
        live.url = url;
        live.backup = backup;
        live
          .save()
          .then(data => {
            res.send({
              live: data
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
  checkName(req, res) {
    let name = req.body.name;
    lives.findAll({
      where: {
        name: name
      }
    }).then(data => {
      console.log(data);
      if (data && data.length) {
        res.send({
          status: false
        })
      }
      else {
        res.send({
          status: true
        })
      }
    }).catch(err => {
      console.log(err);
      res.stauts(500).send({
        error: err
      });
    })
  }
};
