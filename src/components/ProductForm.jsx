import { useState } from 'react'
import { CATEGORIES, UNITS } from '../data/catalog'

const EMPTY = {
  nombre: '',
  marca: '',
  tipo: 'abarrotes',
  precio: '',
  stock: '',
  minimo: '',
  pasillo: '',
  unidad: 'un',
}

function digits(value) {
  return /^\d+$/.test(value.trim()) ? Number(value.trim()) : null
}

export default function ProductForm({ onSubmit }) {
  const [fields, setFields] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  function update(name, value) {
    setFields((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    const nombre = fields.nombre.trim()
    const marca = fields.marca.trim()
    const pasillo = fields.pasillo.trim()
    const precio = digits(fields.precio)
    const stock = digits(fields.stock)
    const minimo = digits(fields.minimo)

    if (nombre.length < 2) nextErrors.nombre = 'Escribe el nombre del artículo.'
    if (marca.length < 2) nextErrors.marca = 'Escribe la marca.'
    if (!fields.tipo) nextErrors.tipo = 'Elige el tipo de producto.'
    if (precio === null || precio <= 0) nextErrors.precio = 'Indica un precio en pesos, sin puntos.'
    if (stock === null) nextErrors.stock = 'El stock inicial tiene que ser un número entero.'
    if (minimo === null) nextErrors.minimo = 'El mínimo tiene que ser un número entero.'
    if (pasillo.length < 1) nextErrors.pasillo = 'Indica el pasillo o la sección.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const order = ['nombre', 'marca', 'tipo', 'precio', 'pasillo', 'stock', 'minimo']
      const first = order.find((field) => nextErrors[field])
      event.currentTarget.elements.namedItem(first)?.focus()
      return
    }

    onSubmit({
      id: `sku-${crypto.randomUUID()}`,
      nombre,
      marca,
      tipo: fields.tipo,
      precio,
      stock,
      minimo,
      pasillo,
      unidad: fields.unidad,
    })
    setFields(EMPTY)
    setErrors({})
  }

  return (
    <form className="card shadow-sm" onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className="card-body">
        <h2 className="h4 mb-1">Nuevo artículo</h2>
        <p className="text-secondary mb-4">
          El artículo queda en el estado global y aparece en el listado y en la góndola.
        </p>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label" htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              className={`form-control${errors.nombre ? ' is-invalid' : ''}`}
              value={fields.nombre}
              onChange={(event) => update('nombre', event.target.value)}
              aria-invalid={Boolean(errors.nombre)}
              maxLength={60}
              placeholder="Ej. Mermelada de damasco 250 g"
            />
            {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="marca">
              Marca
            </label>
            <input
              id="marca"
              name="marca"
              className={`form-control${errors.marca ? ' is-invalid' : ''}`}
              value={fields.marca}
              onChange={(event) => update('marca', event.target.value)}
              aria-invalid={Boolean(errors.marca)}
              maxLength={40}
              placeholder="Ej. Valle Sur"
            />
            {errors.marca && <div className="invalid-feedback">{errors.marca}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="tipo">
              Tipo de producto
            </label>
            <select
              id="tipo"
              name="tipo"
              className={`form-select${errors.tipo ? ' is-invalid' : ''}`}
              value={fields.tipo}
              onChange={(event) => update('tipo', event.target.value)}
              aria-invalid={Boolean(errors.tipo)}
            >
              {CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="precio">
              Precio (CLP)
            </label>
            <input
              id="precio"
              name="precio"
              className={`form-control${errors.precio ? ' is-invalid' : ''}`}
              inputMode="numeric"
              value={fields.precio}
              onChange={(event) => update('precio', event.target.value)}
              aria-invalid={Boolean(errors.precio)}
              placeholder="1290"
            />
            {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="unidad">
              Unidad
            </label>
            <select
              id="unidad"
              name="unidad"
              className="form-select"
              value={fields.unidad}
              onChange={(event) => update('unidad', event.target.value)}
            >
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="pasillo">
              Ubicación
            </label>
            <input
              id="pasillo"
              name="pasillo"
              className={`form-control${errors.pasillo ? ' is-invalid' : ''}`}
              value={fields.pasillo}
              onChange={(event) => update('pasillo', event.target.value)}
              aria-invalid={Boolean(errors.pasillo)}
              placeholder="4 o Verdulería"
            />
            {errors.pasillo && <div className="invalid-feedback">{errors.pasillo}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="stock">
              Stock inicial
            </label>
            <input
              id="stock"
              name="stock"
              className={`form-control${errors.stock ? ' is-invalid' : ''}`}
              inputMode="numeric"
              value={fields.stock}
              onChange={(event) => update('stock', event.target.value)}
              aria-invalid={Boolean(errors.stock)}
              placeholder="12"
            />
            {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="minimo">
              Stock mínimo
            </label>
            <input
              id="minimo"
              name="minimo"
              className={`form-control${errors.minimo ? ' is-invalid' : ''}`}
              inputMode="numeric"
              value={fields.minimo}
              onChange={(event) => update('minimo', event.target.value)}
              aria-invalid={Boolean(errors.minimo)}
              placeholder="8"
            />
            {errors.minimo && <div className="invalid-feedback">{errors.minimo}</div>}
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setFields(EMPTY)
              setErrors({})
            }}
          >
            Limpiar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar artículo
          </button>
        </div>
      </div>
    </form>
  )
}
