 ## Mini Reto 1

 ## Diagrama


       CABEZA
          |
          v
   +-------------------+
   | Nodo 1            |
   | Vacunación        |
   | 02/02             |
   | $85.000            |
   +-------------------+
          |
          v
   +-------------------+
   | Nodo 2            |
   | Control de peso   |
   | 15/03             |
   | $40.000            |
   +-------------------+
          |
          v
   +-------------------+
   | Nodo 3            |
   | Limpieza dental   |
   | 20/05             |
   | $150.000           |
   +-------------------+
          |
          v
        NULL

**El diagrama queda asi:**

       CABEZA
          |
          v
   +-------------------+
   | Nodo 1            |
   | Vacunación        |
   | $85.000            |
   +-------------------+
          |
         NULL


   +-------------------+
   | Nodo 2            |
   | Control de peso   |
   | $40.000            |
   +-------------------+
          |
          v
   +-------------------+
   | Nodo 3            |
   | Limpieza dental   |
   | $150.000           |
   +-------------------+
          |
         NULL

Cuando se pierde el enlace entre el primer nodo y el segundo, el recorrido de la lista enlazada solamente puede acceder al primer nodo, que contiene la información de la vacunación.

Esto sucede porque el recorrido comienza desde cabeza y avanza utilizando la propiedad siguiente. Al asignarle null a nodo1.siguiente, se rompe la conexión con los demás nodos.

Los nodos 2 y 3 siguen existiendo en memoria porque todavía tenemos sus referencias (nodo2 y nodo3), pero ya no se pueden alcanzar recorriendo la lista desde cabeza.


**Caso 1. Agregar al final de una lista vacía**
Inicialmente la lista no tiene nodos:
cabeza → null
cola   → null
tamanio = 0

Agregamos un nodo con el dato A:
cabeza ──┐
         v
       +-----+
       |  A  | → null
       +-----+
         ^
cola ────┘

tamanio = 1

¿Qué cambia?
- cabeza apunta al nuevo nodo.
- cola apunta al mismo nodo.
- tamanio aumenta de 0 a 1.

**Caso 2. Agregar al inicio de una lista vacía**
Si la lista está vacía y agregamos el nodo A al inicio, sucede exactamente lo mismo:
cabeza ──┐
         v
       +-----+
       |  A  | → null
       +-----+
         ^
cola ────┘

tamanio = 1

¿Qué cambia?
- cabeza apunta al nuevo nodo.
- cola también apunta al nuevo nodo.
- tamanio aumenta a 1.

**Caso 3. Agregar al final de una lista con un nodo**
Tenemos inicialmente:
cabeza
   |
   v
+-----+
|  A  | → null
+-----+
   ^
cola

tamanio = 1

Agregamos el nodo B al final:
cabeza
   |
   v
+-----+       +-----+
|  A  | ----> |  B  | → null
+-----+       +-----+
                 ^
                 |
                cola

tamanio = 2

¿Qué cambia?
- El siguiente del nodo A apunta a B.
- cola ahora apunta a B.
- cabeza sigue apuntando a A.
- tamanio aumenta a 2.

**Caso 4. Agregar al inicio de una lista con un nodo**
Tenemos inicialmente:
cabeza
   |
   v
+-----+
|  A  | → null
+-----+
   ^
cola

tamanio = 1

Agregamos el nodo B al inicio:
cabeza
   |
   v
+-----+       +-----+
|  B  | ----> |  A  | → null
+-----+       +-----+
                 ^
                 |
                cola

tamanio = 2

¿Qué cambia?
- El siguiente del nuevo nodo B apunta a A.
- cabeza ahora apunta a B.
- cola sigue apuntando a A.
- tamanio aumenta a 2.

**Caso 5. Agregar al final de una lista con varios nodos**
Inicialmente:
cabeza
   |
   v
+-----+     +-----+     +-----+
|  A  | --> |  B  | --> |  C  | --> null
+-----+     +-----+     +-----+
                          ^
                          |
                         cola

tamanio = 3

Agregamos D al final:
cabeza
   |
   v
+-----+     +-----+     +-----+     +-----+
|  A  | --> |  B  | --> |  C  | --> |  D  | --> null
+-----+     +-----+     +-----+     +-----+
                                        ^
                                        |
                                       cola

tamanio = 4

¿Qué cambia?
- El siguiente del antiguo último nodo C apunta a D.
- cola ahora apunta a D.
- cabeza permanece en A.
- tamanio aumenta a 4.
Caso 6. Agregar al inicio de una lista con varios nodos
Inicialmente:
cabeza
   |
   v
+-----+     +-----+     +-----+
|  A  | --> |  B  | --> |  C  | --> null
+-----+     +-----+     +-----+
                          ^
                          |
                         cola

tamanio = 3

Agregamos D al inicio:
cabeza
   |
   v
