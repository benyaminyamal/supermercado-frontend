import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORIES, categoryById } from '../data/catalog'
import { useInventory } from '../context/InventoryContext'
import { formatCLP, locationLabel, statusLabel, stockStatus } from '../utils/format'

const STATUS_BADGE = {
  ok: 'text-bg-success',
  low: 'text-bg-warning',
  out: 'text-bg-danger',
}

function filtrarPorCategoria(inventario, categoria) {
  if (categoria === 'todas') return inventario
  return inventario.filter((articulo) => articulo.tipo === categoria)
}

export default function ListadoArticulos() {
  const { products } = useInventory()
  const navigate = useNavigate()
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas')
  const [articulosVisibles, setArticulosVisibles] = useState(products)

  useEffect(() => {
    setArticulosVisibles(filtrarPorCategoria(products, categoriaSeleccionada))
  }, [products, categoriaSeleccionada])

  const vacio = products.length === 0
  const sinResultados = !vacio && articulosVisibles.length === 0

  return (
    <section className="card shadow-sm">
      <div className="card-body d-flex flex-wrap justify-content-between align-items-end gap-3 pb-0">
        <div className="category-filter">
          <label className="form-label" htmlFor="categoria">
            Categoría
          </label>
          <select
            id="categoria"
            className="form-select"
            value={categoriaSeleccionada}
            onChange={(event) => setCategoriaSeleccionada(event.target.value)}
          >
            <option value="todas">Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <Link to="/ingresar" className="btn btn-primary">
          Ingresar artículo
        </Link>
      </div>
      <p className="text-secondary px-3 mt-3 mb-0" aria-live="polite">
        {articulosVisibles.length === 1 ? '1 artículo' : `${articulosVisibles.length} artículos`} en
        pantalla · {products.length} en el inventario
      </p>
      <div className="table-responsive mt-3">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Marca</th>
              <th scope="col">Tipo</th>
              <th scope="col">Ubicación</th>
              <th scope="col" className="text-end">
                Precio
              </th>
              <th scope="col" className="text-end">
                Stock
              </th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {vacio ? (
              <tr>
                <td colSpan={7} className="text-center text-secondary py-5">
                  No hay artículos en el inventario. <Link to="/ingresar">Ingresa el primero</Link>.
                </td>
              </tr>
            ) : sinResultados ? (
              <tr>
                <td colSpan={7} className="text-center text-secondary py-5">
                  Ningún artículo de esta categoría. El inventario completo sigue guardado.
                </td>
              </tr>
            ) : (
              articulosVisibles.map((product) => {
                const tipo = categoryById(product.tipo)
                const status = stockStatus(product)
                return (
                  <tr
                    key={product.id}
                    className="is-clickable"
                    onClick={() => navigate(`/articulos/${product.id}`)}
                  >
                    <th scope="row">
                      <Link
                        to={`/articulos/${product.id}`}
                        className="link-dark"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {product.nombre}
                      </Link>
                    </th>
                    <td>{product.marca}</td>
                    <td>{tipo.label}</td>
                    <td>{locationLabel(product.pasillo)}</td>
                    <td className="text-end">{formatCLP(product.precio)}</td>
                    <td className="text-end">
                      {product.stock} {product.unidad}
                    </td>
                    <td>
                      <span className={`badge ${STATUS_BADGE[status]}`}>{statusLabel(status)}</span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
