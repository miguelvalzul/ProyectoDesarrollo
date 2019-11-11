'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let UserSchema = Schema({
    nickname: String,
    email: String,
    password: String,
    image: String
})
module.exports = mongoose.model('User', UserSchema);