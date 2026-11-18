 **Diagrama**


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


**Método	Explicación**
agregarAlFinal(dato)	Crea un nodo nuevo y lo conecta después del último nodo.
agregarAlInicio(dato)	Crea un nodo nuevo y lo conecta antes del primer nodo.
recorrer(callback)	Visita cada nodo y ejecuta una función con su información.
aArreglo()	Guarda todos los datos de la lista en un arreglo.
estaVacia()	Comprueba si el tamaño de la lista es igual a cero.
obtenerTamanio()	Devuelve la cantidad de elementos almacenados.


**¿Por qué agregar al inicio y al final es O(1)?**
Porque tenemos dos referencias:
- cabeza nos permite acceder directamente al primer nodo.
- cola nos permite acceder directamente al último nodo.
Por eso no necesitamos utilizar un ciclo while para buscar dónde insertar el nuevo elemento.

**Conclusión**
La lista enlazada permite almacenar datos mediante nodos conectados entre sí. En esta actividad implementamos una estructura que utiliza las referencias cabeza y cola para facilitar la inserción de elementos al principio y al final en tiempo constante O(1).

También implementamos métodos para recorrer la lista, convertirla en un arreglo, comprobar si está vacía y consultar su tamaño. Finalmente, realizamos seis pruebas para verificar que las referencias y el tamaño se actualizaran correctamente después de cada operación.