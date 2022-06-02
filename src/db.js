const mysql = require('mysql');
const dotenv = require('dotenv');
const { promisify } = require('util');

dotenv.config();

const dbconfig = {
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};

const pool = mysql.createPool(dbconfig);

pool.getConnection((error, connection) => {
    if (error) {
        
        if (error.code === 'PROTOCOL_CONNECTION_LOST')
            console.error('Conección perdida');
        if (error.code === 'ER_CON_COUNT_ERROR')
            console.error('Demasiadas conexiones');
        if (error.code === 'ECONNREFUSED')
            console.error('Conexión rechazada');
        if (error.code === 'ER_ACCESS_DENIED_ERROR')
            console.error('Acceso denegado');

    }
    if (connection) connection.release();
    console.log("Conectado");
    
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;
