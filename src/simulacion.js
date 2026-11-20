const Recepcion = require("./Recepcion");

// Convierte una hora en formato HH:MM a minutos
function horaAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);

    return horas * 60 + minutos;
}

// Convierte los minutos nuevamente a formato HH:MM
function minutosAHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;

    return String(horas).padStart(2, "0") + ":" +
           String(minutosRestantes).padStart(2, "0");
}

// Duración de cada atención
const DURACION_ATENCION = 20;

// Crear la recepción
const recepcion = new Recepcion();

// Registrar las llegadas de la mañana
const llegadas = [
    {
        mascota: "Toby",
        tipo: "General",
        motivo: "Control de vacunas",
        horaLlegada: "08:00"
    },
    {
        mascota: "Max",
        tipo: "General",
        motivo: "Revisión de piel",
        horaLlegada: "08:05"
    },
    {
        mascota: "Luna",
        tipo: "Urgencia",
        motivo: "Intoxicación",
        horaLlegada: "08:10"
    },
    {
        mascota: "Simón",
        tipo: "General",
        motivo: "Corte de uñas",
        horaLlegada: "08:20"
    },
    {
        mascota: "Kira",
        tipo: "Urgencia",
        motivo: "Herida en pata",
        horaLlegada: "08:25"
    },
    {
        mascota: "Nala",
        tipo: "General",
        motivo: "Desparasitación",
        horaLlegada: "08:40"
    },
    {
        mascota: "Rocky",
        tipo: "Urgencia",
        motivo: "Dificultad para respirar",
        horaLlegada: "09:00"
    }
];

// Convertir las horas de llegada a minutos
llegadas.forEach(turno => {
    turno.minutosLlegada = horaAMinutos(turno.horaLlegada);
});

// Variables de la simulación
let reloj = llegadas[0].minutosLlegada;
let indiceLlegada = 0;

let atencionActual = null;
let finAtencion = Infinity;

// Resultados de las atenciones
const resultados = [];

// Acumuladores para los promedios
let esperaUrgencias = 0;
let cantidadUrgencias = 0;

let esperaGenerales = 0;
let cantidadGenerales = 0;

// Simulación por eventos
while (
    indiceLlegada < llegadas.length ||
    atencionActual !== null ||
    !recepcion.estaVacia()
) {

    // Registrar todas las mascotas que ya llegaron
    while (
        indiceLlegada < llegadas.length &&
        llegadas[indiceLlegada].minutosLlegada <= reloj
    ) {
        recepcion.registrarLlegada(llegadas[indiceLlegada]);

        indiceLlegada++;
    }

    // Verificar si terminó la atención actual
    if (atencionActual !== null && finAtencion <= reloj) {
        console.log(
            "Terminó la atención de:",
            atencionActual.mascota,
            "a las",
            minutosAHora(finAtencion)
        );

        atencionActual = null;
    }

    // Si el consultorio está libre, llamar a la siguiente mascota
    if (atencionActual === null) {

        const siguiente = recepcion.llamarSiguiente();

        if (siguiente !== null) {

            atencionActual = siguiente;

            const horaInicio = reloj;

            const tiempoEspera =
                horaInicio - siguiente.minutosLlegada;

            finAtencion = reloj + DURACION_ATENCION;

            // Guardar los resultados
            resultados.push({
                mascota: siguiente.mascota,
                tipo: siguiente.tipo,
                horaLlegada: siguiente.horaLlegada,
                horaAtencion: minutosAHora(horaInicio),
                espera: tiempoEspera
            });

            // Acumular los tiempos según el tipo de atención
            if (siguiente.tipo.toLowerCase() === "urgencia") {
                esperaUrgencias += tiempoEspera;
                cantidadUrgencias++;
            } else {
                esperaGenerales += tiempoEspera;
                cantidadGenerales++;
            }

            console.log(
                "Atendiendo:",
                siguiente.mascota,
                "| Inicio:",
                minutosAHora(horaInicio),
                "| Termina:",
                minutosAHora(finAtencion)
            );
        }
    }

    // Avanzar el reloj al siguiente evento:
    // una nueva llegada o el fin de una atención
    if (atencionActual !== null) {

        if (indiceLlegada < llegadas.length) {
            reloj = Math.min(
                finAtencion,
                llegadas[indiceLlegada].minutosLlegada
            );
        } else {
            reloj = finAtencion;
        }

    } else if (indiceLlegada < llegadas.length) {

        reloj = llegadas[indiceLlegada].minutosLlegada;
    }
}

// Mostrar el reporte final
console.log("\n========== REPORTE DE ATENCIONES ==========");

console.table(resultados);

// Calcular los promedios
const promedioUrgencias =
    cantidadUrgencias > 0
        ? esperaUrgencias / cantidadUrgencias
        : 0;

const promedioGenerales =
    cantidadGenerales > 0
        ? esperaGenerales / cantidadGenerales
        : 0;

console.log("\n========== PROMEDIOS DE ESPERA ==========");

console.log(
    "Promedio de urgencias:",
    promedioUrgencias.toFixed(2),
    "minutos"
);

console.log(
    "Promedio de consultas generales:",
    promedioGenerales.toFixed(2),
    "minutos"
);