const Role = require('../database/models/roles');

module.exports = {
    getRole(req, res) {
        Role.findAll()
            .then(data => {
                res.send({
                    roles: data
                });
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    addRole(req, res) {
        let {name, description} = req.body;
        Role.create({
            name: name,
            description: description
        }).then(data => {
            res.send({
                role: data
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    updateRole(req, res) {
        let id = req.body.id;
        let value = req.body.value;
        let status = req.body.status;
        Role.findByPk(id)
            .then(async role => {
                role[value] = status;
                await role.save();
                res.send({
                    role: role
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
};