+-----+     +-----+     +-----+     +-----+
|  D  | --> |  A  | --> |  B  | --> |  C  | --> null
+-----+     +-----+     +-----+     +-----+
                                        ^
                                        |
                                       cola

tamanio = 4

¿Qué cambia?
- El siguiente del nuevo nodo D apunta a A.
- cabeza ahora apunta a D.
- cola permanece en C.
- tamanio aumenta a 4.


## Método	Explicación
agregarAlFinal(dato)	Crea un nodo nuevo y lo conecta después del último nodo.
agregarAlInicio(dato)	Crea un nodo nuevo y lo conecta antes del primer nodo.
recorrer(callback)	Visita cada nodo y ejecuta una función con su información.
aArreglo()	Guarda todos los datos de la lista en un arreglo.
estaVacia()	Comprueba si el tamaño de la lista es igual a cero.
obtenerTamanio()	Devuelve la cantidad de elementos almacenados.


## ¿Por qué agregar al inicio y al final es O(1)?
Porque tenemos dos referencias:
- cabeza nos permite acceder directamente al primer nodo.
- cola nos permite acceder directamente al último nodo.
Por eso no necesitamos utilizar un ciclo while para buscar dónde insertar el nuevo elemento.

## Conclusión
La lista enlazada permite almacenar datos mediante nodos conectados entre sí. En esta actividad implementamos una estructura que utiliza las referencias cabeza y cola para facilitar la inserción de elementos al principio y al final en tiempo constante O(1).

También implementamos métodos para recorrer la lista, convertirla en un arreglo, comprobar si está vacía y consultar su tamaño. Finalmente, realizamos seis pruebas para verificar que las referencias y el tamaño se actualizaran correctamente después de cada operación.

## Búsqueda, inserción después de un nodo y eliminación

### Dibujos de los casos de eliminación

**1. Eliminar la cabeza (A):** se mueve `cabeza` a B. El resto de la lista sigue conectado.

```text
Antes:  cabeza → [A] → [B] → [C] → null
Después: cabeza ─────→ [B] → [C] → null
                         cola ─────┘
```

**2. Eliminar un nodo intermedio (B):** el nodo anterior A se conecta directamente con C.

```text
Antes:  cabeza → [A] → [B] → [C] → null
Después: cabeza → [A] ─────→ [C] → null
                                  cola
```

**3. Eliminar la cola (C):** el nodo anterior B pasa a ser la nueva cola y termina en `null`.

```text
Antes:  cabeza → [A] → [B] → [C] → null
Después: cabeza → [A] → [B] → null
                         ↑
                        cola
```

### Operaciones y complejidad

| Operación | Complejidad | Explicación |
| --- | --- | --- |
| `buscar(condicion)` | O(n) | Recorre los nodos hasta encontrar el primer dato que cumple la condición o llegar al final. |
| `insertarDespuesDe(condicion, dato)` | O(n) | Busca el primer nodo que cumple la condición; enlazar el nuevo nodo, una vez encontrado, cuesta O(1). |
| `eliminar(condicion)` | O(n) | Recorre manteniendo `anterior` y `actual`; al encontrar el nodo, reajusta los enlaces en O(1). |

Aunque la lista guarda una referencia directa a `cola`, eliminarla en una lista simplemente enlazada requiere recorrer desde `cabeza` para encontrar el nodo anterior. La cola solo tiene un enlace hacia adelante y no permite volver a su predecesor. Una vez encontrado, se asigna ese nodo a `cola` y su `siguiente` queda en `null`.

Las pruebas cubren búsqueda con y sin coincidencia, inserción después de la cola y eliminación en lista vacía, del único nodo, de la cabeza, de la cola, de un nodo intermedio y de un dato inexistente. Tras cada eliminación se comprueban los datos alcanzables, `cabeza`, `cola`, `cola.siguiente` y `tamanio`.

## Registro clínico y comparación: lista enlazada vs. arreglo

`RegistroClinico` compone un `Map` de historiales: la clave es el nombre de la mascota y el valor es una `ListaEnlazada` con sus atenciones. El reporte recorre cada lista para imprimir las atenciones y sumar sus costos. Para la última vacunación, coloca temporalmente las referencias en orden inverso dentro de otra lista y usa `buscar`; así, la primera coincidencia encontrada es la más reciente.

En las complejidades del arreglo, agregar al final es O(1) amortizado (puede ser O(n) cuando se redimensiona); acceder por posición es O(1). Buscar por condición requiere revisar elementos en ambas estructuras.

