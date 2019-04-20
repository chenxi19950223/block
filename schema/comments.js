var mongoose=require('mongoose');

var schema=mongoose.Schema;

var category=new schema({
    //评论内容
    content:{
        type:String,
        default:''
    },
    //时间
    current:{
        type:String,
        default:''
    },
    //评论用户名称
    username:{
        type:String,
        default:''
    },
    //评论文章id
    article:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    //评论用户id
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    }
});

module.exports=category;