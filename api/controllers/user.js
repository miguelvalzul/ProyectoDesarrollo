'use strict'

let User = require("../models/user");
let bcrypt = require("bcrypt");
let token = require("../services/jwt");
let pagination = require("mongoose-pagination");


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

function saveUser(req,res){
    let params = req.body;
    let user = new User();
    if(params.email && params.nickname && params.password){
        user.nickname = params.nickname;
        user.email = params.email;
        user.image = params.image;
        User.find({$or: [
            {email:user.email},
            {nickname:user.nickname}
        ]}).exec((err,usuarios)=>{
            if(err) return res.status(500).send({message:"Error en la petición de usuarios"})
        
            if(usuarios && usuarios.length > 0){
                console.log(User.find({email:user.email}));
                return res.status(200).send({message:"Usuario ya registrado"});
            }else{

                // Para el password
                bcrypt.hash(params.password,10,(err,hash)=>{
                    user.password = hash;
                    //console.log(user.password);
                    user.save((err,userStored)=>{
                        //console.log(err)
                        if(err) return res.status(500).send({message:"Hubo un error al almacenar los datos"});
                        if(userStored){
                            return res.status(200).send({user});
                        }else{
                            return res.status(404).send({message:"Algo falló en el usuario almacenado"});
                        }
                    });
                });
            }
        })
    }else{
        return res.status(200).send({message:"Incluye todos los datos solicitados"});
    }
}

function logIn(req,res){
    let params = req.body;
    let email = params.email;
    let password = params.password;

    User.findOne({email:email},(err,user)=>{
        if(err) return res.status(500).send({message:"Error al consultar la base de datos"});
        if(user){
            bcrypt.compare(password,user.password,(err,check)=>{
                if(check){
                    if(params.gettoken){
                        return res.status(200).send({token:token.createToken(user)});
                    }else{
                        return res.status(200).send({user:user});
                    }
                }else{
                    return res.status(404).send({message:"El usuario o la contraseña son incorrectos"});
                }
            });
        }else{
            return res.status(404).send({message:"El usuario o la contraseña son incorrectos"});
        }

    });

}

function getUser(req,res){
    let userId = req.params.id;
    User.findById(userId, (err,user)=>{
        if(err){
            return res.status(500).send({
                message: "Ocurrió un error al consultar la base de datos"  
            });
        }
        if(!user){
            return res.status(404).send({
                message:"Usuario no encontrado"
            });
        }
        return res.status(200).send({user});
    });
}

function getUsers(req,res){
    let identityId = req.user.sub;
    let page = 1;
    if(req.params.page){
        page = req.params.page;
    }
    let itemsPerPage = 3;
    User.find().sort("_id").paginate(page,itemsPerPage,(err,users,total)=>{
        if(err){
            return res.status(500).send({
                message: "Ocurrió un error"
            });
        }
        if(!users){
            return res.status(404).send({
                message: "No hay usuarios para mostrar"
            });
        }
        return res.status(200).send({
            users:users,
            total:total,
            pages:Math.ceil(total/itemsPerPage)
        });
    });
}
module.exports = {
    home,
    pruebas,
    saveUser,
    logIn,
    getUser,
    getUsers
}