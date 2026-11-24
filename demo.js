const { simularManana } = require("./src/simulacion");
const {
    catalogo,
    listarCatalogo,
    buscarServicio,
    rutaDeServicio,
    precioPaquete
} = require("./src/dominio/Catalogo");

console.log("\n1. CATÁLOGO DE SERVICIOS");
listarCatalogo(catalogo);

console.log("\n2. SIMULACIÓN DE LA MAÑANA: URGENCIAS Y ORDEN DE ATENCIÓN");
const jornada = simularManana();
console.table(jornada.resultados);
console.log(`Espera promedio en urgencias: ${jornada.promedios.urgencias.toFixed(2)} min`);
console.log(`Espera promedio en consultas generales: ${jornada.promedios.generales.toFixed(2)} min`);

console.log("\n3. CORRECCIÓN CON DESHACER Y REHACER");
console.log("La atención de Luna se registró por error en Toby y se corrigió con deshacer:", jornada.errorCorregido);
const atencionToby = jornada.registro.obtenerHistorial("Toby").cabeza.dato;
jornada.editor.eliminar("Toby", (atencion) => atencion === atencionToby);
console.log("Eliminar registro de Toby:", jornada.registro.obtenerHistorial("Toby").obtenerTamanio(), "atención(es)");
jornada.editor.deshacer();
console.log("Deshacer restaura el registro:", jornada.registro.obtenerHistorial("Toby").obtenerTamanio(), "atención(es)");
jornada.editor.rehacer();
console.log("Rehacer vuelve a retirarlo:", jornada.registro.obtenerHistorial("Toby").obtenerTamanio(), "atención(es)");
jornada.editor.deshacer();
console.log("Estado restaurado para el reporte final.");

console.log("\n4. HISTORIALES FINALES");
for (const mascota of jornada.registro.obtenerMascotas()) {
    const historial = jornada.registro.obtenerHistorial(mascota);
    console.log(`\n${mascota} (${historial.obtenerTamanio()} atención/es)`);
    historial.recorrer((atencion) => {
        console.log(`- ${atencion.horaInicio}–${atencion.horaFin}: ${atencion.motivo} [${atencion.tipo}, espera ${atencion.espera} min]`);
    });
}

console.log("\n5. BÚSQUEDA, RUTA Y PRECIO DE PAQUETE");
const servicio = buscarServicio(catalogo, "Gata");
const ruta = rutaDeServicio(catalogo, "Gata");
const cirugias = catalogo.subcategorias.find((categoria) => categoria.nombre === "Cirugías");
console.log("Servicio:", servicio);
console.log("Ruta:", ruta.join(" › "));
console.log("Paquete Cirugías con 10 % de descuento:", precioPaquete(cirugias));
