const express = require("express")
const jwt = require('jsonwebtoken')
const user = express.Router();
const db = require('../config/database')
const response = require("../middleware/responses")


// user.post("/signin", async (req, res, next) =>{
//     const {user_name, user_mail, user_password} = req.body
//     if(user_name && user_mail && user_password){
//         let query = "INSERT INTO user( user_name, user_mail, user_password) "+
//         `VALUES ('${user_name}', '${user_mail}', '${user_password}')`
    
//         const rows = await db.query(query)
//         if(rows.affectedRows == 1){
//             return res.status(201).json({code: 201, message: "Usuario registrado correctamente"})
//         }
//         return res.status(500).json({code: 500, message: "Ocurrio un error"})
//     }
//     else{
        
//         return res.status(500).json({code: 500, message: "Campos incompletos"})
//     }
// })

user.post("/login", async (req, res, next) => {
    const {correo, password} = req.body
    if(correo && password){
        const query = ` SELECT 
                            * 
                        FROM 
                            users 
                        WHERE 
                            correo = '${correo}' AND 
                            password = '${password}'`

        const rows = await db.query(query)

        if(rows.length == 1){
            const {id, Nombre, Staff} = rows[0]
            const token = {
                user:{
                    id: id,
                    Nombre: Nombre
                },
                token: jwt.sign({
                            user_id: rows[0].user_id,
                            user_mail: rows[0].user_mail, 
                        }, "aa31ab423339324dc962bb14488b4d06")
            }
            if(Staff==1){
                return response(res, 200, token)
            }
            else{
                return response(res, 400, "No tienes permisos de administrador")
            }
        }
        else{
            return response(res, 400, "Usuario y/o contraseña incorrectos")
        }
    }
    else{
        return response(res, 500, "Campos incompletos")
    }
})


module.exports = user