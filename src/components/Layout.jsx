import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'

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
}

export default function Layout() {
  const { pathname } = useLocation()
  const page = PAGES[pathname] ?? { kicker: 'Abasto', title: 'Supermercado' }

  useEffect(() => {
    document.title = `${page.title} · Abasto`
  }, [page.title])

  return (
    <div className="app">
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <header className="topbar">
        <div className="shell topbar-inner">
          <div className="brand">
            <span className="mark" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="M6 12h20l-1.8 11.2a2.4 2.4 0 0 1-2.4 2H10.2a2.4 2.4 0 0 1-2.4-2L6 12z" />
                <path d="M11 12c0-3.6 2.2-6 5-6s5 2.4 5 6" fill="none" />
              </svg>
            </span>
            <div>
              <p className="brand-name">Abasto</p>
              <p className="brand-kicker">{page.kicker}</p>
            </div>
          </div>
          <h1>{page.title}</h1>
        </div>
      </header>
      <main id="contenido" className="shell page">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
