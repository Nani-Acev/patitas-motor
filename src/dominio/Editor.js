const Pila = require("../estructuras/Pila");
const Nodo = require("../estructuras/Nodo");

class Editor {
    constructor(registroClinico) {
        this.registroClinico = registroClinico;

        this.pilaDeshacer = new Pila();
        this.pilaRehacer = new Pila();
    }

    // Agregar una atención al historial
    agregar(mascota, atencion) {
        this.registroClinico.registrarAtencion(mascota, atencion);

        const accion = {
            tipo: "agregar",
            mascota: mascota,
            atencion: atencion
        };

        this.pilaDeshacer.apilar(accion);

        // Una acción nueva elimina la posibilidad de rehacer
        this.pilaRehacer = new Pila();

        return true;
    }

    // Eliminar una atención que cumpla una condición
    eliminar(mascota, condicion) {
        const historial =
            this.registroClinico.obtenerHistorial(mascota);

        if (historial === null) {
            return null;
        }

        // Buscar la atención y guardar su posición
        let actual = historial.cabeza;
        let posicion = 0;
        let posicionEncontrada = -1;
        let atencionEliminada = null;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                posicionEncontrada = posicion;
                atencionEliminada = actual.dato;
                break;
            }

            actual = actual.siguiente;
            posicion++;
        }

        // Si no existe una atención que cumpla la condición
        if (posicionEncontrada === -1) {
            return null;
        }

        // Eliminar la atención encontrada
        historial.eliminar(
            dato => dato === atencionEliminada
        );

        const accion = {
            tipo: "eliminar",
            mascota: mascota,
            atencion: atencionEliminada,
            posicion: posicionEncontrada
        };

        this.pilaDeshacer.apilar(accion);

        // Una acción nueva elimina la pila de rehacer
        this.pilaRehacer = new Pila();

        return atencionEliminada;
    }

    // Deshacer la última acción
    deshacer() {
        const accion = this.pilaDeshacer.desapilar();

        if (accion === null) {
            return false;
        }

        if (accion.tipo === "agregar") {
            // Revertir un agregado: eliminar esa atención
            const historial =
                this.registroClinico.obtenerHistorial(accion.mascota);

            if (historial !== null) {
                historial.eliminar(
                    dato => dato === accion.atencion
                );
            }

        } else if (accion.tipo === "eliminar") {
            // Revertir una eliminación: recuperar la atención
            this.insertarEnPosicion(
                accion.mascota,
                accion.atencion,
                accion.posicion
            );
        }

        // Guardar la acción para poder rehacerla
        this.pilaRehacer.apilar(accion);

        return true;
    }

    // Rehacer la última acción deshecha
    rehacer() {
        const accion = this.pilaRehacer.desapilar();

        if (accion === null) {
            return false;
        }

        if (accion.tipo === "agregar") {
            // Volver a agregar la atención
            this.registroClinico.registrarAtencion(
                accion.mascota,
                accion.atencion
            );

        } else if (accion.tipo === "eliminar") {
            // Volver a eliminar la atención
            const historial =
                this.registroClinico.obtenerHistorial(accion.mascota);

            if (historial !== null) {
                historial.eliminar(
                    dato => dato === accion.atencion
                );
            }
        }

        // Regresar la acción a la pila de deshacer
        this.pilaDeshacer.apilar(accion);

        return true;
    }

    // Insertar una atención en su posición original
    insertarEnPosicion(mascota, atencion, posicion) {
        const historial =
            this.registroClinico.obtenerHistorial(mascota);

        if (historial === null) {
            this.registroClinico.registrarAtencion(mascota, atencion);
            return;
        }

        if (posicion === 0) {
            historial.agregarAlInicio(atencion);
            return;
        }

        let actual = historial.cabeza;
        let indice = 0;

        while (actual !== null && indice < posicion - 1) {
            actual = actual.siguiente;
            indice++;
        }

        if (actual === null) {
            historial.agregarAlFinal(atencion);
            return;
        }

        const nuevoNodo = new Nodo(atencion);

        nuevoNodo.siguiente = actual.siguiente;
        actual.siguiente = nuevoNodo;

        if (actual === historial.cola) {
            historial.cola = nuevoNodo;
        }

        historial.tamanio++;
    }
}

module.exports = Editor;
