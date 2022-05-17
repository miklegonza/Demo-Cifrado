const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const connection = require('./assets/js/database/db');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

dotenv.config();

app.use('/resources', express.static('assets'));
app.use('/resources', express.static(__dirname + '/assets'));

app.set('view engine', 'ejs');

app.use(session ({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));

app.post('/register', async (req, res) => {
    const name = req.body.name;
    const last = req.body.last;
    const email = req.body.email;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO persona SET ?', {
        nombre:name, 
        apellido:last, 
        correo:email, 
        clave:passwordHash
    }, async (error, result) => {
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

app.post('/auth', async(req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    let passwordHash = await bcryptjs.hash(pass, 8);
    if (email && pass) {
        connection.query('SELECT * FROM persona WHERE correo = ?', [email], async(error, result) => {
            if (result.length == 0 || !(await bcryptjs.compare(pass, result[0].clave))) {
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

app.get('/', (req, res) => {
    if (req.session.logged) {
        res.render('index', {
            login: true,
            name: req.session.name
        });
    } else {
        res.render('index', {
            login: false,
            name: 'Debe iniciar sesión',
        });
        res.render('index', {
            alert: true,
            alertTitle: "Error",
            alertMessage: "Debe iniciar sesión",
            alertIcon: "error",
            showConfirmButton: true,
            timer: false,
            ruta: "login"
        });
    }
});

app.use((req, res, next) => {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.get('/logout', (req, res) => req.session.destroy(() => res.redirect('login')));

app.listen(3000, (req, res) => console.log("Servidor en http://localhost:3000/"));






