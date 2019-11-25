'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// Cargar Rutas

let user_routes = require("./routes/user")

// MidelWares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// CORS

// Rutas
app.use("/api",user_routes);

module.exports = app;