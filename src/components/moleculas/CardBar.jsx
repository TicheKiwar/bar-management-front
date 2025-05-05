import styled from "styled-components";

export const ProductCardBar = ({ nombre, precio, img, descripcion }) => {
  return (
    <CardContainer>
      <div className="product-card">
        {img && <img src={img} alt={nombre} className="product-image" />}
        <div className="product-content">
          <h3 className="product-title">{nombre}</h3>
          <p className="product-description">Cod-Barras: {descripcion}</p>
          <p className="product-price">${precio}</p>
        </div>
      </div>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  .product-card {
    width: 230px; /* Ancho fijo para todas las tarjetas */
    height: 380px; /* Alto fijo para todas las tarjetas */
    background: #fffbe6;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid #d4af37;
    box-shadow: 0.4rem 0.4rem #a67c00;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s ease-in-out;
    overflow: hidden; /* Para asegurar que nada sobresalga */
  }

  .product-card:hover {
    transform: scale(1.03);
  }

  .product-image {
    width: 190px;
    height: 190px;
    object-fit: contain;
    margin-bottom: 0.75rem;
  }

  .product-content {
    text-align: center;
    flex-grow: 1; /* Asegura que el contenido ocupe todo el espacio disponible */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #4b3b0a;
    margin: 0;
  }

  .product-description {
    font-size: 0.9rem;
    color: #6e5c2d;
    margin: 0.5rem 0;
  }

  .product-price {
    font-size: 1.1rem;
    font-weight: 600;
    color: #a67c00;
  }
`;

