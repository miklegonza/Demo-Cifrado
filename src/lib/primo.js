

/**
 * Valida si el número ingresado es primo
 * 
 * @param {Number} num Número que se va a validar
 * @returns Verdadero si el número es primo
 */
 function esPrimo(num) {
    if (num == 0 || num == 1 || num == 4) return false;
    for (let x = 2; x < num / 2; x++) {
        if (num % x === 0) return false;
    }
    return true;
}

/**
 * Genera un número aleatorio de 2 cifras y valida que sea primo.
 * 
 * @returns Un número primo
 */
 const generarPrimo = function() {
    do {
        num = Math.floor((Math.random() * 100));
    } while (!esPrimo(num));
    return num;
}

module.exports = generarPrimo;
