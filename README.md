# Motor Patitas v1.0

Motor de demostración para una clínica veterinaria. Integra el catálogo de servicios, la recepción con prioridad de urgencias, los historiales clínicos por mascota y un editor con deshacer/rehacer. No requiere dependencias externas: utiliza Node.js y módulos estándar.

## Ejecutar desde una copia nueva

Con Node.js instalado, clona el repositorio y entra a la carpeta:

```bash
git clone https://github.com/Nani-Acev/patitas-motor.git
cd patitas-motor
```

No se requiere `npm install`. Para ver el recorrido integrado del producto, ejecuta desde la raíz:

```bash
node demo.js
```

La demostración presenta cinco secciones: jerarquía del catálogo, simulación de la mañana, corrección con deshacer/rehacer, historiales finales y búsqueda de servicio con ruta y precio de paquete.

Ejecuta las pruebas finales con:

```bash
node pruebas/todo.js
```

Cada caso informa `OK` o `FALLA`; el proceso termina con código distinto de cero si alguna prueba falla.

## Organización del código

```text
src/
├── estructuras/        Nodo, ListaEnlazada, Cola y Pila
├── dominio/            RegistroClinico, Recepcion, Editor y Catalogo
├── simulacion.js       Simulación reutilizable de la mañana
└── reporte.js          Reporte de los historiales digitalizados
demo.js                 Demostración integrada v1.0
pruebas/todo.js         Pruebas finales de estructuras y dominio
bitacora.md             Diagramas, trazas y decisiones de los 12 MiniRetos
```

## Estructuras implementadas y uso

- **Nodo:** contiene un dato y el enlace al siguiente nodo; sirve como unidad de la lista y la cola.
- **Lista enlazada:** conserva historiales en orden con referencias a cabeza y cola. Incluye búsqueda, inserción, eliminación y recorridos iterativos y recursivos.
- **Cola FIFO:** mantiene turnos en orden de llegada. La recepción usa una cola para urgencias y otra para consultas generales.
- **Pila LIFO:** guarda acciones del editor para deshacer y rehacer la última modificación.
- **Map de historiales:** `RegistroClinico` asocia el nombre de cada mascota con su lista de atenciones.
- **Árbol de categorías:** `Catalogo` organiza servicios y subcategorías; sus funciones recursivas buscan servicios, construyen rutas y calculan paquetes.

## Complejidad de las operaciones

`n` es la cantidad de elementos de una estructura; `N` es la cantidad total de categorías y servicios del catálogo; `h` es la profundidad del árbol.

| Estructura | Operación | Complejidad temporal |
| --- | --- | --- |
| Nodo | Leer o asignar dato/enlace | O(1) |
| Lista enlazada | Agregar al inicio o al final (con cabeza y cola) | O(1) |
| Lista enlazada | Buscar, insertar después de condición, eliminar por condición o recorrer | O(n) |
| Lista enlazada | Tamaño almacenado (`obtenerTamanio`) | O(1) |
| Lista enlazada | Tamaño recursivo, sumar, buscar recursivamente o imprimir al revés | O(n) tiempo y O(n) pila de llamadas |
| Cola enlazada | Encolar, desencolar, consultar frente | O(1) |
| Pila sobre arreglo | Apilar, desapilar, consultar tope | O(1) amortizado |
| RegistroClinico (`Map`) | Obtener/crear historial por nombre (promedio) | O(1) |
| Recepcion | Registrar llegada, llamar al siguiente, comprobar si está vacía | O(1) |
| Editor | Agregar una atención | O(1) promedio (mapa y apéndice de lista); guardar la acción en la pila es O(1) amortizado |
| Editor | Eliminar, deshacer o rehacer | O(n) en el peor caso por localizar o restituir una atención; pila de acciones: O(1) amortizado |
| Catálogo recursivo | Contar, listar, calcular profundidad, buscar, sumar paquete y filtrar rango | O(N); O(h) espacio de llamadas recursivas |
| Catálogo | Construir la ruta de un servicio | O(N + h²) por la búsqueda y la combinación de arreglos de ruta |

Las búsquedas y eliminaciones de la lista recorren nodos porque cada nodo solo apunta al siguiente. La cola puede desencolar en O(1) porque conserva referencias al frente y al final. El precio de paquete se suma primero en todas las ramas y recibe el descuento una sola vez.
