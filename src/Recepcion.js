const Cola = require("./Cola");

class Recepcion {
    constructor() {
        this.urgencias = new Cola();
        this.generales = new Cola();
    }

    // Registra una mascota en la cola correspondiente
    registrarLlegada(turno) {
        if (turno.tipo.toLowerCase() === "urgencia") {
            this.urgencias.encolar(turno);
            console.log("Urgencia registrada:", turno.mascota);
        } else {
            this.generales.encolar(turno);
            console.log("Consulta general registrada:", turno.mascota);
        }
    }

    // Llama primero a las urgencias y después a las generales
    llamarSiguiente() {
        if (!this.urgencias.estaVacia()) {
            return this.urgencias.desencolar();
        }

        if (!this.generales.estaVacia()) {
            return this.generales.desencolar();
        }

        return null;
    }

    // Comprueba si las dos colas están vacías
    estaVacia() {
        return this.urgencias.estaVacia() &&
               this.generales.estaVacia();
    }
}

module.exports = Recepcion;