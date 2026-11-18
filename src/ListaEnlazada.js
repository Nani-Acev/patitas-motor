

const Nodo = require("./Nodo");



class ListaEnlazada {

    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.tamanio = 0;
    }


    agregarAlFinal(dato) {

        const nuevoNodo = new Nodo(dato);

        if (this.estaVacia()) {

            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;

        } else {

            // Conectar el último nodo con el nuevo
            this.cola.siguiente = nuevoNodo;

            // Actualizar la cola
            this.cola = nuevoNodo;
        }

        this.tamanio++;
    }



    agregarAlInicio(dato) {

        const nuevoNodo = new Nodo(dato);

    
        if (this.estaVacia()) {

            this.cabeza = nuevoNodo;
            this.cola = nuevoNodo;

        } else {

            // El nuevo nodo apunta al antiguo primero
            nuevoNodo.siguiente = this.cabeza;

        
            this.cabeza = nuevoNodo;
        }

        this.tamanio++;
    }



    recorrer(callback) {

        let actual = this.cabeza;

        while (actual !== null) {

            callback(actual.dato);

            actual = actual.siguiente;
        }
    }


    buscar(condicion) {
        let actual = this.cabeza;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                return actual.dato;
            }
            actual = actual.siguiente;
        }

        return null;
    }


    insertarDespuesDe(condicion, dato) {
        let actual = this.cabeza;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                const nuevoNodo = new Nodo(dato);
                nuevoNodo.siguiente = actual.siguiente;
                actual.siguiente = nuevoNodo;

                if (this.cola === actual) {
                    this.cola = nuevoNodo;
                }

                this.tamanio++;
                return true;
            }
            actual = actual.siguiente;
        }

        return false;
    }


    eliminar(condicion) {
        let anterior = null;
        let actual = this.cabeza;

        while (actual !== null) {
            if (condicion(actual.dato)) {
                if (anterior === null) {
                    this.cabeza = actual.siguiente;
                } else {
                    anterior.siguiente = actual.siguiente;
                }

                if (this.cola === actual) {
                    this.cola = anterior;
                }

                this.tamanio--;
                if (this.tamanio === 0) {
                    this.cabeza = null;
                    this.cola = null;
                }

                actual.siguiente = null;
                return actual.dato;
            }

            anterior = actual;
            actual = actual.siguiente;
        }

        return null;
    }


    aArreglo() {

        const arreglo = [];

        this.recorrer((dato) => {
            arreglo.push(dato);
        });

        return arreglo;
    }



    estaVacia() {

        return this.tamanio === 0;
    }



    obtenerTamanio() {

        return this.tamanio;
    }

}


module.exports = ListaEnlazada;