| Operación | Lista enlazada | Arreglo |
| --- | --- | --- |
| Agregar al final | O(1), con referencia a `cola` | O(1) amortizado; O(n) al redimensionar |
| Agregar al inicio | O(1), actualizando `cabeza` | O(n), desplaza los elementos existentes |
| Acceder a la atención número k | O(n), recorre desde `cabeza` | O(1), acceso por índice |
| Buscar por condición | O(n) | O(n) |
| Eliminar la primera | O(1), mueve `cabeza` al siguiente nodo | O(n), desplaza los elementos restantes |

## Mini Reto 8 — Integración Motor Patitas v0.2

### Estructuras del motor

| Estructura | Principio | Uso en Patitas | Operaciones principales y complejidad |
| --- | --- | --- | --- |
| `Nodo` | Secuencial (enlace al siguiente) | Guarda una atención y conecta el historial | Leer dato o enlace: O(1) |
| `Cola` | FIFO | Mantiene por separado los turnos urgentes y generales | Encolar: O(1); desencolar: O(1); consultar frente: O(1) |
| `Recepcion` | FIFO con prioridad | Registra llegadas y entrega primero urgencias; entre iguales conserva orden de llegada | Registrar llegada: O(1); llamar siguiente: O(1); consultar sala vacía: O(1) |
| `Pila` | LIFO | Guarda las acciones de deshacer y rehacer del editor | Apilar/desapilar/ver tope: O(1) amortizado |
| `ListaEnlazada` | Secuencial | Almacena en orden las atenciones de cada mascota | Agregar al inicio/final: O(1); buscar/eliminar por condición: O(n); recorrer: O(n) |
| `RegistroClinico` (`Map`) | Acceso por clave | Asocia el nombre de cada mascota con su lista de atenciones | Obtener/crear historial por clave: O(1) promedio; registrar atención: O(1) promedio |
| `Editor` | Historial LIFO de acciones | Agrega o elimina atenciones y revierte o rehace cambios | Apilar acción: O(1); agregar: O(1) promedio; eliminar/deshacer/rehacer: O(n) por recorrido de lista |
| Simulación (`simulacion.js`) | Secuencial por eventos | Avanza el reloj a la próxima llegada o fin de atención y genera reportes | Procesar cada llegada/fin: O(1) sin contar operaciones de registro; jornada de n turnos: O(n) |

### Trazas y cálculo manual de la jornada

La política es: una sola sala, cada atención dura 20 minutos, las urgencias no interrumpen una atención iniciada y se elige una urgencia al liberar la sala si hay alguna esperando. Los turnos usan dos colas FIFO.

| Orden atendido | Mascota | Tipo | Llegada | Inicio | Fin | Espera |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1 | Toby | General | 08:00 | 08:00 | 08:20 | 0 min |
| 2 | Luna | Urgencia | 08:10 | 08:20 | 08:40 | 10 min |
| 3 | Kira | Urgencia | 08:25 | 08:40 | 09:00 | 15 min |
| 4 | Rocky | Urgencia | 09:00 | 09:00 | 09:20 | 0 min |
| 5 | Max | General | 08:05 | 09:20 | 09:40 | 75 min |
| 6 | Simón | General | 08:20 | 09:40 | 10:00 | 80 min |
| 7 | Nala | General | 08:40 | 10:00 | 10:20 | 80 min |

El promedio de espera de urgencias es `(10 + 15 + 0) / 3 = 8,33` minutos. El promedio de las consultas generales es `(0 + 75 + 80 + 80) / 4 = 58,75` minutos. La hora de inicio nunca antecede la llegada y una urgencia que llega durante otra atención espera a que se libere la sala.

### Corrección con deshacer

Al terminar la atención de Luna, la recepción la agrega por error al historial de Toby. El editor guarda la acción en la pila LIFO de deshacer. Al detectar la equivocación, `deshacer()` retira esa misma atención de Toby; después se agrega mediante el editor al historial correcto de Luna. Al finalizar, los siete turnos quedan registrados una sola vez en sus mascotas correspondientes. Una llamada adicional a `llamarSiguiente()` con ambas colas vacías imprime un aviso y devuelve `null`.



## Paso 1. Cola vacía
Inicialmente no tenemos mascotas esperando.
frente → null

final  → null

tamanio = 0

## Paso 2. Encolar a Lola
Llega Lola y se agrega a la cola.
frente
   |
   v
+--------+
| Lola   | → NULL
+--------+
   ^
   |
  final

tamanio = 1

¿Qué sucede?
- frente apunta a Lola.
- final apunta a Lola.
- El tamaño aumenta a 1.

## Paso 3. Encolar a Toby
Después llega Toby.
frente
   |
   v
+--------+       +--------+
| Lola   | ----> | Toby   | → NULL
+--------+       +--------+
                    ^
                    |
                   final

tamanio = 2

¿Qué sucede?
- Lola continúa siendo el primero.
- Toby se agrega después de Lola.
- final ahora apunta a Toby.
- El0 tamaño aumenta a 2.

## Paso 4. Encolar a Mía
Ahora llega Mía.
frente
   |
   v
