import { useState } from 'react'

const FAQS = [
  {
    id: 'horario',
    question: '¿A qué hora abren las salas?',
    answer:
      'De lunes a sábado de 8:30 a 22:00. Los domingos y festivos, de 9:00 a 21:00. La reposición de frescos empieza antes de la apertura, así la verdulería ya está completa cuando entra el primer cliente.',
  },
  {
    id: 'despacho',
    question: '¿Hacen despacho a domicilio?',
    answer:
      'Sí, en las comunas donde la sala tiene reparto. El pedido se arma con el stock de esa sala: si el inventario marca unidades, se pueden reservar. El despacho del mismo día cierra a las 18:00.',
  },
  {
    id: 'pago',
    question: '¿Qué medios de pago aceptan?',
    answer:
      'Efectivo, tarjetas de débito y crédito, y transferencia en caja. Sobre $20.000, algunas tarjetas permiten hasta 3 cuotas sin interés, según la sala y la promoción vigente.',
  },
  {
    id: 'cambios',
    question: '¿Puedo cambiar o devolver un producto?',
    answer:
      'Los envasados se cambian dentro de 10 días con boleta, si están cerrados. Frescos, lácteos abiertos y carnes no tienen cambio, salvo que lleguen en mal estado: en ese caso la sala los repone el mismo día.',
  },
  {
    id: 'stock',
    question: '¿Cómo sé si queda stock de un producto?',
    answer:
      'En Inicio, cada producto muestra su estado. “En sala” está sobre el mínimo. “Stock bajo” todavía se puede vender, pero ya hay que reponer. “Agotado” está en cero y no se ofrece en góndola ni en despacho.',
  },
  {
    id: 'ajuste',
    question: '¿Qué hacen los botones de sumar y restar?',
    answer:
      'Ajustan las unidades de esta sala de una en una. Sirven cuando llega un bulto, se vende en caja o se retira un producto dañado. El stock mínimo no cambia con esos botones.',
  },
  {
    id: 'guardar',
    question: '¿Se pierden los cambios si cierro el navegador?',
    answer:
      'No. El inventario queda guardado en este navegador. Si otra persona abre la aplicación en otro equipo, verá el catálogo de demostración hasta que registre sus propios movimientos.',
  },
  {
    id: 'nuevo',
    question: '¿Cómo agrego un producto que acaba de entrar?',
    answer:
      'En Inicio, usa “Agregar producto”. Completa nombre, categoría, precio, stock, mínimo, ubicación y unidad. Al guardar, queda al comienzo de la lista y entra en las alertas si el stock no supera el mínimo.',
  },
  {
    id: 'tarjeta',
    question: '¿Tienen tarjeta de cliente?',
    answer:
      'Abasto Barrio acumula un 1% de la boleta como saldo para la compra siguiente. Se pide en caja con el carnet y no tiene costo de emisión. El saldo se usa al pagar y no modifica el inventario.',
  },
]

export default function PreguntasFrecuentes() {
  const [openId, setOpenId] = useState(FAQS[0].id)

  return (
    <div className="faq">
      <div className="faq-intro">
        <p className="lead">
          Respuestas para comprar en Abasto y para usar el inventario de la Sala Ñuñoa. Si la duda
          es de un producto puntual, el equipo de sala lo revisa en Inicio.
        </p>
        <p className="faq-aside">
          Horario de caja: todos los días hasta el cierre de la sala. Consultas de pedido:
          mesón de servicio, pasillo 1.
        </p>
      </div>

      <div className="accordion">
        {FAQS.map((item) => {
          const open = openId === item.id
          return (
            <article key={item.id} className={open ? 'faq-item is-open' : 'faq-item'}>
              <h2>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`respuesta-${item.id}`}
                  id={`pregunta-${item.id}`}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  {item.question}
                  <span aria-hidden="true">{open ? '−' : '+'}</span>
                </button>
              </h2>
              {open && <p id={`respuesta-${item.id}`}>{item.answer}</p>}
            </article>
          )
        })}
      </div>
    </div>
  )
}
