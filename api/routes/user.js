'use strict'

let express = require('express');
let UserController = require("../controllers/user");

let api = express.Router();
// Definicion de las rutas

api.get("/home",UserController.home);
api.get("/pruebas",UserController.pruebas);
module.exports = api;