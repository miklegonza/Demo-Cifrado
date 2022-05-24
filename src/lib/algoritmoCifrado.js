// C = ((m + K + 3 + n) mod (n * 3)) + (A * B)
// M = ((C - K - 3 - n) mod (n * 3)) - (A * B)

//const generar = require('./primo');

//const mensaje = "     ALGORITMO CIFRADO     ";

const n = 2700; // base modular
//const A = 7; // clave privada emisor (Bob)
//const B = 9; // clave privada receptor (Alice)

//var K = generar(); // clave
var mensajeASCIICifrado = [];
var mensajeCifrado = [];

/**
 * Convierte el mensaje a código ASCII y aplica la función de cifrado.
 * 
 * @param mensaje Mensaje por cifrar
 */
const cifrar = function(mensaje, K, A, B) {
    let arreglo = mensaje.replace(/ /g, "");
    for (let i = 0; i < arreglo.length; i++) {
        mensajeASCIICifrado.push(arreglo.charCodeAt(i));
        mensajeCifrado.push(((mensajeASCIICifrado[i] + K + 3 + n) % (n * 3)) + (A * B));
    }
    console.log(mensaje);
    console.log("ASCII sin cifrar: " + mensajeASCIICifrado);
    console.log("Mensaje cifrado: " + mensajeCifrado);
    return mensajeCifrado.toString();
};


/*
cifrar(mensaje);
console.log("ASCII sin cifrar: " + mensajeASCIICifrado);
console.log("Mensaje cifrado: " + mensajeCifrado);
*/


module.exports = cifrar;

