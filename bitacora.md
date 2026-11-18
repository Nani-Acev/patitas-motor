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
