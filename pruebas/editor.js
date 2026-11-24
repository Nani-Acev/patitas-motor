const assert = require("assert");

const RegistroClinico = require("../src/dominio/RegistroClinico");
const Editor = require("../src/dominio/Editor");

// Crear el registro y el editor
const registro = new RegistroClinico();
const editor = new Editor(registro);

// Crear las atenciones
const A = {
    id: "A",
    motivo: "Vacunación"
};

const B = {
    id: "B",
    motivo: "Control general"
};

const C = {
    id: "C",
    motivo: "Limpieza dental"
};

const mascota = "Lola";

// Obtener las identificaciones del historial
function obtenerHistorial() {
    const historial = registro.obtenerHistorial(mascota);

    if (historial === null) {
        return [];
    }

    return historial.aArreglo().map(atencion => atencion.id);
}

// Mostrar el estado de las pilas
function mostrarEstado(paso, accion) {
    console.log("\nPASO " + paso + ": " + accion);

    console.log("Historial:", obtenerHistorial());

    console.log(
        "Pila deshacer:",
        editor.pilaDeshacer.elementos.map(a =>
            a.tipo === "agregar"
                ? "Agregar " + a.atencion.id
                : "Eliminar " + a.atencion.id
        )
    );

    console.log(
        "Pila rehacer:",
        editor.pilaRehacer.elementos.map(a =>
            a.tipo === "agregar"
                ? "Agregar " + a.atencion.id
                : "Eliminar " + a.atencion.id
        )
    );
}

// PASO 1: Agregar A
editor.agregar(mascota, A);

assert.deepStrictEqual(obtenerHistorial(), ["A"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 1);
assert.strictEqual(editor.pilaRehacer.tamanio(), 0);

mostrarEstado(1, "Agregar A");

// PASO 2: Agregar B
editor.agregar(mascota, B);

assert.deepStrictEqual(obtenerHistorial(), ["A", "B"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 2);
assert.strictEqual(editor.pilaRehacer.tamanio(), 0);

mostrarEstado(2, "Agregar B");

// PASO 3: Eliminar A
const eliminada = editor.eliminar(
    mascota,
    atencion => atencion.id === "A"
);

assert.strictEqual(eliminada, A);
assert.deepStrictEqual(obtenerHistorial(), ["B"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 3);
assert.strictEqual(editor.pilaRehacer.tamanio(), 0);

mostrarEstado(3, "Eliminar A");

// PASO 4: Deshacer la eliminación de A
assert.strictEqual(editor.deshacer(), true);

assert.deepStrictEqual(obtenerHistorial(), ["A", "B"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 2);
assert.strictEqual(editor.pilaRehacer.tamanio(), 1);

mostrarEstado(4, "Deshacer");

// PASO 5: Deshacer la acción de agregar B
assert.strictEqual(editor.deshacer(), true);

assert.deepStrictEqual(obtenerHistorial(), ["A"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 1);
assert.strictEqual(editor.pilaRehacer.tamanio(), 2);

mostrarEstado(5, "Deshacer");

// PASO 6: Rehacer la acción de agregar B
assert.strictEqual(editor.rehacer(), true);

assert.deepStrictEqual(obtenerHistorial(), ["A", "B"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 2);
assert.strictEqual(editor.pilaRehacer.tamanio(), 1);

mostrarEstado(6, "Rehacer");

// PASO 7: Agregar C
editor.agregar(mascota, C);

assert.deepStrictEqual(obtenerHistorial(), ["A", "B", "C"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 3);
assert.strictEqual(editor.pilaRehacer.tamanio(), 0);

mostrarEstado(7, "Agregar C");

// PASO 8: Intentar rehacer
assert.strictEqual(editor.rehacer(), false);

assert.deepStrictEqual(obtenerHistorial(), ["A", "B", "C"]);
assert.strictEqual(editor.pilaDeshacer.tamanio(), 3);
assert.strictEqual(editor.pilaRehacer.tamanio(), 0);

mostrarEstado(8, "Intentar rehacer");


const registroVacio = new RegistroClinico();
const editorVacio = new Editor(registroVacio);

assert.strictEqual(editorVacio.deshacer(), false);
assert.strictEqual(editorVacio.rehacer(), false);


console.log("TODAS LAS PRUEBAS FUERON EXITOSAS");
console.log("Historial final:", obtenerHistorial());
console.log("Pila deshacer:", editor.pilaDeshacer.tamanio());
console.log("Pila rehacer:", editor.pilaRehacer.tamanio());
