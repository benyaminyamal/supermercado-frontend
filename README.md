# Abasto — gestión de inventario

Sitio del supermercado Abasto para revisar y actualizar el inventario de una sala.
La página principal es el tablero de góndola. El menú inferior abre Quiénes somos y Preguntas frecuentes.
El menú de inventario abre el ingreso de artículos, la tabla, el detalle y el carrito.

Los artículos viven en un estado global de React. Cada uno guarda nombre, marca, tipo de producto y los datos de sala.
La navegación está hecha con React Router y el estilo con Bootstrap.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Inventario de góndola: búsqueda, filtros, alertas y ajuste de stock |
| `/ingresar` | Formulario para agregar un artículo |
| `/articulos` | Tabla del inventario, con filtro por categoría |
| `/articulos/:id` | Detalle del artículo y alta al carrito |
| `/carrito` | Artículos del carrito, con ajuste de cantidad |
| `/quienes-somos` | Historia de la cadena, salas y forma de trabajo |
| `/preguntas-frecuentes` | Horarios, compra, cambios y uso del inventario |

Los cambios quedan guardados en el navegador. El botón «Restaurar catálogo de demostración» vuelve a los productos iniciales.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abrir la dirección que muestra Vite, por defecto `http://localhost:5173`.

## Tecnologías

- React
- React Router
- Bootstrap
- Vite
- HTML, CSS y JavaScript
