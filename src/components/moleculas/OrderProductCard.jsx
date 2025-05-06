import styled from "styled-components";

export const OrderDetailCard = ({ detalle }) => {
  const {
    image,
    descripcion,
    codigobarras,
    precioventa,
    cantidad,
    subtotal,
    nombre_cliente,
    dni_cliente,
    telefono_cliente,
    direccion_cliente,
    fecha_orden,
  } = detalle;

  return (
    <CardContainer>
      <div className="card-horizontal">
        <div className="image-container">
          <img src={image} alt={descripcion} />
        </div>
        <div className="info-container">
          <h3>{descripcion}</h3>
          <p><strong>Cod. Barras:</strong> {codigobarras}</p>
          <p><strong>Precio unitario:</strong> ${precioventa}</p>
          <p><strong>Cantidad:</strong> {cantidad}</p>
          <p><strong>Subtotal:</strong> ${subtotal}</p>
          <hr />
          <h4>Datos del cliente</h4>
          <p><strong>Nombre:</strong> {nombre_cliente}</p>
          <p><strong>DNI:</strong> {dni_cliente}</p>
          <p><strong>Teléfono:</strong> {telefono_cliente}</p>
          <p><strong>Dirección:</strong> {direccion_cliente}</p>
          <p><strong>Fecha:</strong> {new Date(fecha_orden).toLocaleString()}</p>
        </div>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  .card-horizontal {
    display: flex;
    border: 2px solid #d4af37;
    border-radius: 1rem;
    box-shadow: 0.4rem 0.4rem #a67c00;
    background: #fffbe6;
    overflow: hidden;
    margin: 1rem 0;
    max-width: 800px;
  }

  .image-container {
    flex: 0 0 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f6eec7;
    padding: 1rem;
  }

  .image-container img {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 0.5rem;
  }

  .info-container {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .info-container h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #4b3b0a;
  }

  .info-container h4 {
    margin-top: 0.5rem;
    font-size: 1.1rem;
    color: #6e5c2d;
  }

  .info-container p {
    margin: 0;
    font-size: 0.95rem;
    color: #333;
  }

  hr {
    margin: 0.5rem 0;
    border: none;
    border-top: 1px solid #ccc;
  }
`;
