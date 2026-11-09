import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { SEED_PRODUCTS } from '../data/catalog'

const STORAGE_KEY = 'abasto-tienda-v1'
const LEGACY_KEY = 'abasto-inventario-v2'

const InventoryContext = createContext(null)

function cloneSeed() {
  return SEED_PRODUCTS.map((product) => ({ ...product }))
}

function normalizeProduct(product) {
  return {
    id: product.id,
    nombre: product.nombre ?? '',
    marca: product.marca ?? 'Sin marca',
    tipo: product.tipo ?? product.categoria ?? 'abarrotes',
    precio: Number(product.precio) || 0,
    stock: Number(product.stock) || 0,
    minimo: Number(product.minimo) || 0,
    pasillo: product.pasillo ?? '',
    unidad: product.unidad ?? 'un',
  }
}

function normalizeCart(cart, products) {
  if (!Array.isArray(cart)) return []
  const ids = new Set(products.map((product) => product.id))
  return cart
    .filter((item) => item && ids.has(item.id) && Number(item.cantidad) > 0)
    .map((item) => ({ id: item.id, cantidad: Math.floor(Number(item.cantidad)) }))
}

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
        const products = parsed.products.map(normalizeProduct)
        return { products, cart: normalizeCart(parsed.cart, products) }
      }
    }
    const legacy = localStorage.getItem(LEGACY_KEY)
    if (legacy) {
      const parsed = JSON.parse(legacy)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { products: parsed.map(normalizeProduct), cart: [] }
      }
    }
  } catch {
    return { products: cloneSeed(), cart: [] }
  }
  return { products: cloneSeed(), cart: [] }
}

export function InventoryProvider({ children }) {
  const [store, setStore] = useState(loadStore)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  }, [store])

  const value = useMemo(() => {
    function addProduct(product) {
      setStore((current) => ({
        ...current,
        products: [normalizeProduct(product), ...current.products],
      }))
    }

    function adjustStock(id, delta) {
      setStore((current) => ({
        ...current,
        products: current.products.map((product) => {
          if (product.id !== id) return product
          return { ...product, stock: Math.max(0, product.stock + delta) }
        }),
      }))
    }

    function removeProduct(id) {
      setStore((current) => ({
        products: current.products.filter((product) => product.id !== id),
        cart: current.cart.filter((item) => item.id !== id),
      }))
    }

    function restoreCatalog() {
      setStore({ products: cloneSeed(), cart: [] })
    }

    function addToCart(id, cantidad) {
      const requested = Math.floor(Number(cantidad))
      if (!Number.isInteger(requested) || requested < 1) return 0
      let taken = 0
      setStore((current) => {
        const product = current.products.find((item) => item.id === id)
        if (!product || product.stock <= 0) return current
        taken = Math.min(requested, product.stock)
        const already = current.cart.find((item) => item.id === id)
        const cart = already
          ? current.cart.map((item) =>
              item.id === id ? { ...item, cantidad: item.cantidad + taken } : item,
            )
          : [...current.cart, { id, cantidad: taken }]
        return {
          products: current.products.map((item) =>
            item.id === id ? { ...item, stock: item.stock - taken } : item,
          ),
          cart,
        }
      })
      return taken
    }

    function changeCartQuantity(id, delta) {
      setStore((current) => {
        const line = current.cart.find((item) => item.id === id)
        const product = current.products.find((item) => item.id === id)
        if (!line || !product || delta === 0) return current
        if (delta > 0) {
          if (product.stock <= 0) return current
          return {
            products: current.products.map((item) =>
              item.id === id ? { ...item, stock: item.stock - 1 } : item,
            ),
            cart: current.cart.map((item) =>
              item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item,
            ),
          }
        }
        const nextQuantity = line.cantidad - 1
        return {
          products: current.products.map((item) =>
            item.id === id ? { ...item, stock: item.stock + 1 } : item,
          ),
          cart:
            nextQuantity <= 0
              ? current.cart.filter((item) => item.id !== id)
              : current.cart.map((item) =>
                  item.id === id ? { ...item, cantidad: nextQuantity } : item,
                ),
        }
      })
    }

    function removeFromCart(id) {
      setStore((current) => {
        const line = current.cart.find((item) => item.id === id)
        if (!line) return current
        return {
          products: current.products.map((item) =>
            item.id === id ? { ...item, stock: item.stock + line.cantidad } : item,
          ),
          cart: current.cart.filter((item) => item.id !== id),
        }
      })
    }

    return {
      products: store.products,
      cart: store.cart,
      addProduct,
      adjustStock,
      removeProduct,
      restoreCatalog,
      addToCart,
      changeCartQuantity,
      removeFromCart,
    }
  }, [store])

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>
}

export function useInventory() {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventory debe usarse dentro de InventoryProvider')
  }
  return context
}
