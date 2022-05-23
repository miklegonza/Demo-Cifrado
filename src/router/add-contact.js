const { Router } = require('express');
const pool = require('../db');
const router = Router();

router.get('/add-contact');

router.post('/add-contact', async (req, res) => {
    const { name } = req.body;
    if (name) {
        pool.query('SELECT id, llave FROM persona WHERE nombre = ?', [name], async (error, result) => {
            if (result.length > 0) {
                const llaveReceptor = result[0].llave;
                const sessName = req.session.name;
                pool.query('SELECT llave FROM persona WHERE nombre = ?', [sessName], async (error, result) => {
                    const llaveEmisor = result[0];
                });
            }

        });

    }
});
//select id from persona where correo = $correo; --
//insert into contacto(receptor, emisor) vaules id↑, loggeada;
//insert into contacto(emisor, receptor) vaules id↑, loggeada;
//select llave from persona where correo = $correo; diffie
//select llave from persona where id = $logueada; diffie >> compartida
//

module.exports = router;
