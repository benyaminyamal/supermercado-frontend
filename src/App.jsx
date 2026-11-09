import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { InventoryProvider } from './context/InventoryContext'
import Home from './pages/Home'
import PreguntasFrecuentes from './pages/PreguntasFrecuentes'
import QuienesSomos from './pages/QuienesSomos'

export default function App() {
  return (
    <BrowserRouter>
      <InventoryProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quienes-somos" element={<QuienesSomos />} />
            <Route path="preguntas-frecuentes" element={<PreguntasFrecuentes />} />
          </Route>
        </Routes>
      </InventoryProvider>
    </BrowserRouter>
  )
}