+--------+       +--------+       +--------+
| Lola   | ----> | Toby   | ----> | Mía    | → NULL
+--------+       +--------+       +--------+
                                      ^
                                      |
                                     final

tamanio = 3

¿Qué sucede?
- Lola sigue siendo la primera.
- Toby permanece en segundo lugar.
- Mía se agrega al final.
- final apunta a Mía.
- El tamaño aumenta a 3.

## Paso 5. Desencolar una vez
Ahora llamamos al siguiente turno.

Como Lola llegó primero, es la primera en salir.
        Lola sale
           |
           v
        ELIMINADA


frente
   |
   v
+--------+       +--------+
| Toby   | ----> | Mía    | → NULL
+--------+       +--------+
                    ^
                    |
                   final

tamanio = 2

¿Qué sucede?
- Lola sale de la cola.
- frente ahora apunta a Toby.
- final sigue apuntando a Mía.
- El tamaño disminuye a 2.

Conclusión del dibujo: la cola siempre respeta el orden de llegada. El primero que entra es el primero que sale.


## Comparacion de rendimiento: Cola VS Arreglo

¿Qué hace este código?
Primero crea 100.000 turnos de prueba.

Después realiza cuatro mediciones:
Medición	Implementación
Encolar 100.000 turnos	Cola con nodos
Desencolar 100.000 turnos	Cola con nodos
Encolar 100.000 turnos	Arreglo con push()
Desencolar 100.000 turnos	Arreglo con shift()


7. Complejidad de las operaciones

Operación	Cola con nodos	Arreglo
Encolar	O(1)	O(1) amortizado con push()
Desencolar	O(1)	O(n) con shift()
Ver frente	O(1)	O(1) con array[0]
Comprobar si está vacía	O(1)	O(1) con length
Consultar tamaño	O(1)	O(1) con length


¿Por qué existe esta diferencia?
Cola con nodos:

Cuando agregamos una mascota, utilizamos la referencia final para conectarla directamente al último nodo.

Cuando atendemos una mascota, movemos la referencia frente al siguiente nodo.

Por eso ambas operaciones son O(1), ya que no necesitan recorrer ni mover los demás elementos.

Arreglo con push y shift:
- push() agrega un elemento al final del arreglo. Su complejidad amortizada es O(1).
- shift() elimina el primer elemento, pero necesita desplazar los demás elementos para ocupar su posición.
Por eso shift() tiene complejidad O(n).

Si desencolamos 100.000 elementos utilizando shift(), se realizan muchos desplazamientos acumulados, lo que puede hacer que el proceso sea mucho más lento.

Conclusión: 
La cola implementada mediante nodos resulta más eficiente para administrar turnos porque permite encolar y desencolar elementos en tiempo constante O(1). En cambio, un arreglo utilizando shift() necesita reorganizar sus elementos cada vez que elimina el primero, lo que genera un mayor costo computacional.

## Mini Reto 6

Determinar qué mascota se atiende primero.
- Hay un solo consultorio.
- Cada atención dura 20 minutos.
- Las urgencias tienen prioridad sobre las consultas generales.
- Entre urgencias se respeta el orden de llegada.
- Entre consultas generales también se respeta el orden de llegada.
- Una mascota no puede ser atendida antes de llegar.
- Si el consultorio se libera, se revisa primero si hay urgencias esperando.
Orden de atención
Mascota	Tipo	Llegada	Inicio de atención	Espera
Toby	General	8:00	8:00	0 min
Luna	Urgencia	8:10	8:20	10 min
Kira	Urgencia	8:25	8:40	15 min
Rocky	Urgencia	9:00	9:00	0 min
Max	General	8:05	9:20	75 min
Simón	General	8:20	9:40	80 min
Nala	General	8:40	10:00	80 min


Importante: aunque Max llegó antes que Luna, Toby ya estaba siendo atendido cuando llegó Luna. Por eso Toby termina su atención a las 8:20 y después se atiende a Luna, porque es una urgencia.
Explicación paso a paso
1. 8:00: llega Toby y comienza inmediatamente su atención. Termina a las 8:20.
2. 8:05: llega Max, pero Toby está ocupando el consultorio. Max espera.
3. 8:10: llega Luna, que es una urgencia. Espera hasta que termine Toby.
4. 8:20: termina Toby. Se atiende Luna porque tiene prioridad. Termina a las 8:40.
5. 8:20: también llega Simón, una consulta general. Queda esperando.
6. 8:25: llega Kira, una urgencia. Espera a que termine Luna.
7. 8:40: termina Luna. Se atiende Kira, que es la siguiente urgencia. Termina a las 9:00.
8. 8:40: llega Nala, una consulta general.
9. 9:00: termina Kira y llega Rocky, que también es una urgencia. Rocky comienza inmediatamente.
10. 9:20: termina Rocky. Ya no hay urgencias esperando, así que comienza Max.
11. 9:40: comienza Simón.
12. 10:00: comienza Nala.
13. 10:20: termina la última atención.
Promedios de espera
Urgencias:
- Luna: 10 minutos.
- Kira: 15 minutos.
- Rocky: 0 minutos.

