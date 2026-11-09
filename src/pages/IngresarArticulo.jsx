import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import { useInventory } from '../context/InventoryContext'

export default function IngresarArticulo() {
  const { addProduct } = useInventory()
  const [saved, setSaved] = useState(null)

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        {saved && (
          <div className="alert alert-success" role="status">
            <strong>{saved}</strong> quedó en el inventario.{' '}
            <Link to="/articulos" className="alert-link">
              Ver el listado
            </Link>
          </div>
        )}
        <ProductForm
          onSubmit={(product) => {
            addProduct(product)
            setSaved(product.nombre)
          }}
        />
      </div>
    </div>
  )
}
