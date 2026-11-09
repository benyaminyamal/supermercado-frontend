# Abasto — gestión de inventario

Sitio del supermercado Abasto para revisar y actualizar el inventario de una sala.
La página principal es el tablero de góndola. Un menú inferior abre otras dos pantallas: Quiénes somos y Preguntas frecuentes.

La navegación está hecha con React Router.

## Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Inventario: búsqueda, filtros, alertas de stock, alta y ajuste de productos |
| `/quienes-somos` | Historia de la cadena, salas y forma de trabajo |
| `/preguntas-frecuentes` | Horarios, compra, cambios y uso del inventario |

Los cambios de stock se guardan en el navegador. El botón «Restaurar catálogo de demostración» vuelve a los productos iniciales.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abrir la dirección que muestra Vite, por defecto `http://localhost:5173`.

## Tecnologías

- React
- React Router
- Vite
- HTML, CSS y JavaScript