\[Promedio=\frac{10+15+0}{3}\]
\[Promedio=8.33\text{ minutos}\]
Consultas generales:
- Toby: 0 minutos.
- Max: 75 minutos.
- Simón: 80 minutos.
- Nala: 80 minutos.
\[Promedio=\frac{0+75+80+80}{4}\]
\[Promedio=58.75\text{ minutos}\]
Resultados que debemos obtener en el programa:
Tipo	Promedio de espera
Urgencias	8.33 minutos
Generales	58.75 minutos

Conclusion:
La implementación de dos colas permitió organizar la atención veterinaria según el nivel de prioridad de cada mascota. Las urgencias fueron atendidas antes que las consultas generales, respetando el orden de llegada dentro de cada categoría.

La simulación permitió controlar el tiempo mediante eventos, teniendo en cuenta que cada atención dura 20 minutos y que existe un solo consultorio. También se calcularon los tiempos de espera individuales y los promedios de cada tipo de atención.

Los resultados obtenidos fueron de 8.33 minutos de espera promedio para urgencias y 58.75 minutos para consultas generales. Se comprobó que ninguna mascota fue atendida antes de llegar y que las consultas generales no interrumpieron la atención de las urgencias.

## Mini reto 7

Se decidió implementar la pila mediante un arreglo porque JavaScript proporciona las operaciones push() y pop(), que permiten agregar y retirar elementos desde el final sin desplazar los demás. Esto facilita implementar el principio LIFO (Last In, First Out), donde el último elemento que entra es el primero que sale. Las operaciones principales tienen complejidad O(1) amortizada.

Traza:
Esta es la tabla que debes conservar como evidencia del funcionamiento de las dos pilas.

Recuerda: los elementos de las pilas se muestran desde el primero que entró hasta el último que entró (el tope).
Paso	Acción	Pila de deshacer	Pila de rehacer	Historial
1	Agregar A	Agregar A	Vacía	A
2	Agregar B	Agregar A, Agregar B	Vacía	A, B
3	Eliminar A	Agregar A, Agregar B, Eliminar A	Vacía	B
4	Deshacer	Agregar A, Agregar B	Eliminar A	A, B
5	Deshacer	Agregar A	Eliminar A, Agregar B	A
6	Rehacer	Agregar A, Agregar B	Eliminar A	A, B
7	Agregar C	Agregar A, Agregar B, Agregar C	Vacía	A, B, C
8	Rehacer	Agregar A, Agregar B, Agregar C	Vacía	A, B, C


¿Por qué algunas operaciones del editor son O(n)?

Porque para eliminar o recuperar una atención es necesario recorrer la lista enlazada hasta encontrar la posición correspondiente. Sin embargo, las operaciones propias de la clase Pila tienen complejidad O(1) amortizada.

Conclusión: 

La implementación de la estructura de datos Pila permitió desarrollar un sistema de deshacer y rehacer para el registro clínico veterinario. Se utilizaron dos pilas siguiendo el principio LIFO, donde la última acción realizada es la primera que se revierte.

El editor permite agregar y eliminar atenciones, guardar cada operación y recuperar el estado anterior del historial. También permite rehacer acciones que fueron deshechas.

Durante las pruebas se verificó que las ocho operaciones solicitadas funcionan correctamente. Se comprobó especialmente que, al realizar una nueva acción después de deshacer, la pila de rehacer se vacía y ya no permite recuperar las acciones anteriores.

Finalmente, se confirmó que deshacer y rehacer con las pilas vacías no genera errores.


## Mini Reto 9

**Diseño de las funciones**


| Función | Caso base | Reducción | Combinación |
|---|---|---|---|
| `contarServicios()` | La categoría no tiene subcategorías. | Recorre las subcategorías y vuelve a llamar a la función. | Suma los servicios de todas las categorías. |
| `listarCatalogo()` | La categoría no tiene más subcategorías. | Recorre cada subcategoría aumentando el nivel. | Muestra los nombres, servicios y precios organizados. |
| `profundidad()` | Si no hay subcategorías, devuelve 1. | Calcula la profundidad de cada subcategoría. | Selecciona el nivel más profundo y suma 1. |


4. Traza de la pila de llamadas


Primero tenemos:
Cirugías
  |
  |--- Esterilización
  |
  |--- Limpieza dental

La función comienza:
contarServicios(cirugias);

Después llama a:
contarServicios(esterilizacion);

Esta devuelve 2 porque tiene dos servicios.

