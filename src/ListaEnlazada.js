

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