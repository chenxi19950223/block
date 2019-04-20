var mongoose=require('mongoose');

var schema=mongoose.Schema;

var reply=new  schema({
    //回复内容
    content:{
        type:String,
        default:''
    },
    //时间
    current:{
        type:String,
        default:''
    },
    //谁被回复用户名称
    replyname:{
        type:String,
        default:''
    },
    //是谁回复了用户名称
    username:{
        type:String,
        default:''
    },
    //是谁回复lid
    comid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    },
    //评论文章id
    article:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    //那一条被回复id
    comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }
});

module.exports=reply;