Luego llama a:
contarServicios(limpiezaDental);

Esta devuelve 1 porque tiene un servicio.

Finalmente suma los resultados:
Cirugías = 0 + 2 + 1

Resultado = 3

Tabla :
| Paso | Función ejecutada | Resultado |
|---|---|---:|
| 1 | `contarServicios(Cirugías)` | Espera los resultados |
| 2 | `contarServicios(Esterilización)` | 2 |
| 3 | `contarServicios(Limpieza dental)` | 1 |
| 4 | Regresa a Cirugías y suma | 3 |


5. Resultados esperados

| Prueba | Resultado |
|---|---:|
| Servicios originales | 9 |
| Profundidad original | 3 |
| Servicios después de agregar Oftalmología | 10 |
| Profundidad después de agregar Oftalmología | 4 |

Conclusión:

En este MiniReto se trabajó la recursividad utilizando un catálogo de servicios de la veterinaria Patitas.

Se crearon tres funciones: contarServicios(), listarCatalogo() y profundidad(). Cada una permite realizar una tarea diferente sobre las categorías y subcategorías del catálogo.

Durante el desarrollo aprendí que una función recursiva puede llamarse a sí misma para recorrer información que tiene varios niveles. También comprendí la importancia del caso base, porque permite que las llamadas terminen y el programa no se ejecute infinitamente.

Al principio, el catálogo tenía 9 servicios y una profundidad de 3 niveles. Después agregué una nueva subcategoría llamada Oftalmología, con un servicio. El resultado cambió a 10 servicios y 4 niveles.

Finalmente, comprobé que las funciones pueden trabajar con nuevas categorías sin tener que modificar su código. Este ejercicio me ayudó a comprender cómo se utiliza la recursividad en la programación y cómo puede facilitar el manejo de estructuras de datos anidadas.


## Mini Reto 10


## 1. Objetivo

Implementar funciones recursivas que permitan buscar servicios dentro del catálogo de Patitas, conocer la ruta donde se encuentran, calcular el precio de paquetes y encontrar servicios según un rango de precios.

## 2. Función buscarServicio()

**¿Qué hace?**

Busca un servicio por su nombre dentro de una categoría y sus subcategorías.

- Caso base: encuentra el servicio y lo devuelve. Si no hay más categorías por recorrer, devuelve `null`.
- Reducción: busca en cada subcategoría mediante una nueva llamada a la función.
- Combinación: devuelve el servicio encontrado. Si una llamada recursiva devuelve un resultado diferente de `null`, se detiene la búsqueda y se devuelve ese resultado.

**Resultado esperado:**

- Buscar "Rabia": encuentra el servicio.
- Buscar "Gata": encuentra el servicio.
- Buscar "Peluquería": devuelve `null`.

## 3. Función rutaDeServicio()

**¿Qué hace?**

Encuentra un servicio y devuelve un arreglo con el nombre de todas las categorías por las que se debe pasar para llegar a él.

- Caso base: encuentra el servicio y devuelve un arreglo con la categoría actual y el nombre del servicio.
- Reducción: busca en las subcategorías.
- Combinación: agrega el nombre de la categoría actual al inicio de la ruta encontrada.

**Resultado esperado:**

```javascript
rutaDeServicio(catalogo, "Gata");
```

Resultado:

```javascript
["Patitas", "Cirugías", "Esterilización", "Gata"]
```

Si el servicio no existe, devuelve `null`.

## 4. Función precioPaquete()

**¿Qué hace?**

Calcula el precio de todos los servicios de una categoría, incluyendo sus subcategorías, y aplica un descuento del 10 %.

Para realizarlo se utilizan dos funciones:

- `sumarServicios()`: suma todos los precios de forma recursiva.
- `precioPaquete()`: recibe el total y aplica el descuento una sola vez.

**Caso base:** una categoría sin servicios ni subcategorías devuelve una suma de cero.

**Reducción:** se llama a `sumarServicios()` para calcular los precios de cada subcategoría.

**Combinación:** se suman los precios propios y los resultados de las subcategorías. Después, la función principal aplica el descuento.

**Ejemplo con Cirugías:**

| Servicio | Precio |
|---|---:|
| Gata | $280.000 |
| Perra | $350.000 |
| Con anestesia | $150.000 |
| **Total** | **$780.000** |

Descuento:

$780.000 × 10 % = $78.000

Precio final:

$780.000 - $78.000 = **$702.000**

## 5. Función serviciosEnRango()

**¿Qué hace?**

Busca todos los servicios que tengan un precio entre dos valores establecidos.

- Caso base: cuando una categoría no tiene servicios ni subcategorías, devuelve un arreglo vacío.
- Reducción: revisa cada subcategoría mediante llamadas recursivas.
- Combinación: reúne en un solo arreglo los servicios que cumplen con el rango de precios.

