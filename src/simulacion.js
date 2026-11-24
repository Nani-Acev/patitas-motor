const Recepcion = require("./dominio/Recepcion");
const RegistroClinico = require("./dominio/RegistroClinico");
const Editor = require("./dominio/Editor");

const DURACION_ATENCION = 20;

function horaAMinutos(hora) {
    const [horas, minutos] = hora.split(":").map(Number);
    return horas * 60 + minutos;
}

function minutosAHora(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${String(horas).padStart(2, "0")}:${String(minutosRestantes).padStart(2, "0")}`;
}

function simularManana() {
    const recepcion = new Recepcion();
    const registro = new RegistroClinico();
    const editor = new Editor(registro);
    const llegadas = [
        { mascota: "Toby", tipo: "General", motivo: "Control de vacunas", horaLlegada: "08:00" },
        { mascota: "Max", tipo: "General", motivo: "Revisión de piel", horaLlegada: "08:05" },
        { mascota: "Luna", tipo: "Urgencia", motivo: "Intoxicación", horaLlegada: "08:10" },
        { mascota: "Simón", tipo: "General", motivo: "Corte de uñas", horaLlegada: "08:20" },
        { mascota: "Kira", tipo: "Urgencia", motivo: "Herida en pata", horaLlegada: "08:25" },
        { mascota: "Nala", tipo: "General", motivo: "Desparasitación", horaLlegada: "08:40" },
        { mascota: "Rocky", tipo: "Urgencia", motivo: "Dificultad para respirar", horaLlegada: "09:00" }
    ].map((turno) => ({ ...turno, minutosLlegada: horaAMinutos(turno.horaLlegada) }));

    let reloj = llegadas[0].minutosLlegada;
    let indiceLlegada = 0;
    let atencionActual = null;
    let finAtencion = Infinity;
    let errorCorregido = false;
    const resultados = [];
    let esperaUrgencias = 0;
    let cantidadUrgencias = 0;
    let esperaGenerales = 0;
    let cantidadGenerales = 0;

    while (indiceLlegada < llegadas.length || atencionActual !== null || !recepcion.estaVacia()) {
        while (indiceLlegada < llegadas.length && llegadas[indiceLlegada].minutosLlegada <= reloj) {
            recepcion.registrarLlegada(llegadas[indiceLlegada]);
            indiceLlegada++;
        }

        if (atencionActual !== null && finAtencion <= reloj) {
            const atencion = {
                fecha: "Sábado",
                motivo: atencionActual.motivo,
                tipo: atencionActual.tipo,
                horaLlegada: atencionActual.horaLlegada,
                horaInicio: atencionActual.horaInicio,
                horaFin: minutosAHora(finAtencion),
                espera: atencionActual.espera
            };

            if (atencionActual.mascota === "Luna" && !errorCorregido) {
                editor.agregar("Toby", atencion);
                editor.deshacer();
                editor.agregar("Luna", atencion);
                errorCorregido = true;
            } else {
                editor.agregar(atencionActual.mascota, atencion);
            }

            atencionActual = null;
        }

        if (atencionActual === null) {
            const siguiente = recepcion.llamarSiguiente();
            if (siguiente !== null) {
                atencionActual = siguiente;
                const espera = reloj - siguiente.minutosLlegada;
                finAtencion = reloj + DURACION_ATENCION;
                siguiente.horaInicio = minutosAHora(reloj);
                siguiente.espera = espera;

                resultados.push({
                    mascota: siguiente.mascota,
                    tipo: siguiente.tipo,
                    motivo: siguiente.motivo,
                    horaLlegada: siguiente.horaLlegada,
                    horaInicio: minutosAHora(reloj),
                    horaFin: minutosAHora(finAtencion),
                    espera
                });

                if (siguiente.tipo.toLowerCase() === "urgencia") {
                    esperaUrgencias += espera;
                    cantidadUrgencias++;
                } else {
                    esperaGenerales += espera;
                    cantidadGenerales++;
                }
            }
        }

        if (atencionActual !== null) {
            reloj = indiceLlegada < llegadas.length
                ? Math.min(finAtencion, llegadas[indiceLlegada].minutosLlegada)
                : finAtencion;
        } else if (indiceLlegada < llegadas.length) {
            reloj = llegadas[indiceLlegada].minutosLlegada;
        }
    }

    const promedios = {
        urgencias: cantidadUrgencias ? esperaUrgencias / cantidadUrgencias : 0,
        generales: cantidadGenerales ? esperaGenerales / cantidadGenerales : 0
    };

    return { recepcion, registro, editor, resultados, promedios, errorCorregido };
}

if (require.main === module) {
    const { recepcion, resultados, promedios } = simularManana();
    console.log("REPORTE DE ATENCIONES");
    console.table(resultados);
    console.log(`Promedio de espera urgencias: ${promedios.urgencias.toFixed(2)} min`);
    console.log(`Promedio de espera generales: ${promedios.generales.toFixed(2)} min`);
    console.log("Siguiente turno con sala vacía:", recepcion.llamarSiguiente());
}

module.exports = { simularManana, horaAMinutos, minutosAHora };
