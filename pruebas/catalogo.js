const assert = require("assert");
const {
    catalogo,
    buscarServicio,
    rutaDeServicio,
    precioPaquete,
    serviciosEnRango
} = require("../src/Catalogo");

// Búsqueda de servicio del primer nivel, profundo e inexistente.
assert.strictEqual(buscarServicio(catalogo, "Rabia").precio, 45000);
assert.strictEqual(buscarServicio(catalogo, "Gata").precio, 280000);
assert.strictEqual(buscarServicio(catalogo, "Peluquería"), null);

// El hallazgo temprano evita incluso consultar las subcategorías.
const categoriaConHallazgoTemprano = {
    nombre: "Raíz",
    servicios: [{ nombre: "Primero", precio: 1 }],
    get subcategorias() {
        throw new Error("La búsqueda siguió después de encontrar el servicio");
    }
};
assert.deepStrictEqual(
    buscarServicio(categoriaConHallazgoTemprano, "Primero"),
    { nombre: "Primero", precio: 1 }
);

assert.deepStrictEqual(rutaDeServicio(catalogo, "Rabia"), ["Patitas", "Vacunas", "Rabia"]);
assert.deepStrictEqual(rutaDeServicio(catalogo, "Gata"), [
    "Patitas",
    "Cirugías",
    "Esterilización",
    "Gata"
]);
assert.strictEqual(rutaDeServicio(catalogo, "Peluquería"), null);

const cirugias = catalogo.subcategorias.find((categoria) => categoria.nombre === "Cirugías");
assert.strictEqual(precioPaquete(cirugias), 702000);

const serviciosEsperados = [
    "Consulta a domicilio",
    "Dermatología",
    "Cardiología",
    "Con anestesia",
    "Triple felina"
];
assert.deepStrictEqual(
    serviciosEnRango(catalogo, 80000, 150000).map((servicio) => servicio.nombre),
    serviciosEsperados
);

const categoriaVacia = { nombre: "Vacía", servicios: [], subcategorias: [] };
assert.strictEqual(buscarServicio(categoriaVacia, "Gata"), null);
assert.strictEqual(rutaDeServicio(categoriaVacia, "Gata"), null);
assert.strictEqual(precioPaquete(categoriaVacia), 0);
assert.deepStrictEqual(serviciosEnRango(categoriaVacia, 80000, 150000), []);

console.log("Pruebas del catálogo pasaron.");
