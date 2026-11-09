import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SEED_PRODUCTS } from '../data/catalog'

const STORAGE_KEY = 'abasto-inventario-v1'

const InventoryContext = createContext(null)

function cloneSeed() {
  return SEED_PRODUCTS.map((product) => ({ ...product }))
}

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return cloneSeed()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed) || parsed.length === 0) return cloneSeed()
    return parsed
  } catch {
    return cloneSeed()
  }
}

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(loadProducts)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const value = useMemo(() => {
    function addProduct(product) {
      setProducts((current) => [product, ...current])
    }

    function adjustStock(id, delta) {
      setProducts((current) =>
        current.map((product) => {
          if (product.id !== id) return product
          return { ...product, stock: Math.max(0, product.stock + delta) }
        }),
      )
    }

    function removeProduct(id) {
      setProducts((current) => current.filter((product) => product.id !== id))
    }

    function restoreCatalog() {
      setProducts(cloneSeed())
    }

    return { products, addProduct, adjustStock, removeProduct, restoreCatalog }
  }, [products])

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventory debe usarse dentro de InventoryProvider')
  }
  return context
}
