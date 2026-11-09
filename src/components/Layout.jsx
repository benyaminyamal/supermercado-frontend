import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import InventoryMenu from './InventoryMenu'

const PAGES = {
  '/': {
    kicker: 'Sala Ñuñoa',
    title: 'Inventario de góndola',
  },
  '/quienes-somos': {
    kicker: 'La cadena',
    title: 'Quiénes somos',
  },
  '/preguntas-frecuentes': {
    kicker: 'Ayuda',
    title: 'Preguntas frecuentes',
  },
  '/ingresar': {
    kicker: 'Sala Ñuñoa',
    title: 'Ingresar artículo',
  },
  '/articulos': {
    kicker: 'Sala Ñuñoa',
    title: 'Artículos en inventario',
  },
  '/carrito': {
    kicker: 'Sala Ñuñoa',
    title: 'Carrito de compras',
  },
}

function pageFor(pathname) {
  if (pathname.startsWith('/articulos/') && pathname.length > '/articulos/'.length) {
    return { kicker: 'Sala Ñuñoa', title: 'Detalle del artículo' }
  }
  return PAGES[pathname] ?? { kicker: 'Abasto', title: 'Supermercado' }
}

export default function Layout() {
  const { pathname } = useLocation()
  const page = pageFor(pathname)

  useEffect(() => {
    document.title = `${page.title} · Abasto`
  }, [page.title])

  return (
    <div className="app d-flex flex-column min-vh-100">
      <header className="bg-success text-white">
        <div className="container py-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
          <p className="h4 mb-0">
            <i className="bi bi-shop me-2" aria-hidden="true"></i>
            Abasto
          </p>
          <div className="text-sm-end">
            <p className="mb-0 small">{page.kicker}</p>
            <h1 className="h4 mb-0">{page.title}</h1>
          </div>
        </div>
      </header>
      <InventoryMenu />
      <main id="contenido" className="container page-wrap flex-grow-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
