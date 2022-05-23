const { Router } = require('express');
const helper = require('../lib/helper');
const generar = require('../lib/primo');
const pool = require('../db');
const router = Router();

router.get('/register', (req, res) => res.render('register'));

router.post('/signup', async (req, res) => {
    const { name, last, email, pass } = req.body;
    const llave = generar();
    const user = {
        nombre: name,
        apellido: last,
        correo: email,
        clave: pass,
        llave
    }
    user.clave = await helper.encryptPass(user.clave);
    pool.query('INSERT INTO persona SET ?', [user], async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('register', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro exitoso, su llave privada es " + user.llave,
                alertIcon: "success",
                showConfirmButton: false,
                timer: 3000,
                ruta: "login"
            });
        }
    });
});

module.exports = router;