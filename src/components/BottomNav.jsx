import { NavLink } from 'react-router-dom'
import { IconHelp, IconHome, IconPeople } from './Icons'

const LINKS = [
  { to: '/', label: 'Inicio', icon: IconHome, end: true },
  { to: '/quienes-somos', label: 'Quiénes somos', icon: IconPeople, end: false },
  { to: '/preguntas-frecuentes', label: 'Preguntas', icon: IconHelp, end: false },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Secciones del sitio">
      {LINKS.map((link) => {
        const Icon = link.icon
        return (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
          >
            <Icon />
            <span>{link.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}
