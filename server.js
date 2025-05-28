const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.post('/login', (req, res)=>{
    const {usuario, contrasena} = req.body;
    const sql = 'select * from usuario where usuario = ? and contrasena = ?';
    db.query(sql, [usuario, contrasena], (err, resultados)=>{
        if(err)throw err;
        if(resultados.length > 0){
            res.send('Inicio de Sesion Exitoso');
        }
        else{
            res.send('Credenciales Incorrectas');
        }
    });
});

app.post("/register", (req, res) => {
    const { new_usuario, new_contra } = req.body;

    const sqlCheck = "SELECT * FROM usuario WHERE usuario = ?";
    db.query(sqlCheck, [new_usuario], (err, resultados) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error en el servidor");
        }

        if (resultados.length > 0) {
            return res.send("El usuario ya existe");
        } else {
            const sql = "INSERT INTO usuario (usuario, contrasena) VALUES (?, ?)";
            db.query(sql, [new_usuario, new_contra], (err, resultados) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error al registrar");
                }

                if (resultados.affectedRows > 0) {
                    return res.send("Registro exitoso");
                } else {
                    return res.send("No se pudo registrar");
                }
            });
        }
    });
});

app.listen(3000,()=>{
    console.log('Servidor Corriendo en http://localhost:3000');
});