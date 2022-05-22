const elementos = 1000;
const primos = [];
let iteraciones = 0;

for (let candidato = 2; candidato <= elementos; candidato++) {
    let primo = true;
    for (let divisor = 2; divisor < candidato; divisor++) {
        iteraciones++;
        if (candidato % divisor === 0) {
            primo = !primo;
            break;
        }
    }
    if (primo) primos.push(candidato);
}

const aleatorio = primos[Math.floor(Math.random() * primos.length)];
console.log(aleatorio);


