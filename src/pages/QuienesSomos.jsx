export default function QuienesSomos() {
  return (
    <article className="card shadow-sm">
      <div className="card-body">
        <p className="lead">
          Abasto es una cadena de supermercados de barrio. La idea es simple: lo que está en la
          góndola tiene que coincidir con el inventario, con el precio escrito y la verdura del día
          ya puesta cuando abre la sala.
        </p>

        <ul className="row g-3 list-unstyled">
          <li className="col-6 col-lg-3">
            <div className="bg-body-tertiary rounded-3 p-3 h-100">
              <strong className="fs-3 fw-bold d-block">1998</strong>
              <span className="text-secondary">Primera sala en Ñuñoa</span>
            </div>
          </li>
          <li className="col-6 col-lg-3">
            <div className="bg-body-tertiary rounded-3 p-3 h-100">
              <strong className="fs-3 fw-bold d-block">36</strong>
              <span className="text-secondary">Salas entre Santiago y el sur</span>
            </div>
          </li>
          <li className="col-6 col-lg-3">
            <div className="bg-body-tertiary rounded-3 p-3 h-100">
              <strong className="fs-3 fw-bold d-block">2</strong>
              <span className="text-secondary">Centros de distribución</span>
            </div>
          </li>
          <li className="col-6 col-lg-3">
            <div className="bg-body-tertiary rounded-3 p-3 h-100">
              <strong className="fs-3 fw-bold d-block">980</strong>
              <span className="text-secondary">Personas en sala y bodega</span>
            </div>
          </li>
        </ul>

        <section className="mt-4">
          <h2 className="h4">De la feria a la sala</h2>
          <p>
            Abasto partió en 1998, en un local de Ñuñoa, cuando una familia del barrio decidió pasar
            la feria de la semana a una sala con horarios fijos. El criterio no cambió al abrir más
            locales: cada sala compra fresco cerca, marca el precio antes de reponer y no ofrece lo
            que la bodega no puede respaldar.
          </p>
          <p className="mb-0">
            Hoy las salas están en la Región Metropolitana y en el sur. Los centros de distribución
            de Quilicura y Temuco abastecen abarrotes, limpieza y bebidas. Pan, carnes y verdura se
            reciben en la mañana, directo en cada local, y entran al inventario antes de las 9:00.
          </p>
        </section>

        <section className="mt-4">
          <h2 className="h4">Cómo se trabaja la sala</h2>
          <div className="row g-3">
            <article className="col-md-4">
              <div className="bg-body-tertiary rounded-3 p-3 h-100">
                <h3 className="h5">Fresco con hora</h3>
                <p className="mb-0">
                  La reposición de verdulería, panadería y carnicería termina antes de abrir. Lo que
                  llega tarde no se mezcla con lo del día anterior.
                </p>
              </div>
            </article>
            <article className="col-md-4">
              <div className="bg-body-tertiary rounded-3 p-3 h-100">
                <h3 className="h5">Precio a la vista</h3>
                <p className="mb-0">
                  Cada producto sale a góndola con precio y unidad. Si el precio cambia, se actualiza
                  el inventario y el cartel juntos.
                </p>
              </div>
            </article>
            <article className="col-md-4">
              <div className="bg-body-tertiary rounded-3 p-3 h-100">
                <h3 className="h5">Stock que se puede creer</h3>
                <p className="mb-0">
                  El mínimo de cada producto avisa cuando hay que pedir. Cero unidades significa
                  agotado: no se promete en caja ni en despacho.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="alert alert-success mt-4 mb-0">
          <h2 className="h5">Esta aplicación</h2>
          <p className="mb-0">
            El inicio es el tablero de la Sala Ñuñoa. El menú de inventario abre el ingreso de
            artículos, la tabla con filtro por categoría, el detalle y el carrito. Lo que se agrega
            al carrito se descuenta del stock. El menú inferior sigue hacia Quiénes somos y
            Preguntas frecuentes.
          </p>
        </section>
      </div>
    </article>
  )
}
