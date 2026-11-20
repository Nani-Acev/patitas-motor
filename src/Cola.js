const Nodo = require("./Nodo");


class Cola {

    constructor() {
        this.frente = null;
        this.final = null;
        this._tamanio = 0;
    }


    encolar(dato) {

        const nuevoNodo = new Nodo(dato);

        // Si la cola está vacía
        if (this.estaVacia()) {

            this.frente = nuevoNodo;
            this.final = nuevoNodo;

        } else {

            // Conectar el último nodo con el nuevo
            this.final.siguiente = nuevoNodo;

            // Actualizar el final
            this.final = nuevoNodo;
        }

        this._tamanio++;
    }


    desencolar() {

        // Comprobar si está vacía
        if (this.estaVacia()) {
            return null;
        }

        // Guardar el nodo que vamos a eliminar
        const datoEliminado = this.frente.dato;

        // Avanzar el frente al siguiente nodo
        this.frente = this.frente.siguiente;

        // Disminuir el tamaño
        this._tamanio--;

        // Si la cola queda vacía
        if (this.frente === null) {
            this.final = null;
        }

        return datoEliminado;
    }

    verFrente() {

        if (this.estaVacia()) {
            return null;
        }

        return this.frente.dato;
    }


    estaVacia() {

        return this.frente === null;
    }


    tamanio() {

        return this._tamanio;
    }

}


module.exports = Cola;