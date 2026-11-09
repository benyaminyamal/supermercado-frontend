import { NavLink } from 'react-router-dom'
import { useInventory } from '../context/InventoryContext'

const LINKS = [
  { to: '/ingresar', label: 'Ingresar artículo' },
  { to: '/articulos', label: 'Artículos en inventario' },
  { to: '/carrito', label: 'Carrito' },
]

export default function InventoryMenu() {
  const { cart } = useInventory()
  const unidades = cart.reduce((total, item) => total + item.cantidad, 0)

  return (
    <nav className="bg-white border-bottom" aria-label="Menú de inventario">
      <div className="container py-2 d-flex flex-wrap align-items-center gap-2">
        <span className="fw-semibold text-secondary me-sm-2">Menú de inventario</span>
        <ul className="nav nav-pills">
          {LINKS.map((link) => (
            <li className="nav-item" key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {link.to === '/carrito' && unidades > 0 && (
                      <span className={`badge ms-2 ${isActive ? 'text-bg-light' : 'text-bg-success'}`}>
                        {unidades}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
