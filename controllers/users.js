let Ugc = require('../database/models/ugc');
let bcrypt = require('bcryptjs');

module.exports = {
    test(req, res) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash("admin", salt, function (err, hash) {
                res.send({
                    password: hash
                })
            });
        });
    },
    async addUser(req, res) {
        let { name, email, password } = req.body;
        let count = await Ugc.count({ where: { email: email } });
        if (count !== 0) {
            res.send({
                error: true,
                msg: 'user already exists'
            });
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.status(500).send({
                            error: err
                        });
                    } else {
                        Ugc.create({
                            name: name,
                            email: email,
                            password: hash
                        }).then(user => {
                            res.send({
                                user: user,
                                error: false
                            })
                        }).catch(err => {
                            console.log(err);
                            res.status(500).send({
                                error: err
                            });
                        })
                    }
                });
            });
        }
    },
    loginUser(req, res) {
	    console.log("here");
        let { email, password } = req.body;
        Ugc.findOne({
            where: {
                email: email
            }
        }).then(user => {
            bcrypt.compare(password, user.password).then((result) => {
                if (result === true) {
                    req.session.user = user;
                    req.session.status = true;
                    req.session.save(err => {
                        if (err)
                            console.log(err);
                        res.send({
                            error: false,
                            user: user,
                        });
                    });
                } else {
                    res.send({
                        error: true,
                    })
                }
            });
        }).catch(err => {
		console.log(err);
            res.send({
                error: true,
            })
        });
    },
    logoutUser(req, res) {
        if (req.session.status) {
            res.clearCookie('user');
            req.session.status = false;
            res.send({
                error: 'false',
                msg: 'done'
            })
        }
    },
    checkLogin(req, res) {
	    console.log("checking session");
	    console.log(req.session);
        if (req.session.status) {
            res.send({
                status: true,
                user: req.session.user,
            })
        } else {
            res.send({
                status: false,
                user: null
            })
        }
    }
};
