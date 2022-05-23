const { Router } = require('express');
const pool = require('../db');
const router = Router();
const cifrar = require('../lib/algoritmo');

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
            res.redirect('/');
        }
    });
});


module.exports = router;
