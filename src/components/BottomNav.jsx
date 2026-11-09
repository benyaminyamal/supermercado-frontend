import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Inicio', icon: 'bi-house-door', end: true },
  { to: '/quienes-somos', label: 'Quiénes somos', icon: 'bi-people', end: false },
  { to: '/preguntas-frecuentes', label: 'Preguntas', icon: 'bi-question-circle', end: false },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav navbar fixed-bottom bg-white border-top" aria-label="Secciones del sitio">
      <ul className="nav nav-fill w-100">
        {LINKS.map((link) => (
          <li className="nav-item" key={link.to}>
            <NavLink
              to={link.to}
              end={link.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <i className={`bi ${link.icon}`} aria-hidden="true"></i>
              <span>{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
