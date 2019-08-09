const siteUser = require("../database/models/siteUsers");
const Role = require("../database/models/roles");
let bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let self = (module.exports = {
  getUsers(req, res) {
    siteUser
      .findAll({ include: Role })
      .then(data => {
        res.send({
          users: data
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  usernameExists(username) {
    return new Promise(function(resolve, reject) {
      siteUser
        .count({
          where: { username: username }
        })
        .then(c => {
          if (c !== 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  usernameExistsUpdate(username, id) {
    return new Promise(function(resolve, reject) {
      siteUser
        .count({
          where: {
            username: username,
            id: { [Op.ne]: id }
          }
        })
        .then(c => {
          if (c !== 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async addUser(req, res) {
    let { username, password, name, role } = req.body;
    let status = await self.usernameExists(username);
    if (status) {
      return res.send({
        error: 1,
        message: "username already exists"
      });
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            console.log(err);
            res.staus(500).send({
              error: err
            });
          } else {
            siteUser
              .create({
                username: username,
                password: hash,
                name: name,
                siteRoleId: role
              })
              .then(data => {
                siteUser
                  .findByPk(data.id, { include: Role })
                  .then(result => {
                    res.send({
                      error: 0,
                      user: result
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
        });
      });
    }
  },
  deleteUser(req, res) {
    let id = req.body.id;
    siteUser
      .destroy({ where: { id: id } })
      .then(data => {
        res.send({
          status: "done"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: err
        });
      });
  },
  async updateUser(req, res) {
    let { id, name, username, role } = req.body;
    let status = await self.usernameExistsUpdate(username, id);
    if (status) {
      res.send({
        error: 1,
        message: "username already exists"
      });
    } else {
      siteUser
        .findByPk(id)
        .then(user => {
          user.name = name;
          user.username = username;
          user.siteRoleId = role;
          user
            .save()
            .then(data => {
              siteUser
                .findByPk(data.id, { include: Role })
                .then(result => {
                  res.send({
                    error: 0,
                    user: result
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
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({
            error: err
          });
        });
    }
  },
  changePassword(req, res) {
    let { password, id } = req.body;
    siteUser
      .findByPk(id)
      .then(user => {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, function(err, hash) {
            user.password = hash;
            user
              .save()
              .then(data => {
                res.send({
                  user: data
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).send({
                  error: err
                });
              });
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
  loginUser(req, res) {
    let { username, password } = req.body;
    siteUser
      .findOne({
        where: {
          username: username
        },
        include: [
          {
            model: Role,
            required: true
          }
        ]
      })
      .then(user => {
        bcrypt.compare(password, user.password).then(result => {
          if (result === true) {
            req.session.siteUser = user;
            req.session.siteStatus = true;
            req.session.save(err => {
              if (err) console.log(err);
              res.send({
                error: false,
                user: user
              });
            });
          } else {
            res.send({
              error: true
            });
          }
        });
      })
      .catch(err => {
	      console.log(err);
	      res.status(500).json({error: err.message})
        res.send({
          error: true
        });
      });
  },
  logoutUser(req, res) {
    if (req.session.siteStatus) {
      res.clearCookie("siteUser");
      req.session.siteStatus = false;
      res.send({
        error: "false",
        msg: "done"
      });
    }
  },
  checkLogin(req, res) {
    if (req.session.siteStatus) {
        return res.send({
            status: true,
            user: req.session.siteUser
        });
    }

    return res.send({
        status: false,
        user: null
    });
  }
});
