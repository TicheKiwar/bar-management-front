import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos (podrías moverlos a styles.js si prefieres)
const CardContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  width: 250px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductName = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
`;

const ProductDetails = styled.div`
  margin: 0.5rem 0;
`;

const CodeText = styled.span`
  font-size: 0.9rem;
  color: #666;
  &::before {
    content: "Cod-Borros: ";
  }
`;

const PriceText = styled.span`
  display: block;
  font-weight: bold;
  margin-top: 0.5rem;
  &::before {
    content: "S/";
    margin-right: 2px;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem;
`;

const QuantityButton = styled.button`
  background: #f5f5f5;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
`;

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const ProductCardBar = ({ nombre, precio, img, descripcion, volumen }) => {
  const [cantidad, setCantidad] = useState(1);

  return (
    <CardContainer>
      <ProductImage src={img || '/placeholder.jpg'} alt={nombre} />
      <ProductName>{nombre}</ProductName>
      
      {volumen && <ProductDetails>{volumen}</ProductDetails>}
      
      <ProductDetails>
        <CodeText>{descripcion}</CodeText>
        <PriceText>{precio.toFixed(2)}</PriceText>
      </ProductDetails>

      <QuantityControls>
        <QuantityButton onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</QuantityButton>
        <span>{cantidad}</span>
        <QuantityButton onClick={() => setCantidad(cantidad + 1)}>+</QuantityButton>
      </QuantityControls>

      <AddButton onClick={() => console.log('Añadir al carrito:', nombre, cantidad)}>
        Añadir al carrito
      </AddButton>
    </CardContainer>
  );
};

export default ProductCardBar;