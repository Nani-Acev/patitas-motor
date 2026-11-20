# Motor Patitas v0.2

Motor de práctica para administrar la atención clínica veterinaria. Agrupa historiales por mascota, organiza turnos generales y urgentes con prioridad para urgencias, y permite corregir cambios en los historiales con deshacer y rehacer.

## Ejecución

Requiere Node.js. Desde la raíz del proyecto, ejecuta:

```bash
node src/reporte.js
```

Para ejecutar la simulación completa de la mañana del sábado:

```bash
node src/simulacion.js
```

La simulación muestra el orden de atención, horas de inicio y fin, esperas, historiales actualizados y el manejo seguro de una sala vacía.

Para ejecutar las pruebas de la lista enlazada:

```bash
node pruebas/lista.js
```

Para comprobar prioridad de urgencias y sala vacía:

```bash
node pruebas/recepcion.js
```

## Estructuras del proyecto

- `Nodo`: almacena un dato y la referencia al siguiente nodo.
- `ListaEnlazada`: administra nodos con referencias a cabeza y cola; incluye recorrido, búsqueda, inserción y eliminación.
- `RegistroClinico`: usa un `Map` para asociar cada mascota con su propia `ListaEnlazada` de atenciones.
- `Cola` y `Recepcion`: aplican FIFO dentro de cada categoría y dan prioridad a la cola de urgencias.
- `Pila` y `Editor`: guardan acciones para deshacer y rehacer cambios en los historiales.
- `src/reporte.js`: carga los historiales de Lola, Toby y Mía y presenta sus datos y totales.
- `src/simulacion.js`: integra recepción, política de urgencias, editor y registro clínico en una jornada simulada.

La bitácora (`bitacora.md`) documenta los diagramas, casos borde y análisis de complejidad de las estructuras.
