<!-- Aquí puedes introducir tus dudas sobre el ejercicio, la consigna, la corrección, etc -->

En el ejercicio que la consigna era darle funcionalidad al botón me pareció muy interesante el metodo closest, pero no estoy muy seguro de la utilidad general, y si la comprendí bien:
Closest( ) lo que haría sería buscar el elemento padre mas cercano con la referencia que le pasamos, es decir si en lugar de haber un <button>aplicar</button> hubiera un <button><span>Aplicar</span></button>buscando el e.target.className === "clase" no lo encontraríamos porque la clase quisas la tiene el botón pero no el span, pero con closest entonces el span sería el e.target.
Me gustaría estar serguro que lo entendí.

Gracias por las otras formas de resolver, me parecieron super interesantes

---

**Respuesta:**

Hola! Lo entendiste perfecto :)
`closest()` siempre busca hacia arriba (padres, abuelos, etc.) hasta encontrar el elemento que coincida con su selector. 

Y aquí lo que faltó es que:
También se fija en el propio elemento desde donde se llama, no solo en sus padres.

La magia de usar `closest()` es que si el botón tiene un span con un icon dentro, si el usuario hace click en el icon, el evento se dispara en el span y nunca en el botón (por ende no funcionaría). Con `closest()` siempre va a funcionar aunque le des click al icono o al span.


Como regla:
Usar `closest()` te deja poner **un solo listener en un contenedor** y manejar clicks de muchos elementos adentro, sin agregar un listener a cada sub-elemento.
Se llama "event delegation" y es súper común.

Si siguen quedando dudas o te mareé más con esto, me avisas si?
A seguir que vas genial!