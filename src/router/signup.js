const { Router } = require('express');
const helper = require('../lib/helper');
const pool = require('../db');
const router = Router();

router.get('/register', (req, res) => res.render('register'));

router.post('/signup', async (req, res) => {
    const { name, last, email, pass } = req.body;
    const user = {
        nombre: name,
        apellido: last,
        correo: email,
        clave: pass
    }
    user.clave = await helper.encryptPass(user.clave);
    pool.query('INSERT INTO persona SET ?', [user], async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('register', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro exitoso",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 3000,
                ruta: "login"
            });
        }
    });
});

module.exports = router;