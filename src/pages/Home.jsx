import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, categoryById } from '../data/catalog'
import { useInventory } from '../context/InventoryContext'
import { formatCLP, locationLabel, normalizeText, statusLabel, stockStatus } from '../utils/format'

const STATUS_BORDER = {
  ok: 'border-success',
  low: 'border-warning',
  out: 'border-danger',
}

const STATUS_BADGE = {
  ok: 'text-bg-success',
  low: 'text-bg-warning',
  out: 'text-bg-danger',
}

export default function Home() {
  const { products, adjustStock, removeProduct, restoreCatalog } = useInventory()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('todas')
  const [onlyLow, setOnlyLow] = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  const summary = useMemo(() => {
    const units = products.reduce((total, product) => total + product.stock, 0)
    const alerts = products.filter((product) => stockStatus(product) !== 'ok').length
    return { skus: products.length, units, alerts }
  }, [products])

  const visible = useMemo(() => {
    const term = normalizeText(query)
    return products.filter((product) => {
      const categoryInfo = categoryById(product.tipo)
      const matchesCategory = category === 'todas' || product.tipo === category
      const matchesAlert = !onlyLow || stockStatus(product) !== 'ok'
      const haystack = normalizeText(
        `${product.nombre} ${product.marca} ${categoryInfo.label} ${locationLabel(product.pasillo)}`,
      )
      return matchesCategory && matchesAlert && (term.length === 0 || haystack.includes(term))
    })
  }, [products, query, category, onlyLow])

  const filtersActive = query.trim() !== '' || category !== 'todas' || onlyLow

  return (
    <div>
      <section className="row g-3" aria-label="Resumen del inventario">
        <article className="col-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary text-uppercase small mb-1">Productos</p>
              <p className="fs-2 fw-bold mb-0">{summary.skus}</p>
            </div>
          </div>
        </article>
        <article className="col-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary text-uppercase small mb-1">Unidades</p>
              <p className="fs-2 fw-bold mb-0">{summary.units}</p>
            </div>
          </div>
        </article>
        <article className="col-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <p className="text-secondary text-uppercase small mb-1">Por reponer</p>
              <p className={`fs-2 fw-bold mb-0${summary.alerts > 0 ? ' text-danger' : ''}`}>
                {summary.alerts}
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="card shadow-sm mt-3">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row gap-2">
            <label className="flex-grow-1">
              <span className="visually-hidden">Buscar producto</span>
              <input
                className="form-control"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, marca, tipo o pasillo"
              />
            </label>
            <Link to="/ingresar" className="btn btn-primary">
              Ingresar artículo
            </Link>
          </div>
          <div className="d-flex gap-2 overflow-auto mt-3 pb-1" role="group" aria-label="Filtrar por tipo">
            <button
              type="button"
              className={`btn btn-sm rounded-pill text-nowrap ${category === 'todas' ? 'btn-dark' : 'btn-outline-secondary'}`}
              onClick={() => setCategory('todas')}
            >
              Todas
            </button>
            {CATEGORIES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`btn btn-sm rounded-pill text-nowrap ${category === item.id ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className={`btn btn-sm rounded-pill text-nowrap ${onlyLow ? 'btn-danger' : 'btn-outline-danger'}`}
              aria-pressed={onlyLow}
              onClick={() => setOnlyLow((current) => !current)}
            >
              Solo alertas
            </button>
          </div>
        </div>
      </section>

      <p className="text-secondary mt-3 mb-2" aria-live="polite">
        {visible.length === 1 ? '1 producto' : `${visible.length} productos`}
        {summary.alerts > 0 ? ` · ${summary.alerts} con alerta` : ''}
      </p>

      {visible.length === 0 ? (
        <div className="card shadow-sm">
          <div className="card-body text-center py-5">
            <h2 className="h4">Nada coincide con ese filtro</h2>
            <p className="text-secondary">Prueba con otro nombre o limpia la búsqueda para ver la sala completa.</p>
            {filtersActive && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setQuery('')
                  setCategory('todas')
                  setOnlyLow(false)
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>
      ) : (
        <ul className="list-unstyled d-grid gap-2 mb-0">
          {visible.map((product) => {
            const info = categoryById(product.tipo)
            const status = stockStatus(product)
            const confirming = confirmId === product.id
            return (
              <li key={product.id}>
                <article className={`card shadow-sm border-start border-4 ${STATUS_BORDER[status]}`}>
                  <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div>
                      <div className="d-flex flex-wrap align-items-center gap-2">
                        <h2 className="h6 mb-0">{product.nombre}</h2>
                        <span className="badge text-bg-light">{info.label}</span>
                        <span className={`badge ${STATUS_BADGE[status]}`}>{statusLabel(status)}</span>
                      </div>
                      <p className="text-secondary mb-0 mt-1">
                        {product.marca} · {locationLabel(product.pasillo)} · {formatCLP(product.precio)} · mínimo{' '}
                        {product.minimo} {product.unidad}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <div className="stepper" aria-label={`Stock de ${product.nombre}`}>
                        <button
                          type="button"
                          className="btn btn-light rounded-circle"
                          onClick={() => adjustStock(product.id, -1)}
                          disabled={product.stock === 0}
                          aria-label={`Quitar una unidad de ${product.nombre}`}
                        >
                          −
                        </button>
                        <div>
                          <strong>{product.stock}</strong>
                          <span>{product.unidad}</span>
                        </div>
                        <button
                          type="button"
                          className="btn btn-light rounded-circle"
                          onClick={() => adjustStock(product.id, 1)}
                          aria-label={`Sumar una unidad de ${product.nombre}`}
                        >
                          +
                        </button>
                      </div>
                      {confirming ? (
                        <div className="d-flex flex-column align-items-end">
                          <span className="small">¿Quitar de la sala?</span>
                          <button type="button" className="btn btn-link btn-sm text-danger p-0" onClick={() => removeProduct(product.id)}>
                            Sí, eliminar
                          </button>
                          <button type="button" className="btn btn-link btn-sm p-0" onClick={() => setConfirmId(null)}>
                            No
                          </button>
                        </div>
                      ) : (
                        <button type="button" className="btn btn-link btn-sm text-danger" onClick={() => setConfirmId(product.id)}>
                          Eliminar
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      )}

      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mt-4">
        <button type="button" className="btn btn-link px-0" onClick={restoreCatalog}>
          Restaurar catálogo de demostración
        </button>
        <p className="text-secondary small mb-0">Los movimientos quedan guardados en este navegador.</p>
      </div>
    </div>
  )
}
