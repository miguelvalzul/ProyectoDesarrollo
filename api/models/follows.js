'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FollowSchema = Schema({
    follower: {type:Schema.ObjectId,ref:'User'},
    followed: {type:Schema.ObjectId,ref:'User'},
})
module.exports = mongoose.model("Follow",FollowSchema);