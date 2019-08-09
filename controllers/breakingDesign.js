const Breaking = require("../database/models/breakingDesign");

module.exports = {
  getSetting(req, res) {
    Breaking.findOne()
      .then(data => {
        res.send({
          breakingDesign: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  updateSetting(req, res) {
    let { id, backgroundColor, textColor, interval } = req.body;
    Breaking.findByPk(id)
      .then(design => {
        design.backgroundColor = backgroundColor;
        design.textColor = textColor;
        design.interval = interval;
        design
          .save()
          .then(data => {
            res.send({
              breakingDesign: data
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
