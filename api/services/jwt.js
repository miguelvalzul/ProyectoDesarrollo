"use strict"

let jwt = require("jwt-simple");
let moment = require("moment");
let secret = "secretPassw0rd123";

function createToken(user){
    let payload = {
        sub: user._id,
        email: user.email,
        nickname: user.nickname,
        iat: moment().unix(),
        exp: moment().add("30","days").unix()
    }
    return jwt.encode(payload,secret);
}

module.exports = {
    createToken
}