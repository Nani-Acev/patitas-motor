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


console.log("CATALOGO DE PATITAS");

listarCatalogo(catalogo);


console.log("Total de servicios:");
console.log(contarServicios(catalogo));

console.log("Profundidad del catalogo:");
console.log(profundidad(catalogo));



const especializada = catalogo.subcategorias[0].subcategorias[0];

especializada.subcategorias.push({
    nombre: "Oftalmología",
    servicios: [
        { nombre: "Consulta oftalmológica", precio: 120000 }
    ],
    subcategorias: []
});

console.log("\nCATALOGO ACTUALIZADO");

listarCatalogo(catalogo);

console.log("Total de servicios actualizado:");
console.log(contarServicios(catalogo));

console.log("Profundidad actualizada:");
console.log(profundidad(catalogo));


module.exports = {
    catalogo,
    contarServicios,
    listarCatalogo,
    profundidad
};