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