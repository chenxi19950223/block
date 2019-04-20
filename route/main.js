var express = require('express');

var router = express.Router();

var category = require('../models/category');

var comments = require('../models/comments');

var article = require('../models/article');
//页面渲染
router.get('/', function (req, res) {
    var id = req.query.nav;
    var page = Number(req.query.page) || 1;
    var limit = 4;
    var skip = (page - 1) * limit;
    category.find().then(function (info) {
        article.find().limit(limit).sort({'_id': -1}).skip(skip).then(function (infos) {
            if (id) {
                article.count({class: id}).then(function (infor) {
                    var pages = Math.ceil(infor / limit);
                    if (pages === 0) {
                        pages = 1
                    }
                    article.find({class: id}).sort({'_id': -1}).limit(limit).skip(skip).then(function (content) {
                        res.render('mian/index.ejs', {
                            userInfo: req.userInfo,
                            name: info,
                            content: content,
                            page: page,
                            pages: pages,
                            id: id,
                            infos: infos
                        })
                    })
                });
            } else {
                article.count().then(function (infor) {
                    var pages = Math.ceil(infor / limit);
                    article.find().limit(limit).sort({'_id': -1}).skip(skip).then(function (content) {
                        res.render('mian/index.ejs', {
                            userInfo: req.userInfo,
                            name: info,
                            content: content,
                            pages: pages,
                            page: page,
                            id: '',
                            infos: infos
                        })
                    })
                });
            }
        })
    })
});

//文章渲染
router.get('/ion', function (req, res) {
    var id = req.query.id;
    var limit = 4;
    category.find().then(function (name) {
        article.findOne({_id: id}).then(function (info) {
            comments.find({article: id}).then(function (ooo) {
                article.find().limit(limit).sort({'_id': -1}).then(function (content) {
                    res.render('mian/pages.ejs', {
                        infos: content,
                        info: info,
                        name: name,
                        userInfo: req.userInfo,
                        id: id
                    });
                });
                info.reading++;
                info.save();
                article.update({_id: id}, {comments: ooo.length}).then(function (com) {
                })
            })
        })
    })
});
module.exports = router;