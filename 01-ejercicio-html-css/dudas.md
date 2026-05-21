<!-- Aquí puedes poner las dudas de la corrección o del ejercicio -->

# Dudas del ejercicio

- En una de las correcciones se consulta cuál es el objetivo de un **input**, puntualmente en la línea 76. El propósito de ese elemento era dar funcionalidad al botón **“Subir CV”**, abriendo la ventana nativa de carga de archivos. Consideré que podía ser útil aprovechar esta funcionalidad propia de HTML. ¿estaría mal?

- A veces, como ocurrió en este ejercicio, tiendo a envolver ciertos elementos en **divs** con fines de estilo, o a utilizar etiquetas como **small**. Quisiera saber si esto puede resultar problemático o si, en general, es aceptable mientras se mantenga una estructura semántica adecuada.

- Entendí que los niveles de encabezados (**h1–h6**) deben seguir un orden consecutivo. Es decir, no debería aparecer un **h3** si no existe previamente un **h2**. En consecuencia, el tamaño visual debería controlarse mediante **CSS**, ¿es correcto?

- Según la corrección, los elementos **anchor** (`<a>`) deben incluir siempre un atributo **href**. En caso de no existir un destino real, se sugiere utilizar un **aria-label** que explique su función. ¿O además del `href` se recomienda siempre incluir un `aria-label` para mejorar accesibilidad?

- Dado que la consigna trabajaba con varios archivos HTML, consideré adecuado utilizar **anchors** en lugar de **buttons** para la paginación. ¿Es una buena práctica en general, o simplemente fue válido en este caso particular?

#¡GRACIAS!

---

# Respuesta

Hola Erio! Excelentes preguntas, vamos contestando por partes:

1. **Input de type="file"**

Que suerte que lo consultaste, volví a revisar el archivo y está genial la implementación. No vi que tenias un onclick en el elemento hermano. Por eso, me llamó la atención que existiera el input con propiedad hidden.

Una cosa que si creo que podría mejorar la semántica y la accesibilidad es usar directamente ese input y estilarlo para que se vea como el botón de subir CV. 

Esto hace que el input funcione sin necesidad de un onclick en el botón hermano (evitando además tener un botón hermano), y haciendo que funcione con el teclado (ya que el input es un elemento que se puede interactuar con `tab` y `enter`).

Quedaría algo así:

```html
<label for="subircv" class="uploadBtn">
  <svg class="res-ico" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="icon icon-tabler icons-tabler-outline icon-tabler-file-cv">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
    <path d="M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
    <path d="M13 11l1.5 6l1.5 -6" />
  </svg>
  <span class="res-txt">Subir CV</span>
  <input type="file" id="subircv" name="cv" />
</label>
```

```css
.uploadBtn {
    background-color: rgb(19, 50, 81);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    color: var(--primary-light);
    height: 1.6rem;
    border-radius: 0.5rem;
    border-style: none;
    padding-inline: .5rem;
    padding-block: .25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

  }

  .uploadBtn:focus-within {
    outline: 2px solid white;
    outline-offset: 2px;
  }
  .uploadBtn:hover {
    background-color: var(--primary-light);
    color: rgb(19, 50, 81);
  }

  .uploadBtn input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
```

Vamos por partes:

Lo que hicimos fue envolver el `input` en un label, para que el contenido del label sea el que se pueda interactuar con el `input`.

Por otro lado, sacamos el atributo `hidden` del `input` para que se pueda interactuar con él.

Con CSS, ocultamos el `input` con las propiedades `position: absolute`, `width: 1px`, `height: 1px`, `padding: 0`, `margin: -1px`, `overflow: hidden`, `clip: rect(0, 0, 0, 0)`, `white-space: nowrap`, `border-width: 0`. Esto es algo engorroso, pero muchas librerías de CSS (Tailwind por ejemplo), usan esto cuando quieren ocultar un elemento, pero que siga siendo interactivo (al poner `display: hidden`) pierde interactividad.

1. **Uso de divs y etiquetas como small**

Está perfecto usar `div` para agrupar elementos con fines de estilo, siempre y cuando no exista una etiqueta semántica más apropiada. La regla general es:

