const { Router } = require('express');
const diffie = require('../lib/diffie-hellman');
const pool = require('../db');
const router = Router();

router.get('/add-contact');

router.post('/add-contact', async (req, response) => {
    const { email } = req.body;
    if (email) {
        pool.query('SELECT id, llave FROM persona WHERE correo = ?', [email], async (error, result) => {
            if (result.length > 0) {
                const llaveReceptor = result[0].llave;
                const llaveEmisor = req.session.llave;
                const clave_compartida = diffie(llaveEmisor, llaveReceptor);
                console.log(clave_compartida);
                let contacto = {
                    clave_compartida,
                    receptor: result[0].id,
                    emisor: req.session.identificador
                };
                pool.query('INSERT INTO contacto SET ?', [contacto], async (req, res) => {
                    if (error) console.log(error);
                });
                contacto = {
                    clave_compartida,
                    receptor: req.session.identificador,
                    emisor: result[0].id
                };
                pool.query('INSERT INTO contacto SET ?', [contacto], async (req, res) => {
                    if (error) {
                        console.log(error);
                    } else {
                        response.render('index', {
                            alert: true,
                            alertTitle: "Éxito",
                            alertMessage: "Contacto agregado exitosamente",
                            alertIcon: "success",
                            showConfirmButton: false,
                            timer: 3000,
                            ruta: ""
                        });
                    }
                });
            } else {
                response.render('index', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Contacto no encontrado",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: ""
                });
            }
        });
    }
});
//select id from persona where correo = $correo; --
//select llave from persona where correo = $correo; diffie --
//select llave from persona where id = $logueada; diffie >> compartida --
//insert into contacto(receptor, emisor) vaules id↑, loggeada; --
//insert into contacto(emisor, receptor) vaules id↑, loggeada; --

module.exports = router;