**Prueba:**

```javascript
serviciosEnRango(catalogo, 80000, 150000);
```

Resultado esperado con el catálogo original:

| Servicio | Precio |
|---|---:|
| Consulta a domicilio | $90.000 |
| Dermatología | $110.000 |
| Cardiología | $130.000 |
| Con anestesia | $150.000 |
| Triple felina | $85.000 |

Total: **5 servicios encontrados.**

## 6. Error común: aplicar el descuento en cada llamada recursiva

Uno de los errores más comunes es aplicar el descuento del 10 % dentro de la función que suma los precios de cada categoría.

Esto es incorrecto porque cada subcategoría aplicaría su propio descuento y el resultado final no correspondería al descuento del paquete completo.

**Ejemplo:**

Tenemos estos servicios:

- Gata: $280.000
- Perra: $350.000
- Con anestesia: $150.000

El total sin descuento es:

$280.000 + $350.000 + $150.000 = $780.000

**Cálculo correcto:**

Se aplica el descuento una sola vez:

$780.000 × 0,90 = $702.000

**Cálculo incorrecto:**

Si se descuenta por separado en cada categoría:

- Esterilización: ($280.000 + $350.000) × 0,90 = $567.000
- Limpieza dental: $150.000 × 0,90 = $135.000

Total: $567.000 + $135.000 = $702.000.

En este ejemplo particular da el mismo resultado porque las dos categorías reciben exactamente un descuento y no hay descuentos adicionales en niveles intermedios. Sin embargo, si también se aplica otro descuento al combinar las categorías, se estaría descontando dos veces.

Por ejemplo:

$702.000 × 0,90 = $631.800

Este resultado es incorrecto porque representa un descuento adicional.

**Conclusión:** la función auxiliar debe encargarse únicamente de sumar los precios. La función principal debe aplicar el descuento una sola vez, cuando ya tenga el total completo.

## Conclusión

Con este reto se aprendió a utilizar la recursividad para buscar información en estructuras con varios niveles.

También se aprendió a construir rutas utilizando arreglos, sumar resultados de diferentes subcategorías y separar los cálculos auxiliares de la función principal.

La recursividad permite que el programa funcione aunque se agreguen nuevas categorías o subcategorías, sin necesidad de modificar las funciones.


# Recursividad en listas enlazadas Mini Reto 11

## 1. Objetivo

Implementar métodos recursivos en la estructura de datos Lista Enlazada para contar nodos, sumar costos de atenciones, buscar registros e imprimir el historial en orden inverso. También se busca comparar el comportamiento de las funciones iterativas y recursivas.

## 2. Métodos implementados

Se agregaron cuatro métodos recursivos:

- `tamanioRecursivo()`: cuenta los nodos de la lista.
- `costoTotalRecursivo()`: suma el costo de todas las atenciones.
- `buscarRecursivo(condicion)`: busca una atención según una condición.
- `imprimirAlReves()`: imprime los datos desde el último nodo hasta el primero.

Cada método utiliza una función auxiliar que recibe un nodo como parámetro.

## 3. Caso base, reducción y combinación

En las funciones recursivas se identifican tres elementos:

**Caso base:** ocurre cuando el nodo recibido es `null`. Esto significa que se llegó al final de la lista y se debe detener la recursividad.

**Reducción:** consiste en avanzar al siguiente nodo mediante `nodo.siguiente`.

**Combinación:** consiste en unir los resultados obtenidos durante el regreso de las llamadas recursivas. Por ejemplo, para contar los nodos se suma 1 al resultado de contar los siguientes nodos.

## 4. Pruebas realizadas

Se utilizaron tres historiales de mascotas:

| Mascota | Cantidad de atenciones | Costo total |
| ------- | ---------------------: | ----------: |
| Lola    |                      2 |    $110.000 |
| Toby    |                      3 |    $140.000 |
| Mía     |                      2 |    $160.000 |

Se compararon los métodos iterativos y recursivos. Ambos deben producir los mismos resultados en las operaciones de tamaño, suma de costos y búsqueda.

También se probó la impresión inversa. Se comprobó que la recursividad permite recorrer la lista hasta el último nodo y después imprimir los datos durante el regreso de las llamadas.

## 5. Prueba de 100.000 atenciones

Se creó una lista con 100.000 atenciones para evaluar el comportamiento de `tamanioRecursivo()`.

La ejecución puede generar el error:

`RangeError: Maximum call stack size exceeded`.

Este error ocurre porque JavaScript tiene un límite de llamadas pendientes en la pila de ejecución. La función recursiva necesita mantener una llamada pendiente por cada nodo hasta llegar al final.

En cambio, el método iterativo `obtenerTamanio()` puede devolver el resultado sin recorrer nuevamente la lista, porque utiliza el atributo `tamanio`.

