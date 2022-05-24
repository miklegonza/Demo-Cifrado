// C = ((m + K + 3 + n) mod (n * 3)) + (A * B)
// M = ((C - K - 3 - n) mod (n * 3)) - (A * B)

const n = 2700; // base modular

var mensajeASCIIDescifrado = [];
var mensajeDescifrado = [];

/**
 * Aplica la función de descifrado y convierte el mensaje a letras desde el código ASCII.
 * 
 * @param cifrado Mensaje por descifrar
 */
 const descifrar = function(cifrado, K, A, B) {
    let arreglo = cifrado.split(",");
    console.log(arreglo);
    for (let i = 0; i < arreglo.length; i++) {
        mensajeASCIIDescifrado.push(((arreglo[i] - K - 3 - n) % (n * 3)) - (A * B));
        mensajeDescifrado.push(String.fromCharCode(mensajeASCIIDescifrado[i]));
    }
    console.log(cifrado);
    console.log("\nASCII descrifrado: " + mensajeASCIIDescifrado);
    console.log("Mensaje descifrado: " + mensajeDescifrado.join(''));
    return mensajeASCIIDescifrado.join('');
};

/*
descifrar(mensajeCifrado);
console.log("\nASCII descrifrado: " + mensajeASCIIDescifrado);
console.log("Mensaje descifrado: " + mensajeDescifrado.join(''));
*/

module.exports = descifrar;
