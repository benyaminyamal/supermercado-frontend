import { useMemo, useState } from 'react'
import ProductForm from '../components/ProductForm'
import { CATEGORIES, categoryById } from '../data/catalog'
import { useInventory } from '../context/InventoryContext'
import { formatCLP, locationLabel, normalizeText, statusLabel, stockStatus } from '../utils/format'

export default function Home() {
  const { products, addProduct, adjustStock, removeProduct, restoreCatalog } = useInventory()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('todas')
  const [onlyLow, setOnlyLow] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  const summary = useMemo(() => {
    const units = products.reduce((total, product) => total + product.stock, 0)
    const alerts = products.filter((product) => stockStatus(product) !== 'ok').length
    return { skus: products.length, units, alerts }
  }, [products])

  const visible = useMemo(() => {
    const term = normalizeText(query)
    return products.filter((product) => {
      const categoryInfo = categoryById(product.categoria)
      const matchesCategory = category === 'todas' || product.categoria === category
      const matchesAlert = !onlyLow || stockStatus(product) !== 'ok'
      const haystack = normalizeText(
        `${product.nombre} ${categoryInfo.label} ${locationLabel(product.pasillo)}`,
      )
      const matchesQuery = term.length === 0 || haystack.includes(term)
      return matchesCategory && matchesAlert && matchesQuery
    })
  }, [products, query, category, onlyLow])

  const filtersActive = query.trim() !== '' || category !== 'todas' || onlyLow

  return (
    <div className="home">
      <section className="stats" aria-label="Resumen del inventario">
        <article>
          <span>Productos</span>
          <strong>{summary.skus}</strong>
        </article>
        <article>
          <span>Unidades</span>
          <strong>{summary.units}</strong>
        </article>
        <article className={summary.alerts > 0 ? 'is-alert' : undefined}>
          <span>Por reponer</span>
          <strong>{summary.alerts}</strong>
        </article>
      </section>

      <section className="toolbar">
        <div className="toolbar-row">
          <label className="search">
            <span className="sr-only">Buscar producto</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, categoría o pasillo"
            />
          </label>
          <button type="button" className="button button-primary" onClick={() => setFormOpen(true)}>
            Agregar producto
          </button>
        </div>
        <div className="chips" role="group" aria-label="Filtrar por categoría">
          <button
            type="button"
            className={category === 'todas' ? 'chip is-on' : 'chip'}
            onClick={() => setCategory('todas')}
          >
            Todas
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={category === item.id ? 'chip is-on' : 'chip'}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className={onlyLow ? 'chip chip-alert is-on' : 'chip chip-alert'}
            aria-pressed={onlyLow}
            onClick={() => setOnlyLow((current) => !current)}
          >
            Solo alertas
          </button>
        </div>
      </section>

      {formOpen && (
        <ProductForm
          onCancel={() => setFormOpen(false)}
          onSubmit={(product) => {
            addProduct(product)
            setFormOpen(false)
            setQuery('')
            setCategory('todas')
            setOnlyLow(false)
          }}
        />
      )}

      <p className="result-count" aria-live="polite">
        {visible.length === 1 ? '1 producto' : `${visible.length} productos`}
        {summary.alerts > 0 ? ` · ${summary.alerts} con alerta` : ''}
      </p>

      {visible.length === 0 ? (
        <div className="empty">
          <h2>Nada coincide con ese filtro</h2>
          <p>Prueba con otro nombre o limpia la búsqueda para ver la sala completa.</p>
          {filtersActive && (
            <button
              type="button"
              className="button button-ghost"
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
      ) : (
        <ul className="product-list">
          {visible.map((product) => {
            const info = categoryById(product.categoria)
            const status = stockStatus(product)
            const confirming = confirmId === product.id
            return (
              <li key={product.id}>
                <article className={`product is-${status}`}>
                  <div className="product-main">
                    <div className="product-title">
                      <h2>{product.nombre}</h2>
                      <span className={`pill tone-${info.tone}`}>{info.label}</span>
                      <span className={`status status-${status}`}>{statusLabel(status)}</span>
                    </div>
                    <p>
                      {locationLabel(product.pasillo)} · {formatCLP(product.precio)} · mínimo {product.minimo}{' '}
                      {product.unidad}
                    </p>
                  </div>
                  <div className="stepper" aria-label={`Stock de ${product.nombre}`}>
                    <button
                      type="button"
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
                      onClick={() => adjustStock(product.id, 1)}
                      aria-label={`Sumar una unidad de ${product.nombre}`}
                    >
                      +
                    </button>
                  </div>
                  {confirming ? (
                    <div className="confirm">
                      <span>¿Quitar de la sala?</span>
                      <button type="button" onClick={() => removeProduct(product.id)}>
                        Sí, eliminar
                      </button>
                      <button type="button" onClick={() => setConfirmId(null)}>
                        No
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="link-danger" onClick={() => setConfirmId(product.id)}>
                      Eliminar
                    </button>
                  )}
                </article>
              </li>
            )
          })}
        </ul>
      )}

      <div className="restore">
        <button type="button" onClick={restoreCatalog}>
          Restaurar catálogo de demostración
        </button>
        <p>Los movimientos quedan guardados en este navegador.</p>
      </div>
    </div>
  )
}
