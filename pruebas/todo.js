const assert = require("assert");
const Nodo = require("../src/estructuras/Nodo");
const ListaEnlazada = require("../src/estructuras/ListaEnlazada");
const Cola = require("../src/estructuras/Cola");
const Pila = require("../src/estructuras/Pila");
const RegistroClinico = require("../src/dominio/RegistroClinico");
const Recepcion = require("../src/dominio/Recepcion");
const Editor = require("../src/dominio/Editor");
const Catalogo = require("../src/dominio/Catalogo");

let fallas = 0;

function probar(nombre, caso) {
    try {
        caso();
        console.log(`OK   ${nombre}`);
    } catch (error) {
        fallas++;
        console.log(`FALLA ${nombre}: ${error.message}`);
    }
}

function sinSalida(callback) {
    const original = console.log;
    console.log = () => {};
    try {
        return callback();
    } finally {
        console.log = original;
    }
}

probar("Nodo: dato y enlace inicial", () => {
    const nodo = new Nodo("atención");
    assert.strictEqual(nodo.dato, "atención");
    assert.strictEqual(nodo.siguiente, null);
});

probar("ListaEnlazada: inserción, búsqueda y eliminación", () => {
    const lista = new ListaEnlazada();
    lista.agregarAlFinal({ id: 1, costo: 200 });
    lista.agregarAlFinal({ id: 2, costo: 300 });
    assert.strictEqual(lista.buscar((dato) => dato.id === 2).costo, 300);
    assert.strictEqual(lista.eliminar((dato) => dato.id === 1).id, 1);
    assert.strictEqual(lista.aArreglo().length, 1);
    assert.strictEqual(lista.cola.siguiente, null);
});

probar("ListaEnlazada: casos vacíos y operaciones recursivas", () => {
    const lista = new ListaEnlazada();
    assert.strictEqual(lista.estaVacia(), true);
    assert.strictEqual(lista.buscar(() => true), null);
    assert.strictEqual(lista.eliminar(() => true), null);
    assert.strictEqual(lista.tamanioRecursivo(), 0);
    assert.strictEqual(lista.costoTotalRecursivo(), 0);
    assert.strictEqual(lista.buscarRecursivo(() => true), null);
});

probar("Cola: orden FIFO", () => {
    const cola = new Cola();
    cola.encolar("primero");
    cola.encolar("segundo");
    assert.strictEqual(cola.verFrente(), "primero");
    assert.strictEqual(cola.desencolar(), "primero");
    assert.strictEqual(cola.desencolar(), "segundo");
});

probar("Cola: desencolar vacía", () => {
    const cola = new Cola();
    assert.strictEqual(cola.desencolar(), null);
    assert.strictEqual(cola.verFrente(), null);
    assert.strictEqual(cola.estaVacia(), true);
});

probar("Pila: orden LIFO", () => {
    const pila = new Pila();
    pila.apilar("A");
    pila.apilar("B");
    assert.strictEqual(pila.verTope(), "B");
    assert.strictEqual(pila.desapilar(), "B");
    assert.strictEqual(pila.desapilar(), "A");
});

probar("Pila: desapilar vacía", () => {
    const pila = new Pila();
    assert.strictEqual(pila.desapilar(), null);
    assert.strictEqual(pila.verTope(), null);
    assert.strictEqual(pila.estaVacia(), true);
});

probar("RegistroClinico: crea y recupera historial", () => {
    const registro = new RegistroClinico();
    registro.registrarAtencion("Lola", { motivo: "Control" });
    assert.strictEqual(registro.obtenerHistorial("Lola").obtenerTamanio(), 1);
    assert.strictEqual(registro.obtenerHistorial("No existe"), null);
});

probar("Recepcion: prioridad de urgencia y sala vacía", () => {
    const recepcion = new Recepcion();
    const general = { mascota: "Toby", tipo: "General" };
    const urgencia = { mascota: "Luna", tipo: "Urgencia" };
    sinSalida(() => {
        recepcion.registrarLlegada(general);
        recepcion.registrarLlegada(urgencia);
    });
    assert.strictEqual(recepcion.llamarSiguiente(), urgencia);
    assert.strictEqual(recepcion.llamarSiguiente(), general);
    assert.strictEqual(sinSalida(() => recepcion.llamarSiguiente()), null);
});

probar("Editor: deshacer y rehacer", () => {
    const registro = new RegistroClinico();
    const editor = new Editor(registro);
    const atencion = { id: "A" };
    editor.agregar("Mía", atencion);
    assert.strictEqual(editor.deshacer(), true);
    assert.strictEqual(registro.obtenerHistorial("Mía").obtenerTamanio(), 0);
    assert.strictEqual(editor.rehacer(), true);
    assert.strictEqual(registro.obtenerHistorial("Mía").cabeza.dato, atencion);
});

probar("Editor: deshacer/rehacer sin acciones", () => {
    const editor = new Editor(new RegistroClinico());
    assert.strictEqual(editor.deshacer(), false);
    assert.strictEqual(editor.rehacer(), false);
});

probar("Catálogo: búsqueda, ruta, paquete y rango", () => {
    const { catalogo, buscarServicio, rutaDeServicio, precioPaquete, serviciosEnRango } = Catalogo;
    assert.strictEqual(buscarServicio(catalogo, "Rabia").precio, 45000);
    assert.deepStrictEqual(rutaDeServicio(catalogo, "Gata"), ["Patitas", "Cirugías", "Esterilización", "Gata"]);
    const cirugias = catalogo.subcategorias.find((categoria) => categoria.nombre === "Cirugías");
    assert.strictEqual(precioPaquete(cirugias), 702000);
    assert.strictEqual(serviciosEnRango(catalogo, 80000, 150000).length, 5);
    assert.strictEqual(buscarServicio(catalogo, "Peluquería"), null);
});

probar("Catálogo: categoría vacía", () => {
    const vacia = { nombre: "Vacía", servicios: [], subcategorias: [] };
    assert.strictEqual(Catalogo.buscarServicio(vacia, "Nada"), null);
    assert.strictEqual(Catalogo.rutaDeServicio(vacia, "Nada"), null);
    assert.strictEqual(Catalogo.precioPaquete(vacia), 0);
    assert.deepStrictEqual(Catalogo.serviciosEnRango(vacia, 0, 100), []);
});

console.log(`\nResultado: ${fallas === 0 ? "TODAS LAS PRUEBAS OK" : `${fallas} PRUEBA(S) FALLARON`}`);
if (fallas > 0) {
    process.exitCode = 1;
}
