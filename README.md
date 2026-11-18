# Motor Patitas v0.1

Proyecto de práctica para administrar historiales clínicos veterinarios. Cada atención guarda fecha, motivo, veterinario y costo; el registro agrupa las atenciones por mascota y permite generar un reporte con el historial, la cantidad de atenciones, el costo total y la última vacunación.

## Ejecución

Requiere Node.js. Desde la raíz del proyecto, ejecuta:

```bash
node src/reporte.js
```

Para ejecutar las pruebas de la lista enlazada:

```bash
node pruebas/lista.js
```

## Estructuras del proyecto

- `Nodo`: almacena un dato y la referencia al siguiente nodo.
- `ListaEnlazada`: administra nodos con referencias a cabeza y cola; incluye recorrido, búsqueda, inserción y eliminación.
- `RegistroClinico`: usa un `Map` para asociar cada mascota con su propia `ListaEnlazada` de atenciones.
- `src/reporte.js`: carga los historiales de Lola, Toby y Mía y presenta sus datos y totales.

La bitácora (`bitacora.md`) documenta los diagramas, casos borde y análisis de complejidad de las estructuras.
