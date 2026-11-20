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
Esta tabla debes incluirla en tu bitácora.
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
Determinar qué mascota se atiende primero. Recuerda estas reglas:
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