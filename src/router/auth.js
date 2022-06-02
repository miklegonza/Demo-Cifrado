const { Router } = require('express');
const helper = require('../lib/helper');
const pool = require('../db');
const router = Router();

router.get('/login', (req, res) => res.render('login'));

router.post('/auth', async (req, res) => {
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
                req.session.identificador = result[0].id;
                req.session.nombre = result[0].nombre;
                req.session.correo = result[0].correo;
                req.session.llave = result[0].llave;
                req.session.logged = true;
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

router.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) return console.log(err);
        res.redirect('/login');
    });
});

module.exports = router;
