const assert = require("assert");
const Recepcion = require("../src/dominio/Recepcion");

const recepcion = new Recepcion();
const general = { mascota: "Toby", tipo: "General" };
const urgencia1 = { mascota: "Luna", tipo: "Urgencia" };
const urgencia2 = { mascota: "Kira", tipo: "Urgencia" };

// Las urgencias tienen prioridad; cada categoría conserva su orden FIFO.
recepcion.registrarLlegada(general);
recepcion.registrarLlegada(urgencia1);
recepcion.registrarLlegada(urgencia2);
assert.strictEqual(recepcion.llamarSiguiente(), urgencia1);
assert.strictEqual(recepcion.llamarSiguiente(), urgencia2);
assert.strictEqual(recepcion.llamarSiguiente(), general);
assert.strictEqual(recepcion.estaVacia(), true);

// Una llamada con sala vacía devuelve null sin lanzar una excepción.
assert.strictEqual(recepcion.llamarSiguiente(), null);
assert.strictEqual(recepcion.estaVacia(), true);

console.log("Pruebas de recepción y sala vacía pasaron.");
