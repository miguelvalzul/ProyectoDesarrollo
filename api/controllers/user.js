'use strict'

let User = require("../models/user")

function home(req,res){
    res.status(200).send({
        message:"Hola Mundo"
    });
}

function pruebas(req,res){
    console.log(req.body);
    res.status(200).send({
        message:"Acción de pruebas en el servidor de node.js"
    })
}

module.exports = {
    home,
    pruebas
}