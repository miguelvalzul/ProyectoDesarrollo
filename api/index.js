'use strict'

let mongoose = require('mongoose');
let app = require("./app");
let port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/proyecto",
{userMongoClient:true})
    .then(()=>{
        console.log("La conexión a la base de datos se ha realizado correctamente");
        app.listen(port, ()=> {
            console.log("Servidor corriendo en http://localhost:3800");
        })
    })
    .catch((err)=>console.log(err));