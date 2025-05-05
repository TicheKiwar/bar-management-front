import styled from 'styled-components';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import React, { useState } from 'react';


const CarritoModal = ({ 
  carrito, 
  onClose, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout 
}) => {
  const [clienteData, setClienteData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    direccion: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    onCheckout(clienteData);
    // Aquí podrías resetear el formulario si lo deseas
  };

  const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
        
        <ModalTitle>
          <FaShoppingCart /> Carrito de Compras
        </ModalTitle>
        
        <ModalContent>
          <ProductosSection>
            <SectionTitle>Productos seleccionados</SectionTitle>
            {carrito.length === 0 ? (
              <EmptyCart>El carrito está vacío</EmptyCart>
            ) : (
              <ProductosList>
                {carrito.map((item, index) => (
                  <ProductoItem key={index}>
                    <ProductoInfo>
                      <ProductoNombre>{item.nombre}</ProductoNombre>
                      <ProductoPrecio>S/{item.precio.toFixed(2)} x {item.cantidad}</ProductoPrecio>
                    </ProductoInfo>
                    <ProductoActions>
                      <CantidadControl>
                        <CantidadButton 
                          onClick={() => onUpdateQuantity(item.codigo, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </CantidadButton>
                        <CantidadValue>{item.cantidad}</CantidadValue>
                        <CantidadButton 
                          onClick={() => onUpdateQuantity(item.codigo, item.cantidad + 1)}
                        >
                          +
                        </CantidadButton>
                      </CantidadControl>
                      <EliminarButton onClick={() => onRemoveItem(item.codigo)}>
                        Eliminar
                      </EliminarButton>
                    </ProductoActions>
                  </ProductoItem>
                ))}
              </ProductosList>
            )}
            <TotalContainer>
              <TotalLabel>Total:</TotalLabel>
              <TotalAmount>S/{total.toFixed(2)}</TotalAmount>
            </TotalContainer>
          </ProductosSection>
          
          <ClienteSection>
            <SectionTitle>Datos del Cliente</SectionTitle>
            <FormGroup>
              <Label>Nombre completo</Label>
              <Input 
                type="text" 
                name="nombre" 
                value={clienteData.nombre}
                onChange={handleInputChange}
                placeholder="Ingrese nombre completo"
              />
            </FormGroup>
            <FormGroup>
              <Label>DNI</Label>
              <Input 
                type="text" 
                name="dni" 
                value={clienteData.dni}
                onChange={handleInputChange}
                placeholder="Ingrese DNI"
              />
            </FormGroup>
            <FormGroup>
              <Label>Teléfono</Label>
              <Input 
                type="text" 
                name="telefono" 
                value={clienteData.telefono}
                onChange={handleInputChange}
                placeholder="Ingrese teléfono"
              />
            </FormGroup>
            <FormGroup>
              <Label>Dirección (opcional)</Label>
              <Input 
                type="text" 
                name="direccion" 
                value={clienteData.direccion}
                onChange={handleInputChange}
                placeholder="Ingrese dirección"
              />
            </FormGroup>
          </ClienteSection>
        </ModalContent>
        
        <CheckoutButton 
          onClick={handleCheckout}
          disabled={carrito.length === 0}
        >
          Realizar Compra
        </CheckoutButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

// Estilos para el modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
`;

const ModalTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

const ProductosSection = styled.div``;

const EmptyCart = styled.p`
  text-align: center;
  color: #666;
`;

const ProductosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProductoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
`;

const ProductoInfo = styled.div``;

const ProductoNombre = styled.p`
  font-weight: bold;
  margin: 0;
`;

const ProductoPrecio = styled.p`
  color: #666;
  margin: 0.5rem 0 0 0;
`;

const ProductoActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const CantidadControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CantidadButton = styled.button`
  width: 25px;
  height: 25px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CantidadValue = styled.span`
  min-width: 20px;
  text-align: center;
`;

const EliminarButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 2px solid #eee;
`;

const TotalLabel = styled.p`
  font-weight: bold;
  margin: 0;
`;

const TotalAmount = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
  color: #2c3e50;
`;

const ClienteSection = styled.div``;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 2rem;
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

export default CarritoModal;