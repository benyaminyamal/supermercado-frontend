import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { categoryById } from '../data/catalog'
import { useInventory } from '../context/InventoryContext'
import { formatCLP, locationLabel, statusLabel, stockStatus } from '../utils/format'

const STATUS_BADGE = {
  ok: 'text-bg-success',
  low: 'text-bg-warning',
  out: 'text-bg-danger',
}

export default function DetalleArticulo() {
  const { id } = useParams()
  const { products, addToCart } = useInventory()
  const product = products.find((item) => item.id === id)
  const [cantidad, setCantidad] = useState('1')
  const [error, setError] = useState('')
  const [agregado, setAgregado] = useState(0)

  if (!product) {
    return (
      <div className="alert alert-warning">
        Ese artículo no está en el inventario.{' '}
        <Link to="/articulos" className="alert-link">
          Volver al listado
        </Link>
      </div>
    )
  }

  const tipo = categoryById(product.tipo)
  const status = stockStatus(product)
  const agotado = product.stock <= 0

  function handleSubmit(event) {
    event.preventDefault()
    const pedidas = Number(cantidad)
    if (!Number.isInteger(pedidas) || pedidas < 1) {
      setError('Indica una cantidad entera mayor que cero.')
      setAgregado(0)
      return
    }
    if (pedidas > product.stock) {
      setError(`Solo quedan ${product.stock} ${product.unidad} disponibles.`)
      setAgregado(0)
      return
    }
    const tomadas = addToCart(product.id, pedidas)
    if (tomadas < 1) {
      setError('No queda stock para agregar al carrito.')
      setAgregado(0)
      return
    }
    setError('')
    setAgregado(tomadas)
    setCantidad('1')
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <Link to="/articulos" className="btn btn-link px-0 mb-2">
          Volver al listado
        </Link>
        <article className="card shadow-sm">
          <div className="card-body">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <h2 className="h3 mb-0">{product.nombre}</h2>
              <span className="badge text-bg-light">{tipo.label}</span>
              <span className={`badge ${STATUS_BADGE[status]}`}>{statusLabel(status)}</span>
            </div>
            <p className="text-secondary mb-4">{product.marca}</p>
            <dl className="row mb-4">
              <dt className="col-sm-4">Precio</dt>
              <dd className="col-sm-8">{formatCLP(product.precio)}</dd>
              <dt className="col-sm-4">Disponible</dt>
              <dd className="col-sm-8">
                {product.stock} {product.unidad}
              </dd>
              <dt className="col-sm-4">Stock mínimo</dt>
              <dd className="col-sm-8">
                {product.minimo} {product.unidad}
              </dd>
              <dt className="col-sm-4">Ubicación</dt>
              <dd className="col-sm-8 mb-0">{locationLabel(product.pasillo)}</dd>
            </dl>

            {agregado > 0 && (
              <div className="alert alert-success" role="status">
                Agregaste {agregado} {product.unidad} al carrito. El inventario ya descontó esa
                cantidad.{' '}
                <Link to="/carrito" className="alert-link">
                  Ver el carrito
                </Link>
              </div>
            )}

            {agotado ? (
              <p className="text-danger mb-0">No queda stock para agregar al carrito.</p>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3 align-items-end">
                  <div className="col-sm-4">
                    <label className="form-label" htmlFor="cantidad">
                      Cantidad
                    </label>
                    <input
                      id="cantidad"
                      className={`form-control${error ? ' is-invalid' : ''}`}
                      inputMode="numeric"
                      min="1"
                      max={product.stock}
                      value={cantidad}
                      onChange={(event) => {
                        setCantidad(event.target.value)
                        setError('')
                      }}
                      aria-invalid={Boolean(error)}
                    />
                    {error && <div className="invalid-feedback">{error}</div>}
                  </div>
                  <div className="col-sm-8">
                    <button type="submit" className="btn btn-primary">
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}
