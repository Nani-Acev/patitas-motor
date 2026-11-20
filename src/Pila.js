class Pila {
    constructor() {
        this.elementos = [];
    }

    apilar(dato) {
        this.elementos.push(dato);
    }

    desapilar() {
        if (this.estaVacia()) {
            return null;
        }

        return this.elementos.pop();
    }

    verTope() {
        if (this.estaVacia()) {
            return null;
        }

        return this.elementos[this.elementos.length - 1];
    }

    estaVacia() {
        return this.elementos.length === 0;
    }

    tamanio() {
        return this.elementos.length;
    }
}

module.exports = Pila;