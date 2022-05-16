const mysql = require("mysql");

const con = require('./conexion');
const conexion = con();
conexion.connect((err) => {
    if (err) throw err
    else console.log("la conexion funciona")
})

    conexion.query('SELECT * FROM persona', (err,rows) => {
        if (err) throw err;
        else {
            console.log('datos: ');
            console.log(rows);
            var resultados = rows[0];
        }
        });
    
    
