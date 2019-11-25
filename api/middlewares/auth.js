"use strict"

let jwt = require("jwt-simple");
let moment = require("moment");
let secret = "secretPassw0rd123";

function auth(req,res,next){
    //console.log(req.headers.auth);
    if(!req.headers.auth){
        return res.status(403).send({
            message:"La aplicación no tiene cabecera de autenticación"
        });
    }
    let token = req.headers.auth.replace([/['"]+/g,'']);
    //console.log(token)
    
    //console.log(payload)
    let payload;
    try{
        payload = jwt.decode(token,secret);
        console.log(payload);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message:"Usuario no autorizado"
            });
        }
    }catch(ex){
        return res.status(500).send({
            message: "Error en la autenticación"
        });
    }
    req.user = payload;
    next();
}

module.exports = {
    auth
}

