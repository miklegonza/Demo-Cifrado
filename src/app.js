const express = require('express');
const path = require('path');
const session = require('express-session');

// Inicializaciones
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middlewares
app.use(session ({
    secret: 'miklesession',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/resources', express.static('assets'));
app.use('/resources', express.static(__dirname + '/assets'));

// Global


// Routes
app.use('/', require('./router/signup'));
app.use('/', require('./router/auth'));
app.use('/', require('./router/cypher'));

// Esto no sé donde va
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

app.listen(app.get('port'), (req, res) => console.log('Servidor en http://localhost:' + app.get('port')));






