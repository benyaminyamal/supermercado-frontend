import { Link } from 'react-router-dom'
import { categoryById } from '../data/catalog'
import { useInventory } from '../context/InventoryContext'
import { formatCLP } from '../utils/format'

export default function Carrito() {
  const { products, cart, changeCartQuantity, removeFromCart } = useInventory()
  const lineas = cart
    .map((item) => {
      const product = products.find((product) => product.id === item.id)
      if (!product) return null
      return { ...item, product, subtotal: product.precio * item.cantidad }
    })
    .filter(Boolean)
  const total = lineas.reduce((sum, line) => sum + line.subtotal, 0)
  const unidades = lineas.reduce((sum, line) => sum + line.cantidad, 0)

  if (lineas.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body text-center py-5">
          <h2 className="h4">El carrito está vacío</h2>
          <p className="text-secondary">Elige un artículo del listado para agregarlo.</p>
          <Link to="/articulos" className="btn btn-primary">
            Ver artículos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="card shadow-sm">
      <div className="card-body pb-0">
        <p className="text-secondary mb-0">
          {unidades === 1 ? '1 unidad' : `${unidades} unidades`} en el carrito. Al sumar se
          descuenta del inventario y al restar la unidad vuelve a la sala.
        </p>
      </div>
      <div className="table-responsive mt-3">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Artículo</th>
              <th scope="col">Marca</th>
              <th scope="col" className="text-end">
                Precio
              </th>
              <th scope="col">Cantidad</th>
              <th scope="col" className="text-end">
                Subtotal
              </th>
              <th scope="col">
                <span className="visually-hidden">Quitar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {lineas.map((line) => {
              const tipo = categoryById(line.product.tipo)
              const sinStock = line.product.stock <= 0
              return (
                <tr key={line.id}>
                  <th scope="row">
                    <Link to={`/articulos/${line.product.id}`} className="link-dark">
                      {line.product.nombre}
                    </Link>
                    <div className="fw-normal text-secondary small">{tipo.label}</div>
                  </th>
                  <td>{line.product.marca}</td>
                  <td className="text-end">{formatCLP(line.product.precio)}</td>
                  <td>
                    <div className="stepper" aria-label={`Cantidad de ${line.product.nombre}`}>
                      <button
                        type="button"
                        className="btn btn-light rounded-circle"
                        onClick={() => changeCartQuantity(line.id, -1)}
                        aria-label={`Quitar una unidad de ${line.product.nombre}`}
                      >
                        −
                      </button>
                      <div>
                        <strong>{line.cantidad}</strong>
                        <span>{line.product.unidad}</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-light rounded-circle"
                        onClick={() => changeCartQuantity(line.id, 1)}
                        disabled={sinStock}
                        aria-label={`Sumar una unidad de ${line.product.nombre}`}
                      >
                        +
                      </button>
                    </div>
                    {sinStock && <p className="small text-danger mb-0 mt-1">Sin stock en sala</p>}
                  </td>
                  <td className="text-end">{formatCLP(line.subtotal)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-link btn-sm text-danger"
                      onClick={() => removeFromCart(line.id)}
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={4} className="text-end">
                Total
              </th>
              <td className="text-end fw-semibold">{formatCLP(total)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}