En Node.js v24.22.0, la llamada recursiva sobre 100.000 atenciones produjo `RangeError: Maximum call stack size exceeded`; la consulta iterativa del tamaño devolvió correctamente `100000`. El límite exacto depende del entorno de ejecución.

## 6. Comparación de complejidad

| Operación         | Versión   | Tiempo | Memoria adicional |
| ----------------- | --------- | ------ | ----------------- |
| Obtener tamaño    | Iterativa | O(1)   | O(1)              |
| Obtener tamaño    | Recursiva | O(n)   | O(n)              |
| Sumar costos      | Iterativa | O(n)   | O(1)              |
| Sumar costos      | Recursiva | O(n)   | O(n)              |
| Buscar            | Iterativa | O(n)   | O(1)              |
| Buscar            | Recursiva | O(n)   | O(n)              |
| Imprimir al revés | Recursiva | O(n)   | O(n)              |

## 7. Decisión sobre las versiones oficiales

Se decidió conservar las versiones iterativas para obtener el tamaño, sumar costos y buscar atenciones, debido a que utilizan menos memoria adicional y evitan el límite de profundidad de la recursividad.

El método `imprimirAlReves()` se conserva como implementación recursiva porque permite comprender el funcionamiento de la pila de llamadas y el regreso de las funciones.

## 8. Conclusión

La implementación permitió comprender cómo funciona la recursividad en una lista enlazada. Se identificó que las funciones recursivas pueden simplificar algunos procedimientos, pero también consumen memoria adicional debido a las llamadas pendientes.

La prueba con 100.000 atenciones permite observar que la recursividad tiene límites prácticos, mientras que las operaciones iterativas pueden resultar más apropiadas para trabajar con historiales grandes.

# Cierre de la semana — Motor Patitas v1.0

La versión 1.0 reúne los doce MiniRetos en un motor de demostración que presenta el catálogo, simula la recepción y las urgencias, registra historiales, corrige cambios y ejecuta pruebas reproducibles con un comando.

| MiniReto | Construcción | Estructura elegida y motivo |
| --- | --- | --- |
| 1. La consulta cero | Nodo y recorrido de una cadena | `Nodo`: encapsula un dato y su enlace para construir estructuras encadenadas. |
| 2. El historial clínico como lista | Inserción al inicio y al final | `ListaEnlazada` con cabeza y cola: agrega en ambos extremos en O(1) y conserva el orden del historial. |
| 3. Corregir el historial | Búsqueda, inserción posterior y eliminación | Recorrido con nodo anterior y actual: actualiza enlaces sin perder acceso al resto de las atenciones. |
| 4. Patitas v0.1 | Historiales y reporte por mascota | `Map` de nombre a `ListaEnlazada`: localiza en promedio O(1) el historial y separa las atenciones de cada animal. |
| 5. La sala de espera | Encolar y desencolar turnos | `Cola` enlazada FIFO: agrega y retira en O(1), sin desplazar los turnos restantes. |
| 6. Urgencias primero | Prioridad de urgencias y simulación por eventos | Dos colas FIFO: da prioridad a urgencias y respeta la llegada entre turnos de igual tipo. |
| 7. Deshacer y rehacer | Acciones reversibles | Dos `Pila` LIFO: la última acción editada es la primera que se deshace o rehace. |
| 8. Patitas v0.2 | Recepción conectada a historiales y editor | Composición de `Recepcion`, `RegistroClinico` y `Editor`: cada atención finalizada se registra y los errores se revierten. |
| 9. El catálogo anidado | Categorías, servicios y recorrido | Árbol mediante objetos con subcategorías: representa la jerarquía natural del catálogo. |
| 10. Rutas y paquetes | Búsqueda recursiva, rutas, rangos y paquetes | Recursión sobre el árbol: busca en cualquier nivel, combina rutas y suma ramas; el descuento se aplica una vez al total. |
| 11. El historial recursivo | Conteo, suma, búsqueda e impresión inversa | Recursión sobre `ListaEnlazada`: muestra el costo O(n) en tiempo y pila de llamadas; se prefieren las versiones iterativas en listas extensas. |
| 12. Patitas v1.0 | Demostración final, pruebas y documentación | Integra las estructuras según el problema, verifica casos normales y borde, y documenta su uso y complejidad. |

## Ejecución final

Desde la raíz del proyecto, `node demo.js` presenta catálogo, jornada, corrección, historiales y búsqueda de servicio. `node pruebas/todo.js` valida nodos, listas, cola, pila y componentes de dominio, marcando cada caso como `OK` o `FALLA`. No se requieren paquetes externos; basta con Node.js.

El historial Git conserva los commits de los MiniRetos anteriores. La integración v1.0 queda preparada en el árbol de trabajo; por instrucción de la autora no se crea un commit ni se publica un push en esta entrega.
