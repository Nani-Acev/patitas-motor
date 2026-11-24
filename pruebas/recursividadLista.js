const ListaEnlazada = require("../src/estructuras/ListaEnlazada");

const lola = new ListaEnlazada();
const toby = new ListaEnlazada();
const mia = new ListaEnlazada();

lola.agregarAlFinal({
    id: "L1",
    motivo: "Vacunación",
    costo: 50000
});

lola.agregarAlFinal({
    id: "L2",
    motivo: "Consulta general",
    costo: 60000
});

toby.agregarAlFinal({
    id: "T1",
    motivo: "Revisión de piel",
    costo: 70000
});

toby.agregarAlFinal({
    id: "T2",
    motivo: "Desparasitación",
    costo: 40000
});

toby.agregarAlFinal({
    id: "T3",
    motivo: "Control",
    costo: 30000
});

mia.agregarAlFinal({
    id: "M1",
    motivo: "Consulta general",
    costo: 60000
});

mia.agregarAlFinal({
    id: "M2",
    motivo: "Limpieza dental",
    costo: 100000
});

const historiales = [
    { nombre: "Lola", lista: lola },
    { nombre: "Toby", lista: toby },
    { nombre: "Mía", lista: mia }
];

historiales.forEach(({ nombre, lista }) => {
    console.log(`Mascota: ${nombre}`);
    console.log("Tamaño iterativo:", lista.obtenerTamanio());
    console.log("Tamaño recursivo:", lista.tamanioRecursivo());
});

historiales.forEach(({ nombre, lista }) => {
    let totalIterativo = 0;

    lista.recorrer((atencion) => {
        totalIterativo += Number(atencion.costo) || 0;
    });

    console.log(`Mascota: ${nombre}`);
    console.log("Costo iterativo:", totalIterativo);
    console.log("Costo recursivo:", lista.costoTotalRecursivo());
});

historiales.forEach(({ nombre, lista }) => {
    const condicion = atencion => atencion.id.endsWith("2");

    console.log(`Mascota: ${nombre}`);
    console.log("Búsqueda iterativa:", lista.buscar(condicion));
    console.log("Búsqueda recursiva:", lista.buscarRecursivo(condicion));
});

historiales.forEach(({ nombre, lista }) => {
    console.log(`Historial de ${nombre}:`);
    lista.imprimirAlReves();
});

const listaGrande = new ListaEnlazada();

for (let i = 1; i <= 100000; i++) {
    listaGrande.agregarAlFinal({
        id: `A${i}`,
        motivo: "Consulta",
        costo: 50000
    });
}

console.log("Lista de 100.000 atenciones creada.");

try {
    console.log("Tamaño recursivo:", listaGrande.tamanioRecursivo());
} catch (error) {
    console.log(error.name);
    console.log(error.message);
}

console.log("Tamaño iterativo:", listaGrande.obtenerTamanio());
