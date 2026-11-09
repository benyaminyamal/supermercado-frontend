export default function QuienesSomos() {
  return (
    <article className="story">
      <p className="lead">
        Abasto es una cadena de supermercados de barrio. La sala se abre con la verdura del día ya
        puesta, el precio escrito en la góndola y el inventario cuadrado con lo que realmente hay
        para vender.
      </p>

      <blockquote>
        Si no está en el inventario, no está en la sala. Y si está en la sala, el cliente tiene que
        encontrarlo sin preguntar.
      </blockquote>

      <ul className="figures">
        <li>
          <strong>1998</strong>
          <span>Primera sala en Ñuñoa</span>
        </li>
        <li>
          <strong>36</strong>
          <span>Salas entre Santiago y el sur</span>
        </li>
        <li>
          <strong>2</strong>
          <span>Centros de distribución</span>
        </li>
        <li>
          <strong>980</strong>
          <span>Personas en sala y bodega</span>
        </li>
      </ul>

      <section>
        <h2>De la feria a la sala</h2>
        <p>
          Abasto partió en 1998, en un local de Ñuñoa, cuando una familia del barrio decidió pasar
          la feria de la semana a una sala con horarios fijos. El criterio no cambió al abrir más
          locales: cada sala compra fresco cerca, marca el precio antes de reponer y no ofrece lo
          que la bodega no puede respaldar.
        </p>
        <p>
          Hoy las salas están en la Región Metropolitana y en el sur. Los centros de distribución
          de Quilicura y Temuco abastecen abarrotes, limpieza y bebidas. Pan, carnes y verdura se
          reciben en la mañana, directo en cada local, y entran al inventario antes de las 9:00.
        </p>
      </section>

      <section>
        <h2>Cómo se trabaja la sala</h2>
        <div className="principles">
          <article>
            <h3>Fresco con hora</h3>
            <p>
              La reposición de verdulería, panadería y carnicería termina antes de abrir. Lo que
              llega tarde no se mezcla con lo del día anterior.
            </p>
          </article>
          <article>
            <h3>Precio a la vista</h3>
            <p>
              Cada producto sale a góndola con precio y unidad. Si el precio cambia, se actualiza
              el inventario y el cartel juntos.
            </p>
          </article>
          <article>
            <h3>Stock que se puede creer</h3>
            <p>
              El mínimo de cada producto avisa cuando hay que pedir. Cero unidades significa
              agotado: no se promete en caja ni en despacho.
            </p>
          </article>
        </div>
      </section>

      <section className="note">
        <h2>Esta aplicación</h2>
        <p>
          El inicio es el tablero de la Sala Ñuñoa. Desde ahí el equipo suma o resta unidades,
          revisa lo que está bajo el mínimo y registra un producto nuevo antes de dejarlo en
          góndola. Quiénes somos y Preguntas frecuentes explican la cadena y la forma de comprar;
          el menú inferior permite moverse entre las tres pantallas sin salir del sitio.
        </p>
      </section>
    </article>
  )
}
