const Nodo = require("../src/Nodo");



// Primera atención: Vacunación
const atencion1 = {
    fecha: "02/02",
    motivo: "Vacunación",
    veterinario: "Dra. Ríos",
    costo: 85000
};

// Segunda atención: Control de peso
const atencion2 = {
    fecha: "15/03",
    motivo: "Control de peso",
    veterinario: "Dr. Gómez",
    costo: 40000
};

// Tercera atención: Limpieza dental
const atencion3 = {
    fecha: "20/05",
    motivo: "Limpieza dental",
    veterinario: "Dra. Ríos",
    costo: 150000
};



const nodo1 = new Nodo(atencion1);
const nodo2 = new Nodo(atencion2);
const nodo3 = new Nodo(atencion3);




nodo1.siguiente = nodo2;
nodo2.siguiente = nodo3;


const cabeza = nodo1;



console.log("HISTORIAL VETERINARIO DE LOLA");

let actual = cabeza;

while (actual !== null) {

    

    console.log("Fecha:", actual.dato.fecha);
    console.log("Motivo:", actual.dato.motivo);
    console.log("Veterinario:", actual.dato.veterinario);
    console.log("Costo: $" + actual.dato.costo);

    actual = actual.siguiente;
}



let total = 0;
let recorrido = cabeza;

while (recorrido !== null) {

    total = total + recorrido.dato.costo;

    recorrido = recorrido.siguiente;
}


console.log("COSTO TOTAL DEL HISTORIAL: $" + total);