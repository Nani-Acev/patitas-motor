const catalogo = {
    nombre: "Patitas",
    servicios: [],
    subcategorias: [
        {
            nombre: "Consultas",
            servicios: [
                { nombre: "Consulta general", precio: 60000 },
                { nombre: "Consulta a domicilio", precio: 90000 }
            ],
            subcategorias: [
                {
                    nombre: "Especializada",
                    servicios: [
                        { nombre: "Dermatología", precio: 110000 },
                        { nombre: "Cardiología", precio: 130000 }
                    ],
                    subcategorias: []
                }
            ]
        },
        {
            nombre: "Cirugías",
            servicios: [],
            subcategorias: [
                {
                    nombre: "Esterilización",
                    servicios: [
                        { nombre: "Gata", precio: 280000 },
                        { nombre: "Perra", precio: 350000 }
                    ],
                    subcategorias: []
                },
                {
                    nombre: "Limpieza dental",
                    servicios: [
                        { nombre: "Con anestesia", precio: 150000 }
                    ],
                    subcategorias: []
                }
            ]
        },
        {
            nombre: "Vacunas",
            servicios: [
                { nombre: "Rabia", precio: 45000 },
                { nombre: "Triple felina", precio: 85000 }
            ],
            subcategorias: []
        }
    ]
};




function contarServicios(categoria) {

    let total = categoria.servicios.length;

    for (const subcategoria of categoria.subcategorias) {
        total = total + contarServicios(subcategoria);
    }

    return total;
}


function listarCatalogo(categoria, nivel = 0) {

    let espacios = "  ".repeat(nivel);

    console.log(espacios + categoria.nombre);

    for (const servicio of categoria.servicios) {
        console.log(
            espacios + "  - " +
            servicio.nombre + ": $" +
            servicio.precio
        );
    }

    for (const subcategoria of categoria.subcategorias) {
        listarCatalogo(subcategoria, nivel + 1);
    }
}




function profundidad(categoria) {

    if (categoria.subcategorias.length === 0) {
        return 1;
    }

    let mayor = 0;

    for (const subcategoria of categoria.subcategorias) {

        let resultado = profundidad(subcategoria);

        if (resultado > mayor) {
            mayor = resultado;
        }
    }

    return mayor + 1;
}




function buscarServicio(categoria, nombre) {

    // Buscamos en los servicios de la categoría actual.
    for (const servicio of categoria.servicios) {

        if (servicio.nombre === nombre) {
            return servicio;
        }
    }

    // Si no lo encontramos, buscamos en las subcategorías.
    for (const subcategoria of categoria.subcategorias) {

        const resultado = buscarServicio(subcategoria, nombre);

        // Si lo encontramos, detenemos la búsqueda.
        if (resultado !== null) {
            return resultado;
        }
    }


    return null;
}



function rutaDeServicio(categoria, nombre) {

    // Revisamos los servicios de la categoría actual.
    for (const servicio of categoria.servicios) {

        if (servicio.nombre === nombre) {
            return [categoria.nombre, servicio.nombre];
        }
    }

    // Buscamos en las subcategorías.
    for (const subcategoria of categoria.subcategorias) {

        const resultado = rutaDeServicio(subcategoria, nombre);

        // Si encontramos el servicio, construimos la ruta.
        if (resultado !== null) {
            return [categoria.nombre, ...resultado];
        }
    }

    return null;
}




// Esta función auxiliar solamente suma los precios.
function sumarServicios(categoria) {

    let total = 0;

    // Sumamos los servicios de la categoría actual.
    for (const servicio of categoria.servicios) {
        total = total + servicio.precio;
    }

    // Sumamos los servicios de las subcategorías.
    for (const subcategoria of categoria.subcategorias) {
        total = total + sumarServicios(subcategoria);
    }

    return total;
}



function precioPaquete(categoria) {

    const total = sumarServicios(categoria);

    return total * 0.90;
}


function serviciosEnRango(categoria, min, max) {

    let encontrados = [];

    // Revisamos los servicios de la categoría actual.
    for (const servicio of categoria.servicios) {

        if (servicio.precio >= min && servicio.precio <= max) {
            encontrados.push(servicio);
        }
    }

    // Buscamos también en las subcategorías.
    for (const subcategoria of categoria.subcategorias) {

        const resultado = serviciosEnRango(subcategoria, min, max);

        encontrados.push(...resultado);
    }

    return encontrados;
}



if (require.main === module) {
console.log("CATALOGO DE PATITAS ");

listarCatalogo(catalogo);

console.log("Total de servicios:");
console.log(contarServicios(catalogo));

console.log("Profundidad del catalogo:");
console.log(profundidad(catalogo));



console.log("\nBUSCAR SERVICIO");

// Servicio del primer nivel.
console.log("Buscar Rabia:");
console.log(buscarServicio(catalogo, "Rabia"));

// Servicio de un nivel profundo.
console.log("Buscar Gata:");
console.log(buscarServicio(catalogo, "Gata"));

// Servicio que no existe.
console.log("Buscar Peluquería:");
console.log(buscarServicio(catalogo, "Peluquería"));




console.log("\nRUTAS DE SERVICIOS");

// Servicio del primer nivel.
console.log("Ruta de Rabia:");
console.log(rutaDeServicio(catalogo, "Rabia"));

// Servicio de un nivel profundo.
console.log("Ruta de Gata:");
console.log(rutaDeServicio(catalogo, "Gata"));

// Servicio que no existe.
console.log("Ruta de Peluquería:");
console.log(rutaDeServicio(catalogo, "Peluquería"));




console.log("\nPRECIO DE PAQUETE");

// Buscamos la categoría Cirugías.
const cirugias = catalogo.subcategorias.find(
    categoria => categoria.nombre === "Cirugías"
);

console.log("Total del paquete de Cirugías:");

console.log(precioPaquete(cirugias));



console.log("\nSERVICIOS EN RANGO");

const resultadoRango = serviciosEnRango(catalogo, 80000, 150000);

for (const servicio of resultadoRango) {
    console.log(servicio.nombre + ": $" + servicio.precio);
}

console.log("Cantidad de servicios encontrados:");
console.log(resultadoRango.length);


console.log("\nCATEGORÍA VACÍA");

const categoriaVacia = {
    nombre: "Sin servicios",
    servicios: [],
    subcategorias: []
};

console.log("Buscar servicio:");
console.log(buscarServicio(categoriaVacia, "Gata"));

console.log("Buscar ruta:");
console.log(rutaDeServicio(categoriaVacia, "Gata"));

console.log("Precio del paquete:");
console.log(precioPaquete(categoriaVacia));

console.log("Servicios en rango:");
console.log(serviciosEnRango(categoriaVacia, 80000, 150000));
}

module.exports = {
    catalogo,
    contarServicios,
    listarCatalogo,
    profundidad,
    buscarServicio,
    rutaDeServicio,
    sumarServicios,
    precioPaquete,
    serviciosEnRango
};
