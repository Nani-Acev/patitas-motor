const ListaEnlazada = require("../src/estructuras/ListaEnlazada");

const assert = require("assert");


function verificar(lista, cabeza, cola, tamanio, nombre) {

    console.log("\nVerificando:", nombre);

    // Comprobar cabeza
    assert.strictEqual(
        lista.cabeza ? lista.cabeza.dato : null,
        cabeza
    );

    // Comprobar cola
    assert.strictEqual(
        lista.cola ? lista.cola.dato : null,
        cola
    );

    // Comprobar tamaño
    assert.strictEqual(
        lista.obtenerTamanio(),
        tamanio
    );

    console.log("Cabeza:", cabeza);
    console.log("Cola:", cola);
    console.log("Tamaño:", tamanio);
    console.log("Estado: CORRECTO");
}



console.log("\nCASO 1");

const lista1 = new ListaEnlazada();

lista1.agregarAlFinal("A");

verificar(lista1, "A", "A", 1, "Final en lista vacía");



console.log("\nCASO 2");

const lista2 = new ListaEnlazada();

lista2.agregarAlInicio("A");

verificar(lista2, "A", "A", 1, "Inicio en lista vacía");



console.log("\nCASO 3");

const lista3 = new ListaEnlazada();

lista3.agregarAlFinal("A");

verificar(lista3, "A", "A", 1, "Preparación con un nodo");

lista3.agregarAlFinal("B");

verificar(lista3, "A", "B", 2, "Final con un nodo");




console.log("\nCASO 4");

const lista4 = new ListaEnlazada();

lista4.agregarAlFinal("A");

verificar(lista4, "A", "A", 1, "Preparación con un nodo");

lista4.agregarAlInicio("B");

verificar(lista4, "B", "A", 2, "Inicio con un nodo");


console.log("\nCASO 5");

const lista5 = new ListaEnlazada();

lista5.agregarAlFinal("A");
lista5.agregarAlFinal("B");
lista5.agregarAlFinal("C");

verificar(lista5, "A", "C", 3, "Preparación con varios nodos");

lista5.agregarAlFinal("D");

verificar(lista5, "A", "D", 4, "Final con varios nodos");



console.log("\nCASO 6");

const lista6 = new ListaEnlazada();

lista6.agregarAlFinal("A");
lista6.agregarAlFinal("B");
lista6.agregarAlFinal("C");

verificar(lista6, "A", "C", 3, "Preparación con varios nodos");

lista6.agregarAlInicio("D");

verificar(lista6, "D", "C", 4, "Inicio con varios nodos");




console.log("\nRECORRER LISTA");

lista6.recorrer((dato) => {
    console.log("Dato:", dato);
});




console.log("\nCONVERTIR A ARREGLO");

console.log(lista6.aArreglo());



console.log("\nCOMPROBAR SI ESTA VACIA");

const listaVacia = new ListaEnlazada();

console.log("¿Está vacía?", listaVacia.estaVacia());

console.log("¿La lista 6 está vacía?", lista6.estaVacia());



console.log("\nOBTENER TAMAÑO");

console.log("Tamaño de lista 6:", lista6.obtenerTamanio());

console.log("\nTODAS LAS PRUEBAS SE REALIZARON CORRECTAMENTE");


console.log("\nPRUEBAS DE BUSQUEDA, INSERCION Y ELIMINACION");

function verificarEstructura(lista, valores, nombre) {
    assert.deepStrictEqual(lista.aArreglo(), valores, nombre + ": datos/enlaces");
    assert.strictEqual(lista.tamanio, valores.length, nombre + ": tamanio");
    assert.strictEqual(lista.cabeza ? lista.cabeza.dato : null, valores[0] ?? null, nombre + ": cabeza");
    assert.strictEqual(lista.cola ? lista.cola.dato : null, valores.length ? valores[valores.length - 1] : null, nombre + ": cola");
    assert.strictEqual(lista.cola ? lista.cola.siguiente : null, null, nombre + ": cola.siguiente");
}

// Buscar devuelve el primer dato que satisface el predicado o null.
const listaBusqueda = new ListaEnlazada();
listaBusqueda.agregarAlFinal({ id: 1, motivo: "Control" });
listaBusqueda.agregarAlFinal({ id: 2, motivo: "Vacunación" });
listaBusqueda.agregarAlFinal({ id: 3, motivo: "Vacunación" });
assert.strictEqual(listaBusqueda.buscar((dato) => dato.motivo === "Vacunación").id, 2);
assert.strictEqual(listaBusqueda.buscar((dato) => dato.id === 99), null);
verificarEstructura(listaBusqueda, [listaBusqueda.cabeza.dato, listaBusqueda.cabeza.siguiente.dato, listaBusqueda.cola.dato], "Buscar con y sin coincidencia");

// Insertar después de la cola debe convertir el nuevo nodo en la cola.
const listaInsercion = new ListaEnlazada();
listaInsercion.agregarAlFinal("A");
listaInsercion.agregarAlFinal("B");
assert.strictEqual(listaInsercion.insertarDespuesDe((dato) => dato === "B", "C"), true);
verificarEstructura(listaInsercion, ["A", "B", "C"], "Insertar después de la cola");

// Caso 1: eliminar en lista vacía.
const vacia = new ListaEnlazada();
assert.strictEqual(vacia.eliminar((dato) => dato === "A"), null);
verificarEstructura(vacia, [], "Eliminar en lista vacía");

// Caso 2: eliminar el único nodo.
const unica = new ListaEnlazada();
unica.agregarAlFinal("A");
assert.strictEqual(unica.eliminar((dato) => dato === "A"), "A");
verificarEstructura(unica, [], "Eliminar el único nodo");

// Caso 3: eliminar la cabeza.
const cabeza = new ListaEnlazada();
["A", "B", "C"].forEach((dato) => cabeza.agregarAlFinal(dato));
assert.strictEqual(cabeza.eliminar((dato) => dato === "A"), "A");
verificarEstructura(cabeza, ["B", "C"], "Eliminar la cabeza");

// Caso 4: eliminar la cola.
const cola = new ListaEnlazada();
["A", "B", "C"].forEach((dato) => cola.agregarAlFinal(dato));
assert.strictEqual(cola.eliminar((dato) => dato === "C"), "C");
verificarEstructura(cola, ["A", "B"], "Eliminar la cola");

// Caso 5: eliminar un dato inexistente no altera la lista.
const inexistente = new ListaEnlazada();
["A", "B", "C"].forEach((dato) => inexistente.agregarAlFinal(dato));
assert.strictEqual(inexistente.eliminar((dato) => dato === "X"), null);
verificarEstructura(inexistente, ["A", "B", "C"], "Eliminar algo inexistente");

// Eliminar un nodo intermedio conserva conectado el resto del historial.
const intermedia = new ListaEnlazada();
["A", "B", "C"].forEach((dato) => intermedia.agregarAlFinal(dato));
assert.strictEqual(intermedia.eliminar((dato) => dato === "B"), "B");
verificarEstructura(intermedia, ["A", "C"], "Eliminar un nodo intermedio");

console.log("Todas las pruebas de búsqueda, inserción y eliminación pasaron.");
