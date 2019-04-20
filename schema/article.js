var mongoose=require('mongoose');

var schema=mongoose.Schema;

var article=new schema({
   //标题
   title:{
      type:String,
      default:''
   },
   //简介
   abstract:{
      type:String,
      default:''
   },
   //内容
   content:{
      type:String,
      default:''
   },
   //时间
   current:{
      type:String,
      default:''
   },
   //阅读数量
   reading:{
      type:Number,
      default:0
   },
   //分类id
   class:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category'
   },
   //分类名称
   name:{
      type:String,
      default:''
   },
   //评论数量
   comments:{
      type:Number,
      default:0
   }
});

module.exports=article;