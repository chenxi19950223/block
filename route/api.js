//逻辑
var express = require('express');

var router = express.Router();

var user = require('../models/user');

var cookies = require('cookies');

var article = require('../models/article');

var comments = require('../models/comments');

var reply=require('../models/reply');

var json = {};

router.use(function (req, res, next) {
    json = {
        code: 0,
        msg: 'success'
    };
    next();
});

//退出登录；
router.get('/logout', function (req, res) {
    req.cookies.set('cx', null);
    json.code = 5;
    json.msg = '退出成功！';
    res.send(json);
    res.end();
});

//注册
router.post('/user/reg', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    user.findOne({username: username}).then(function (info) {
        if (info) {
            json.code = 1;
            json.msg = '账号已存在！';
            res.send(json);
            return
        }
        var users = new user({
            username: username,
            password: password
        });
        return users.save();
    }).then(function (userinfo) {
        json.code = 2;
        json.msg = '注册成功!请登录！';
        res.send(json);
        res.end()
    })

});

//登录
router.post('/user/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    user.find({
        username: username,
        password: password
    }).then(function (info) {
        if (!info) {
            json.code = 3;
            json.msg = '账号密码错误！';
            res.send(json);
            return
        }
        json.code = 4;
        json.msg = '登录成功！';
        req.cookies.set('cx', JSON.stringify({
            id: info[0]._id,
            username: info[0].username,
            isAdmin: info[0].isAdmin
        }));
        res.send(json);
        res.end();
    })
});

//评论
router.get('/comments', function (req, res) {
    var id = req.query.id;
    var user = req.query.user;
    var incom = req.query.incom;
    var userid = req.query.userid;
    var current = req.query.oDate;
    console.log(user)
    new comments({
        content: incom,
        username: user,
        article: id,
        userid: userid,
        current: current
    }).save().then(function (com) {
        res.end()
    })
});

router.get('/comments/com', function (req, res) {
    var id = req.query.id;
    comments.find({article: id}).then(function (info) {
        res.send(info);
        res.end()
    })

});

//删除留言
router.get('/romcom', function (req, res) {
    var id = req.query.id;
    reply.remove({comments: id}).then(function (info) {
        json.code = 5;
        json.msg = "删除成功！";
        res.send(json);
        res.end();
    });
});

//回复评论
router.get('/reply', function (req, res) {
    var articleid=req.query.id//文章ID
    var comid = req.query.comid//那一条被回复id
    var userid = req.query.userid//是谁回复id
    var name = req.query.name//是谁被回复用户名称
    var incom = req.query.incom//回复内容
    var oDate = req.query.oDate//时间
    var user = req.query.user//用户名
    new reply({
        content: incom,//回复内容
        current: oDate,//回复时间
        replyname: name,//是谁被回复（名字）
        comid: userid,//是谁被回复（id）
        article: articleid,//在哪一个文章下被回复
        comments: comid,//回复了那一条（id）
        username: user//是谁回复的（用户名）
    }).save().then(function (info) {
        console.log(info)
        json.code=7;
        json.msg='回复成功！';
        res.send(json);
        res.end()
    })
});

router.get('/reply/re',function (req,res) {
   var id=req.query.id;
   reply.find({article:id}).then(function (info) {
       res.send(info);
       res.end();
   })
});

//删除回复
router.get('/reply/rom',function (req,res) {
    var id=req.query.id;
    console.log(id);
    reply.remove({_id:id}).then(function (info) {
        json.code=6;
        json.msg='删除成功！';
        res.send(json);
        res.end();
    })
})


module.exports = router;