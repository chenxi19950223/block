var express=require('express');

var ejs=require('ejs');

var cookies=require('cookies');

var mongoose=require('mongoose');

var app=express();

var user=require('./models/user');

var admin = require('./route/admin');

var api = require('./route/api');

var main = require('./route/main');

app.set('html','view engine');

app.set('views','./tpl');

app.engine('html',ejs.renderFile);
//引入bodyParser
var bodyParser = require('body-parser');
//是否拓展
app.use(bodyParser.urlencoded({extended: true}));
//文件托管
app.use('/public', express.static(__dirname + '/public'));
//cookies
app.use(function (req,res,next) {
    req.cookies=new cookies(req,res);
    req.userInfo={};
    if (req.cookies.get('cx')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('cx'));
            user.findById(req.userInfo.id).then(function (xc) {
                req.userInfo.isAdmin=xc.isAdmin;
                next();
            })
        } catch (e) {
            next();
        }
    }else {
        next();
    }
});


//设置路由
//如果路径包含api就走到api文件
app.use('/api',api);
//如果路径包含admin就走到admin文件
app.use('/admin',admin);
//路径为/就走到main文件下
app.use('/',main);


mongoose.connect('mongodb://localhost:27018/zanblog', { useNewUrlParser: true } ,function (err) {
    if (err){
        console.log(err)
    } else {
        app.listen(8088);
    }
});