- Si existe una etiqueta semántica que describe mejor el contenido (`section`, `article`, `nav`, `header`, `footer`, `aside`, etc.), úsala.
- Si solo necesitas agrupar para aplicar estilos y no hay una etiqueta semántica apropiada, `div` es la opción correcta.

Sobre `small`: está bien usarlo, pero tiene un propósito semántico específico. Según la especificación HTML, `small` representa "comentarios secundarios" o "letra pequeña" (como avisos legales, copyright, etc.). Si ya está dentro de un `p` y solo quieres hacer el texto más pequeño visualmente, es mejor usar CSS directamente con una clase. Ejemplo:

```html
<!-- ❌ No semántico -->
<p><small>Texto normal que solo quiero más pequeño</small></p>

<!-- ✅ Mejor con CSS -->
<p class="text-sm">Texto normal que quiero más pequeño</p>

<!-- ✅ Uso correcto de small -->
<p>Precio: $100</p>
<small>IVA incluido. Términos y condiciones aplican.</small>
```

3. **Jerarquía de encabezados (h1-h6)**

Los encabezados deben seguir un orden consecutivo por razones de accesibilidad y SEO:

- Solo debe haber un `h1` por página (el título principal)
- No saltes niveles: si usas `h3`, debe existir un `h2` antes
- El tamaño visual se controla con CSS

```html
<!-- ❌ Incorrecto -->
<h1>Título principal</h1>
<h3>Subsección</h3> <!-- Saltamos el h2 -->

<!-- ✅ Correcto -->
<h1>Título principal</h1>
<h2>Sección</h2>
<h3>Subsección</h3>

<!-- Si necesitas que h2 se vea pequeño -->
<h2 class="text-sm">Sección con texto pequeño</h2>
```

Los lectores de pantalla usan la jerarquía de encabezados para navegar, por eso es importante mantener el orden

4. **Atributos href y aria-label en anchors**

Buena pregunta. Vamos por partes:

- **`href` es obligatorio** en un `<a>` para que sea un enlace válido. Sin `href`, técnicamente es solo un "placeholder" para un enlace.
- **`aria-label` NO es obligatorio siempre**, solo en casos específicos:

**Cuándo usar `aria-label` en anchors:**

```html
<!-- ✅ Anchor con texto descriptivo: NO necesita aria-label -->
<a href="/contacto">Contacto</a>

<!-- ✅ Anchor solo con icono: SÍ necesita aria-label -->
<a href="/perfil" aria-label="Ver perfil de usuario">
  <svg><!-- icono --></svg>
</a>

<!-- ✅ Anchor con texto visible pero necesita más contexto -->
<a href="/editar" aria-label="Editar artículo sobre HTML">
  Editar
</a>

<!-- ✅ Alternativa: usar title para tooltip -->
<a href="/perfil" title="Ver perfil de usuario">
  <svg><!-- icono --></svg>
</a>
```

**Regla general:** Si el anchor tiene texto descriptivo visible, no necesitas `aria-label`. Si solo tiene un icono o el texto no es suficientemente descriptivo, usa `aria-label` o `title` (o ambos).

Por otro lado, si el `anchor` no tiene un `href` definido, podemos usar `href="#"` para que el enlace sea válido.

5. **Anchors vs buttons en paginación**

La regla de cuando usarlos sería algo así:

- **`<a>` (anchor)**: Cuando navegas a otra URL o página → Paginación con múltiples archivos HTML ✅
- **`<button>`**: Cuando ejecutas una acción sin cambiar de página → Paginación dinámica con JavaScript

```html
<!-- ✅ Paginación con múltiples archivos HTML -->
<nav class="pagination">
  <a href="page1.html">1</a>
  <a href="page2.html">2</a>
  <a href="page3.html">3</a>
</nav>

<!-- ✅ Paginación dinámica con JavaScript -->
<nav class="pagination">
  <button onclick="loadPage(1)">1</button>
  <button onclick="loadPage(2)">2</button>
  <button onclick="loadPage(3)">3</button>
</nav>
```

En tu caso está bien, pero todo va a depender de la funcionalidad que quieras implementar. Puede funcionar con anchor como con button. Lo que determina cuál usar es como se comporta el elemento.

Si quieres que la paginación funcione por search params, está bien usar anchor. Si quieres que la paginación funcione por JavaScript, está bien usar button.