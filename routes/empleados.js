const express = require("express")
const empleados = express.Router();
const db = require('../config/database')
const response = require("../middleware/responses")

// GET General

empleados.get("/", async (req, res, next) => {
    // console.log(req)
    const users = await db.query(`  SELECT 
                                        id,
                                        Nombre,
                                        Apellido,
                                        Correo,
                                        Staff 
                                    FROM 
                                        users 
                                    WHERE 
                                        Status=1`)
    return response(res, 200, users)
})



empleados.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = ` UPDATE 
                        users 
                    SET 
                        status=0 
                    WHERE 
                        id=${req.params.id}`;

    const rows = await db.query(query);
    if(rows.affectedRows == 1){

        return response(res, 200, "Usuario borrado correctamente")
    }
    return response(res, 404, "Usuario no encontrado")
})

empleados.post("/:id([0-9]{1,3})", async (req, res, next) => {
    
    const {Nombre, Apellido, Telefono, Correo, Direccion, Staff} = req.body;

    if(Nombre && Apellido && Telefono && Correo && Direccion && Staff){
        let query =`UPDATE 
                        users 
                    SET Nombre='${Nombre}',
                        Apellido='${Apellido}', 
                        Telefono='${Telefono}',
                        Correo='${Correo}',
                        Direccion='${Direccion}',
                        Staff='${Staff}' 
                    WHERE 
                        id=${req.params.id} AND
                        status=1`;
    
        const rows = await db.query(query)
    
        if(rows.affectedRows == 1){
            return response(res, 200, "Usuario modificado correctamente")
        }
        return response(res, 500, "Ocurrio un error con los campos")
    }
    return response(res, 500, "Campos incompletos")

})


empleados.get("/:id([0-9]{1,3})", async (req, res, next) => {
    const id = req.params.id;
    if (id) {
        user = await db.query(`SELECT * FROM users where id=${id} AND status=1`);

        return response(res, 200, user)
    }
    return response(res, 404, "Usuario no encontrado")
    
})


empleados.post("/registro", async (req, res, next) =>{
    const {Nombre, Apellido, Telefono, Correo, Direccion, Staff, password} = req.body;

    if(Nombre && Apellido && Telefono && Correo && Direccion){
        let query =`INSERT INTO 
                    users ( 
                        Nombre,
                        Apellido,
                        Telefono,
                        Correo,
                        Direccion,
                        Staff,
                        password)
                    VALUES (                        
                        '${Nombre}',
                        '${Apellido}', 
                        '${Telefono}',
                        '${Correo}',
                        '${Direccion}',
                        '${Staff}',
                        '${password}')`;
    
        const rows = await db.query(query)
    
        if(rows.affectedRows == 1){
            return response(res, 200, "Usuario modificado correctamente")
        }
        return response(res, 500, "Ocurrio un error con los campos")
    }
    return response(res, 500, "Campos incompletos")
})



module.exports = empleados