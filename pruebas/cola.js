const Cola = require("../src/estructuras/Cola");

const assert = require("assert");


const cola = new Cola();



const turno1 = {
    mascota: "Lola",
    tutor: "Ana",
    horaLlegada: "08:00",
    motivo: "Vacunación"
};

const turno2 = {
    mascota: "Toby",
    tutor: "Carlos",
    horaLlegada: "08:10",
    motivo: "Control general"
};

const turno3 = {
    mascota: "Mía",
    tutor: "Laura",
    horaLlegada: "08:20",
    motivo: "Limpieza dental"
};

const turno4 = {
    mascota: "Max",
    tutor: "Pedro",
    horaLlegada: "08:30",
    motivo: "Desparasitación"
};

const turno5 = {
    mascota: "Luna",
    tutor: "María",
    horaLlegada: "08:40",
    motivo: "Control de peso"
};



console.log("REGISTRO DE TURNOS");

cola.encolar(turno1);
cola.encolar(turno2);
cola.encolar(turno3);
cola.encolar(turno4);
cola.encolar(turno5);

console.log("Cinco turnos registrados.");




console.log("\nSIGUIENTE TURNO");

console.log(cola.verFrente());

assert.strictEqual(cola.verFrente(), turno1);




console.log("\nTAMAÑO DE LA COLA");

console.log("Mascotas esperando:", cola.tamanio());

assert.strictEqual(cola.tamanio(), 5);



console.log("\nATENDIENDO MASCOTAS");

const atendidos = [];

while (!cola.estaVacia()) {

    const turno = cola.desencolar();

    atendidos.push(turno.mascota);

    console.log(
        "Atendiendo:",
        turno.mascota,
        "| Tutor:",
        turno.tutor,
        "| Hora:",
        turno.horaLlegada,
        "| Motivo:",
        turno.motivo
    );
}


console.log("\nVERIFICAR ORDEN FIFO");

console.log(atendidos);

assert.deepStrictEqual(
    atendidos,
    ["Lola", "Toby", "Mía", "Max", "Luna"]
);

console.log("El orden FIFO es correcto.");



console.log("\nCOMPROBAR COLA VACIA");

console.log("¿Está vacía?", cola.estaVacia());

console.log("Tamaño:", cola.tamanio());

assert.strictEqual(cola.estaVacia(), true);
assert.strictEqual(cola.tamanio(), 0);
assert.strictEqual(cola.frente, null);
assert.strictEqual(cola.final, null);



console.log("\nDESENCOLAR COLA VACIA");

const resultado = cola.desencolar();

console.log("Resultado:", resultado);

assert.strictEqual(resultado, null);

assert.strictEqual(cola.frente, null);
assert.strictEqual(cola.final, null);
assert.strictEqual(cola.tamanio(), 0);




console.log("TODAS LAS PRUEBAS FUERON EXITOSAS");




console.log("\n===== COMPARACION DE RENDIMIENTO =====");

const cantidad = 100000;

// Crear 100.000 turnos de prueba
const turnos = [];

for (let i = 1; i <= cantidad; i++) {

    turnos.push({
        mascota: "Mascota " + i,
        tutor: "Tutor " + i,
        horaLlegada: "09:00",
        motivo: "Consulta general"
    });

}



const colaPrueba = new Cola();

// Medir tiempo de encolar
console.time("Cola - Encolar 100.000 turnos");

for (let i = 0; i < cantidad; i++) {
    colaPrueba.encolar(turnos[i]);
}

console.timeEnd("Cola - Encolar 100.000 turnos");


// Medir tiempo de desencolar
console.time("Cola - Desencolar 100.000 turnos");

for (let i = 0; i < cantidad; i++) {
    colaPrueba.desencolar();
}

console.timeEnd("Cola - Desencolar 100.000 turnos");



const arreglo = [];

// Medir tiempo de encolar con push
console.time("Arreglo - Encolar 100.000 turnos");

for (let i = 0; i < cantidad; i++) {
    arreglo.push(turnos[i]);
}

console.timeEnd("Arreglo - Encolar 100.000 turnos");


// Medir tiempo de desencolar con shift
console.time("Arreglo - Desencolar 100.000 turnos");

for (let i = 0; i < cantidad; i++) {
    arreglo.shift();
}

console.timeEnd("Arreglo - Desencolar 100.000 turnos");



console.log("\n===== RESULTADOS FINALES =====");

console.log("Turnos procesados:", cantidad);

console.log("Cola vacía:", colaPrueba.estaVacia());

console.log("Arreglo vacío:", arreglo.length === 0);
