import { useState } from 'react'
import { CATEGORIES, UNITS } from '../data/catalog'

const EMPTY = {
  nombre: '',
  categoria: 'abarrotes',
  precio: '',
  stock: '',
  minimo: '',
  pasillo: '',
  unidad: 'un',
}

function digits(value) {
  return /^\d+$/.test(value.trim()) ? Number(value.trim()) : null
}

export default function ProductForm({ onSubmit, onCancel }) {
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
    const pasillo = fields.pasillo.trim()
    const precio = digits(fields.precio)
    const stock = digits(fields.stock)
    const minimo = digits(fields.minimo)

    if (nombre.length < 2) nextErrors.nombre = 'Escribe el nombre del producto.'
    if (precio === null || precio <= 0) nextErrors.precio = 'Indica un precio en pesos, sin puntos.'
    if (stock === null) nextErrors.stock = 'El stock inicial tiene que ser un número entero.'
    if (minimo === null) nextErrors.minimo = 'El mínimo tiene que ser un número entero.'
    if (pasillo.length < 1) nextErrors.pasillo = 'Indica el pasillo o la sección.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const order = ['nombre', 'precio', 'pasillo', 'stock', 'minimo']
      const first = order.find((field) => nextErrors[field])
      event.currentTarget.elements.namedItem(first)?.focus()
      return
    }

    onSubmit({
      id: `sku-${crypto.randomUUID()}`,
      nombre,
      categoria: fields.categoria,
      precio,
      stock,
      minimo,
      pasillo,
      unidad: fields.unidad,
    })
  }

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <div className="panel-head">
        <h2>Nuevo producto</h2>
        <p>Queda registrado en el inventario de esta sala.</p>
      </div>
      <div className="form-grid">
        <label className="wide">
          Nombre
          <input
            name="nombre"
            value={fields.nombre}
            onChange={(event) => update('nombre', event.target.value)}
            aria-invalid={Boolean(errors.nombre)}
            maxLength={60}
            placeholder="Ej. Mermelada de damasco 250 g"
          />
          {errors.nombre && <small>{errors.nombre}</small>}
        </label>
        <label>
          Categoría
          <select
            value={fields.categoria}
            onChange={(event) => update('categoria', event.target.value)}
          >
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Unidad
          <select value={fields.unidad} onChange={(event) => update('unidad', event.target.value)}>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </label>
        <label>
          Precio (CLP)
          <input
            name="precio"
            inputMode="numeric"
            value={fields.precio}
            onChange={(event) => update('precio', event.target.value)}
            aria-invalid={Boolean(errors.precio)}
            placeholder="1290"
          />
          {errors.precio && <small>{errors.precio}</small>}
        </label>
        <label>
          Ubicación
          <input
            name="pasillo"
            value={fields.pasillo}
            onChange={(event) => update('pasillo', event.target.value)}
            aria-invalid={Boolean(errors.pasillo)}
            placeholder="4 o Verdulería"
          />
          {errors.pasillo && <small>{errors.pasillo}</small>}
        </label>
        <label>
          Stock inicial
          <input
            name="stock"
            inputMode="numeric"
            value={fields.stock}
            onChange={(event) => update('stock', event.target.value)}
            aria-invalid={Boolean(errors.stock)}
            placeholder="12"
          />
          {errors.stock && <small>{errors.stock}</small>}
        </label>
        <label>
          Stock mínimo
          <input
            name="minimo"
            inputMode="numeric"
            value={fields.minimo}
            onChange={(event) => update('minimo', event.target.value)}
            aria-invalid={Boolean(errors.minimo)}
            placeholder="8"
          />
          {errors.minimo && <small>{errors.minimo}</small>}
        </label>
      </div>
      <div className="form-actions">
        <button type="button" className="button button-ghost" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="button button-primary">
          Guardar producto
        </button>
      </div>
    </form>
  )
}
