var p = 1000; // base modular
var g = Math.floor(Math.random() * 5000); // base compartida
var a = 3; // numero secreto Alice
var b = 7; // numero secreto Bob
var KA = 0;
var KB = 0;
var A = 0;
var B = 0;

while (A == B) {
    A = Math.pow(g, a) % p;
    B = Math.pow(g, b) % p;
    g = Math.floor(Math.random() * 1000);
}
console.log(A + " y " + B);

KA = Math.pow(B, a) % p;
KB = Math.pow(A, b) % p;
while (KA != KB || KA <= 5 || KB <= 5) {
    g = Math.floor(Math.random() * 1000);
    A = Math.pow(g, a) % p;
    B = Math.pow(g, b) % p;
    KA = Math.pow(B, a) % p;
    KB = Math.pow(A, b) % p;
}
if (KA == KB) {
    console.log("la clave secreta es: " + KA + " y " + KB);
} else {
    console.log("error");
}