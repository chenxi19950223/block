var mongoose=require('mongoose');

var comments=require('../schema/comments');

module.exports=mongoose.model('comments',comments);