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


## COmparacion de rendimiento: Cola VS Arreglo

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