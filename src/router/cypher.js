const { Router } = require('express');
const cifrar = require('../lib/algoritmoCifrado');
const pool = require('../db');
const router = Router();

router.get('/cypher');

router.post('/cypher', async (req, res) => {
    const { message } = req.body;
    const cifrado = cifrar(message);
    const mensaje = {
        detalle: cifrado,
        remitente: 1,
        destinatario: 1
    };
    pool.query('INSERT INTO mensaje SET ?', [mensaje], async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index', {
                alert: true,
                alertTitle: "Éxito",
                alertMessage: "Mensaje cifrado y guardado",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 3000,
                ruta: ""
            });
        }
    });
});


module.exports = router;

// select del id de contactos caundo el id logged 
//clave usuario seleccionado
//Clave del usuario logueado
// Clave compartida
