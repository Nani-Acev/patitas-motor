const ListaEnlazada = require("../src/ListaEnlazada");

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