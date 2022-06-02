const { Router } = require("express");
const cifrar = require("../lib/algoritmoCifrado");
const descifrar = require("../lib/algoritmoDescifrado");
const pool = require("../db");
const router = Router();

var contactos = [];

router.get("/", async (req, res) => {
    const { user } = req.query;
    console.log("Usuario " + user);
    if (req.session.logged) {
        const identificador = req.session.identificador;
        const contactosQuery = await pool.query(
            "SELECT persona.id, persona.nombre, persona.correo, persona.llave " +
                "FROM persona WHERE persona.id IN " +
                "(SELECT receptor FROM contacto WHERE emisor = ?)",
            [identificador]
        );
        contactos = [];
        if (contactosQuery)
            contactosQuery.forEach((contacto) =>
                contactos.push({
                    nombre: contacto.nombre,
                    llave: contacto.llave,
                })
            );
        let descifrado = [];
        if (user) {
            const llaveEmisor = 17;
            const llaveReceptor = req.session.llave;
            let idContacto, compartida;

            const values = {
                emisor: req.session.identificador,
                receptor: 2,
            };
            const [contacto] = await pool.query(
                "SELECT id, clave_compartida FROM contacto WHERE emisor = ? AND receptor = ?",
                [values.emisor, values.receptor]
            );
            if (contacto) {
                idContacto = contacto.id;
                compartida = contacto.clave_compartida;
            }
            const [contacto_mensaje] = await pool.query(
                "SELECT relacion_contacto FROM contacto_mensaje WHERE relacion_contacto = ?",
                [idContacto]
            );
            const relacion_contacto = contacto_mensaje.relacion_contacto;
            const mensajes = await pool.query(
                "SELECT mensaje.detalle, contacto_mensaje.relacion_contacto FROM contacto_mensaje INNER JOIN mensaje ON contacto_mensaje.mensaje = mensaje.id AND relacion_contacto = ?",
                [relacion_contacto]
            );
            if (mensajes) {
                mensajes.forEach((mensaje) => {
                    descifrado.push(
                        descifrar(
                            mensaje.detalle,
                            compartida,
                            llaveEmisor,
                            llaveReceptor
                        )
                    );
                });
            } else {
                console.log("No hay registros");
            }
        }
        const resultados = descifrado;
        res.render("", {
            login: true,
            name: req.session.nombre,
            contactos,
            user,
            resultados,
        });
    } else {
        res.render("index", {
            login: false,
            alert: true,
            alertTitle: "Error",
            alertMessage: "Debe iniciar sesión",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login",
        });
    }
});

router.get("/asignar");

router.post("/asignar", async (req, res) => {
    pool.query("SELECT detalle FROM mensaje WHERE");
    const mensajeCifrado = "";
    res.render("", mensajeCifrado);
});

router.get("/cypher");

router.post("/cypher", async (req, res) => {
    if (req.session.logged) {
        const { message } = req.body;
        const llaveEmisor = req.session.llave;
        const llaveReceptor = 17;
        let compartida, idContacto, cifrado;

        const values = {
            emisor: req.session.identificador,
            receptor: 2,
        };
        const [contacto] = await pool.query(
            "SELECT id, clave_compartida FROM contacto WHERE emisor = ? AND receptor = ?",
            [values.emisor, values.receptor]
        );
        if (contacto) {
            idContacto = contacto.id;
            compartida = contacto.clave_compartida;
            cifrado = cifrar(message, compartida, llaveEmisor, llaveReceptor);
        }
        const insert1 = await pool.query(
            "INSERT INTO mensaje SET detalle = ?",
            [cifrado]
        );
        const [mensaje] = await pool.query(
            "SELECT id FROM mensaje WHERE detalle = ?",
            [cifrado]
        );
        if (mensaje) {
            const relacion = {
                relacion_contacto: idContacto,
                mensaje: mensaje.id,
            };
            const insert2 = await pool.query(
                "INSERT INTO contacto_mensaje SET ?",
                [relacion]
            );
            res.render("index", {
                alert: true,
                alertTitle: "Éxito",
                alertMessage: "Mensaje cifrado y enviado",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 3000,
                ruta: "",
            });
        }
    }
});

module.exports = router;

// select del id de contactos caundo el id logged
//clave usuario seleccionado
//Clave del usuario logueado
// Clave compartida
