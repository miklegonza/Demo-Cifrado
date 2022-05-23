const { Router } = require('express');
const pool = require('../db');
const helper = require('../lib/helper');
const router = Router();

router.get('/login', (req, res) => res.render('login'));

router.post('/auth', async(req, res) => {
    const { email, pass } = req.body;
    const user = {
        correo: email,
        clave: pass
    };
    user.clave = await helper.encryptPass(user.clave);
    if (email && pass) {
        pool.query('SELECT * FROM persona WHERE correo = ?', [email], async (error, result) => {
            if (result.length == 0 || !(await helper.comparePass(pass, result[0].clave))) {
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario o contraseña errada",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: "login"
                });
            } else {
                req.session.logged = true;
                req.session.name = result[0].nombre;
                res.render('login', {
                    alert: true,
                    alertTitle: "Inicio de sesión",
                    alertMessage: "Sesión iniciada",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                    ruta: ""
                });
            }
        });
    } else {
        res.render('login', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Debe rellenar todos los campos",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login"
        });
    }
});

module.exports = router;