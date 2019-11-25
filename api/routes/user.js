'use strict'

let express = require('express');
let UserController = require("../controllers/user");
let auth = require("../middlewares/auth");
let api = express.Router();
// Definicion de las rutas

api.get("/home",UserController.home);
api.get("/pruebas",auth.auth,UserController.pruebas);
api.post("/registrar",UserController.saveUser);
api.post("/login", UserController.logIn);
api.get("/getUser/:id",auth.auth,UserController.getUser);
api.get("/getUsers/:page?", auth.auth, UserController.getUsers);
module.exports = api;

