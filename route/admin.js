var express = require('express');
var router = express.Router();
var category = require('../models/category');
var article=require('../models/article');
var user = require('../models/user');
var comments=require('../models/comments')
var cookies = require('cookies');
var json = {};
router.use(function (req, res, next) {
    json = {
        code: 0,
        msg: 'success'
    };
    next()
});
router.use(function (req, res, next) {
    if (!req.userInfo.isAdmin) {
        res.send('404!');
        res.end();
    }
    next()
});
//分类管理
router.get('/ment', function (req, res) {
    category.find().then(function (info) {
        res.render('admin/user.ejs', {name: info});
        res.end()
    })

});
//删除分类
router.get('/rom', function (req, res) {
    var id = req.query.id;
    category.remove({_id: id}).then(function (info) {
        json.code = 3;
        json.msg = '删除成功！';
        res.send(json);
        res.end()
    })
});
//新增分类
router.get('/cla', function (req, res) {
    res.render('admin/users.ejs');
    res.end();
});
router.get('/clas', function (req, res) {
    var name = req.query.name;
    console.log(name);
    category.findOne({name: name}).then(function (info) {
        if (info) {
            json.code = 1;
            json.msg = '分类信息已经存在！';
            res.send(json);
            return
        }
        var categorys = new category({
            name: name
        });
        return categorys.save();
    }).then(function (nameinfo) {
        json.code = 2;
        json.msg = '分类信息添加成功！'
        res.send(json);
        res.end();
    })
});
//修改分类名称
router.get('/the', function (req, res) {
    var id = req.query.id;
    var name = req.query.name;
    category.findOne({
        _id: {$ne: id},
        name: name
    }).then(function (info) {
        if (info) {
            json.code = 4;
            json.msg = '分类名称已存在！'
            res.send(json);
            return
        } else {
            return category.update({
                _id: id
            }, {
                name: name
            })
        }
    }).then(function (nameinfo) {
        json.code=5;
        json.msg='修改成功！'
        res.send(json)
        res.end()
    })
});
//新增文章
router.get('/articles/new',function (req,res) {
    category.find().then(function (data) {
        res.render('admin/articles.ejs',{name:data})
    })
});
router.post('/content',function (req,res) {
    var title=req.body.title;
    var abstract=req.body.abstract;
    var content=req.body.content;
    var selt=req.body.selt;
    var selv=req.body.selv;
    var current=req.body.current;
    new article({
        title:title,
        abstract:abstract,
        current:current,
        content:content,
        class:selv,
        name:selt
    }).save().then(function (info) {
        json.code=6;
        json.msg='文章添加成功！';
        res.send(json);
        res.end()
    })

});
//文章管理
router.get('/article-ment',function (req,res) {
    article.find().then(function (info) {
        category.find().then(function (clainfo) {
            res.render('admin/article-add.ejs',{
                content:info,
                cla:clainfo
            })
        })

    })

});
//文章删除
router.get('/article/rom',function (req,res) {
    var id=req.query.id;
    article.remove({_id:id}).then(function (info) {
        json.code=7;
        json.msg='文章删除成功！';
        res.send(json);
        res.end();
    })
});
//文章内容获取
router.post('/article/find',function (req,res) {
    var id=req.body.id;
    article.findOne({_id:id}).then(function (info) {
        res.send(info);
        res.end()
    })
});
//文章修改
router.post('/acticle/update',function (req,res){
    var id=req.body.id;
    var title=req.body.title;
    var abstract=req.body.abstract;
    var content=req.body.content;
    var op=req.body.op;
    var opv=req.body.opv;
    article.update({
        _id:id
    },{
        title:title,
        abstract:abstract,
        content:content,
        class:opv,
        name:op
    }).then(function (info) {
        json.code=8;
        json.msg='文章修改已经完成！';
        res.send(json);
        res.end()
    })
});
//用户管理
router.get('/name',function (req,res) {
    user.find().then(function (info) {
        res.render('admin/name.ejs',{info:info})
    })
});
//用户删除
router.get('/name/delete',function (req,res) {
    var id=req.query.id;
    user.remove({_id:id}).then(function (info) {
        json.code=9;
        json.msg='用户删除成功！';
        res.send(json);
        res.end();
    })
});
module.exports = router;