const Comment = require('../database/models/comments');
const User = require('../database/models/ugc');
const News = require('../database/models/news');

module.exports = {
    getNewsComments(req, res) {
        let news_id = req.body.news_id;
        Comment.findAll({
            where: {
                newsId: news_id
            }
        }).then(comments => {
            res.send({
                comments: comments
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
    },
    getComments(req, res) {
        Comment.findAll({include: [{all: true}]})
            .then(comments => {
                res.send({
                    comments: comments
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    },
    addComment(req, res) {
        let {user_id, news_id, comment} = req.body;
        Comment.create({
            ugcId: user_id,
            newsId: news_id,
            comment: comment
        }).then(comment => {
            res.send({
                comment: comment
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    changeStatus(req, res) {
        let comment_id = req.body.comment_id;
        let status = req.body.status;
        Comment.findByPk(comment_id).then(comment => {
            comment.status = status;
            comment.save().then(data => {
                res.send({
                    comment: comment
                })
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
};