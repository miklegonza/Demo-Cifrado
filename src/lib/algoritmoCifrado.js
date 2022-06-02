// C = ((m + K + 3 + n) mod (n * 3)) + (A * B)
// M = ((C - K - 3 - n) mod (n * 3)) - (A * B)

const n = 2700; // base modular

/**
 * Convierte el mensaje a código ASCII y aplica la función de cifrado.
 *
 * @param mensaje Mensaje por cifrar
 */
const cifrar = function (mensaje, K, A, B) {
    var mensajeASCIICifrado = [];
    var mensajeCifrado = [];
    let arreglo = mensaje.replace(/ /g, "");
    for (let i = 0; i < arreglo.length; i++) {
        mensajeASCIICifrado.push(arreglo.charCodeAt(i));
        mensajeCifrado.push(
            ((mensajeASCIICifrado[i] + K + 3 + n) % (n * 3)) + A * B
        );
    }
    return mensajeCifrado.toString();
};

module.exports = cifrar;
