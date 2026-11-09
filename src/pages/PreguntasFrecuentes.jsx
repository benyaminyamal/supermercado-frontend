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
      'En Inicio, cada producto muestra su estado. “En sala” está sobre el mínimo. “Stock bajo” todavía se puede vender, pero ya hay que reponer. “Agotado” está en cero y no se ofrece en góndola ni en despacho. La tabla de Artículos en inventario muestra el mismo estado.',
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
      'En el menú de inventario, abre Ingresar artículo. Completa nombre, marca, tipo de producto y los datos de sala. Al guardar, entra al listado y también al inicio. Si el stock no supera el mínimo, queda en alerta.',
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
    <div className="row g-3">
      <div className="col-lg-8">
        <div className="card shadow-sm">
          <div className="card-body">
            <p className="lead mb-0">
              Respuestas para comprar en Abasto y para usar el inventario de la Sala Ñuñoa. Si la
              duda es de un producto puntual, el equipo de sala lo revisa en Inicio.
            </p>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <aside className="card shadow-sm h-100">
          <div className="card-body">
            <p className="mb-0 text-secondary">
              Horario de caja: todos los días hasta el cierre de la sala. Consultas de pedido: mesón
              de servicio, pasillo 1.
            </p>
          </div>
        </aside>
      </div>
      <div className="col-12">
        <div className="accordion shadow-sm">
          {FAQS.map((item) => {
            const open = openId === item.id
            return (
              <article className="accordion-item" key={item.id}>
                <h2 className="accordion-header">
                  <button
                    type="button"
                    className={`accordion-button${open ? '' : ' collapsed'}`}
                    aria-expanded={open}
                    aria-controls={`respuesta-${item.id}`}
                    id={`pregunta-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    {item.question}
                  </button>
                </h2>
                {open && (
                  <div className="accordion-collapse show">
                    <p className="accordion-body mb-0" id={`respuesta-${item.id}`}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
