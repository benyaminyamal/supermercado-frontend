const clp = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
})

export function formatCLP(value) {
  return clp.format(value)
}

export function stockStatus(product) {
  if (product.stock <= 0) return 'out'
  if (product.stock <= product.minimo) return 'low'
  return 'ok'
}

export function statusLabel(status) {
  if (status === 'out') return 'Agotado'
  if (status === 'low') return 'Stock bajo'
  return 'En sala'
}

export function locationLabel(pasillo) {
  const value = String(pasillo).trim()
  return /^\d+$/.test(value) ? `Pasillo ${value}` : value
}

export function normalizeText(value) {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
}
