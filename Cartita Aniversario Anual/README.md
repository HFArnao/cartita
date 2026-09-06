# Un año contigo ♡

Carta de aniversario en HTML, CSS y JavaScript, sin instalaciones ni compilación.

## Ver la carta

Abre `index.html` con tu navegador. También puedes abrir la carpeta en Visual Studio Code y usar Live Server si ya lo tienes instalado.

## Cambiar los textos y las fotos

1. Abre `contenido.js`. Los textos incluidos son ejemplos: reemplázalos por tu mensaje.
2. Copia tus fotografías en `assets/fotos/`. Usa nombres simples, por ejemplo `recuerdo-1.jpg` y `playa-1.jpg`.
3. En cada foto cambia `src: ""` por `src: "assets/fotos/recuerdo-1.jpg"` (con el nombre correspondiente).
4. Personaliza `alt` (descripción de la imagen), `texto` (dedicatoria) y `fecha` (etiqueta pequeña).
5. Guarda y recarga la página. Puedes agregar o quitar elementos de `recuerdos`; `playaFotos` tiene dos espacios.

Para párrafos nuevos, añade un texto entre comillas dentro de `parrafos`, separado del anterior por una coma. Si necesitas comillas dentro de una frase, usa comillas curvas «así» para no interrumpir el código.

Las fotos vacías o con rutas incorrectas muestran una tarjeta de reserva. No se han incluido fotos ajenas. Se recomienda JPG o WebP, de unos 1200 píxeles de ancho y, si es posible, menos de 500 KB por foto.

## Publicar en GitHub Pages

1. Crea un repositorio en tu cuenta de GitHub.
2. Sube estos archivos y la carpeta `assets`, conservando su estructura; `index.html` debe estar en la raíz.
3. En el repositorio abre Settings → Pages.
4. En Build and deployment selecciona Deploy from a branch, la rama main y la carpeta / (root). Guarda.
5. GitHub mostrará el enlace cuando termine de publicar.

Los nombres de las fotos deben coincidir exactamente, incluyendo mayúsculas y extensiones. Las rutas relativas permiten publicar bajo el nombre del repositorio.

## Detalles

- Diseño para celulares y escritorio.
- Sobre con entrada, apertura y explosión de pétalos en Canvas.
- Animaciones que respetan la preferencia de movimiento reducido.
- Textos insertados como texto, no como HTML.
- Google Fonts carga Parisienne, Cormorant Garamond y DM Sans; hay fuentes de respaldo sin conexión.
- Decoración floral y tropical inicial con emojis; se puede sustituir por ilustraciones personalizadas.
- Esta primera versión está preparada para publicar, pero todavía no está publicada.
