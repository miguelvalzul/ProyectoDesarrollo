'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PublicationSchema = Schema({
    publisher: {type:Schema.ObjectId,ref:'User'},
    image: String,
    likes: String,
    hearts: String,
    url: String
})
module.exports = mongoose.model("Publications",PublicationSchema);