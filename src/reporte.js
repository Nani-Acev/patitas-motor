const RegistroClinico = require("./dominio/RegistroClinico");
const ListaEnlazada = require("./estructuras/ListaEnlazada");

const registro = new RegistroClinico();

const atenciones = [
    { mascota: "Lola (gata)", fecha: "02/02", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 },
    { mascota: "Lola (gata)", fecha: "15/03", motivo: "Control de peso", veterinario: "Dr. Gómez", costo: 40000 },
    { mascota: "Lola (gata)", fecha: "20/05", motivo: "Limpieza dental", veterinario: "Dra. Ríos", costo: 150000 },
    { mascota: "Toby (perro)", fecha: "10/01", motivo: "Consulta por cojera", veterinario: "Dr. Gómez", costo: 60000 },
    { mascota: "Toby (perro)", fecha: "12/01", motivo: "Radiografía de pata", veterinario: "Dr. Gómez", costo: 120000 },
    { mascota: "Toby (perro)", fecha: "05/04", motivo: "Vacunación anual", veterinario: "Dra. Ríos", costo: 85000 },
    { mascota: "Mía (gata)", fecha: "18/02", motivo: "Esterilización", veterinario: "Dra. Ríos", costo: 280000 },
    { mascota: "Mía (gata)", fecha: "25/02", motivo: "Control posquirúrgico", veterinario: "Dra. Ríos", costo: 0 },
];

for (const atencion of atenciones) {
    const { mascota, ...datosAtencion } = atencion;
    registro.registrarAtencion(mascota, datosAtencion);
}

function formatoPesos(valor) {
    return `$${valor.toLocaleString("es-CO")}`;
}

function buscarUltimaVacunacion(historial) {
    // Al anteponer las atenciones, buscar encuentra primero la más reciente.
    const masRecientesPrimero = new ListaEnlazada();
    historial.recorrer((atencion) => masRecientesPrimero.agregarAlInicio(atencion));
    return masRecientesPrimero.buscar((atencion) => /vacunaci[oó]n/i.test(atencion.motivo));
}

console.log("HISTORIALES CLÍNICOS — MOTOR PATITAS v0.1");

for (const mascota of registro.obtenerMascotas()) {
    const historial = registro.obtenerHistorial(mascota);
    let total = 0;

    console.log(`\n${mascota}`);
    historial.recorrer((atencion) => {
        total += atencion.costo;
        console.log(`- ${atencion.fecha}: ${atencion.motivo} — ${atencion.veterinario} — ${formatoPesos(atencion.costo)}`);
    });

    const ultimaVacunacion = buscarUltimaVacunacion(historial);
    const textoVacunacion = ultimaVacunacion
        ? `${ultimaVacunacion.fecha}: ${ultimaVacunacion.motivo}`
        : "sin registro";

    console.log(`Atenciones: ${historial.obtenerTamanio()}`);
    console.log(`Costo total: ${formatoPesos(total)}`);
    console.log(`Última vacunación: ${textoVacunacion}`);
}
