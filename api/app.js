'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let user_routes = require("./routes/user")
let app = express();

// Cargar Rutas

/* app.get('/', (req,res)=>{
    res.status(200).send({
        message: 'Hola Mundo'
    });
}); */

// MidelWares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// CORS

// Rutas
app.use("/api",user_routes);

module.exports = app;