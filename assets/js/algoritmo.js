// C = ((m + K + 3 + n) mod (n * 3)) + (A * B)
// M = ((C - K - 3 - n) mod (n * 3)) - (A * B)

const mensaje = "     ALGORITMO CIFRADO     ";

const n = 127; // base modular
const A = 7; // clave privada emisor (Bob)
const B = 9; // clave privada receptor (Alice)

var K = 53; // clave
var mensajeASCIICifrado = [];
var mensajeASCIIDescifrado = [];
var mensajeCifrado = []; 
var mensajeDescifrado = [];

function generarPrimo() {
    let primo = false;
    while (!primo) {
        K = Math.floor((Math.random() * 100));
        for (let i = 2; i < K; i++) {
            if (K % i === 0) {
                primo = false;
                break;
            }
        }
    }
}

/**
 * Convierte el mensaje a código ASCII y aplica la función de cifrado.
 * 
 * @param m Mensaje por cifrar
 */
function cifrar(m) {
    //generarPrimo();
    let arreglo = m.replace(/ /g, "");
    for (let i = 0; i < arreglo.length; i++) {
        mensajeASCIICifrado.push(arreglo.charCodeAt(i));
        mensajeCifrado.push(((mensajeASCIICifrado[i] + K + 3 + n) % (n * 3)) + (A * B));
    }
}

/**
 * Aplica la función de descifrado y convierte el mensaje a letras desde el código ASCII.
 * 
 * @param c Mensaje por descifrar
 */
function descifrar(c) {
    for (let i = 0; i < mensajeCifrado.length; i++) {
        mensajeASCIIDescifrado.push(((c[i] - K - 3 - n) % (n * 3)) - (A * B));
        mensajeDescifrado.push(String.fromCharCode(mensajeASCIIDescifrado[i]));
    }
}

console.log("Llave aleatoria: " + K + '\n');

cifrar(mensaje);
console.log("ASCII sin cifrar: " + mensajeASCIICifrado);
console.log("Mensaje cifrado: " + mensajeCifrado);

descifrar(mensajeCifrado);
console.log("\nASCII descrifrado: " + mensajeASCIIDescifrado);
console.log("Mensaje descifrado: " + mensajeDescifrado.join(''));


