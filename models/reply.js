var mongoose=require('mongoose');

var reply=require('../schema/reply');

module.exports=mongoose.model('reply',reply);