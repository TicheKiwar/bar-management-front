import React, { useEffect, useState } from "react";
import { useProductosStore } from "../../index";
import styled from "styled-components";
import CarritoModal from "./CarritoModal";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { InsertarOrden } from "../../index";

// Componente ProductCardBar integrado (podrías moverlo a un archivo aparte luego)
const ProductCardBar = ({
  nombre,
  precio,
  img,
  descripcion,
  volumen,
  onAddToCart
}) => {
  const [cantidad, setCantidad] = useState(1);

  const handleAdd = () => {
    onAddToCart({
      nombre,
      precio,
      cantidad,
      codigo: descripcion
    });
  };

  return (
    <CardContainer>
      <ProductImage
        src={img || '/placeholder.jpg'}
        alt={nombre}
        onError={(e) => e.target.src = '/placeholder.jpg'}
      />
      <ProductName>{nombre}</ProductName>
      {volumen && <ProductVolume>{volumen}</ProductVolume>}
      <ProductCode>Cod-Borros: {descripcion}</ProductCode>
      <ProductPrice>S/{precio.toFixed(2)}</ProductPrice>

      <QuantityContainer>
        <QuantityButton onClick={() => setCantidad(Math.max(1, cantidad - 1))}>
          -
        </QuantityButton>
        <QuantityValue>{cantidad}</QuantityValue>
        <QuantityButton onClick={() => setCantidad(cantidad + 1)}>
          +
        </QuantityButton>
      </QuantityContainer>

      <AddButton onClick={handleAdd}>
        Añadir al carrito
      </AddButton>
    </CardContainer>
  );
};

// Componente principal BarMenu
const BarMenu = () => {
  const { dataproductos, mostrarProductos } = useProductosStore((state) => ({
    dataproductos: state.dataproductos,
    mostrarProductos: state.mostrarProductos,
  }));


  const [carrito, setCarrito] = useState([]);
  const [showCarrito, setShowCarrito] = useState(false);
  const [compraExitosa, setCompraExitosa] = useState(false);

  useEffect(() => {
    mostrarProductos({ _id_empresa: 1 });
  }, [mostrarProductos]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.codigo === producto.codigo);
      if (existe) {
        return prev.map(item =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + producto.cantidad }
            : item
        );
      }
      return [...prev, producto];
    });
  };

  const removerDelCarrito = (codigo) => {
    setCarrito(prev => prev.filter(item => item.codigo !== codigo));
  };

  const actualizarCantidad = (codigo, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    
    setCarrito(prev => 
      prev.map(item => 
        item.codigo === codigo 
          ? { ...item, cantidad: nuevaCantidad } 
          : item
      )
    );
  };

  const realizarCompra = async (clienteData) => {
    await InsertarOrden({
      carrito,
      clienteData,
    });

    console.log("Compra realizada:", { carrito, clienteData });
    
    // Mostrar mensaje de éxito
    setCompraExitosa(true);
    
    // Limpiar carrito después de 2 segundos
    setTimeout(() => {
      setCarrito([]);
      setShowCarrito(false);
      setCompraExitosa(false);
    }, 2000);
  };

  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);


  return (
    <div>
      <Title>Menú BarMaster</Title>
      
      <CartButton onClick={() => setShowCarrito(true)}>
        <FaShoppingCart />
        {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
      </CartButton>
      
      {showCarrito && (
        <CarritoModal 
          carrito={carrito}
          onClose={() => setShowCarrito(false)}
          onRemoveItem={removerDelCarrito}
          onUpdateQuantity={actualizarCantidad}
          onCheckout={realizarCompra}
        />
      )}
      
      {compraExitosa && (
        <SuccessMessage>
          ¡Compra realizada con éxito! Redirigiendo...
        </SuccessMessage>
      )}
      
      <BarMenuContainer>
        {dataproductos && dataproductos.length > 0 ? (
          dataproductos.map((producto) => (
            <ProductCardBar
              key={producto.id || producto.codigobarras}
              nombre={producto.descripcion}
              precio={producto.precioventa}
              img={producto.image}
              descripcion={producto.codigobarras}
              volumen={producto.volumen}
              onAddToCart={agregarAlCarrito}
            />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </BarMenuContainer>
    </div>
  );
};

// Estilos adicionales para el botón del carrito
const CartButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
`;

const SuccessMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #28a745;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

// Estilos
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
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: #333;
`;

const ProductVolume = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0;
`;

const ProductCode = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0.5rem 0;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 0.5rem 0 1rem 0;
`;

const QuantityContainer = styled.div`
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

const QuantityValue = styled.span`
  font-weight: bold;
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
  transition: background 0.3s;

  &:hover {
    background: #218838;
  }
`;

const CartInfo = styled.div`
  text-align: center;
  margin: 1rem 0;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
  font-weight: bold;
`;

const BarMenuContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color: rgb(119, 93, 13);
  margin-top: 3rem;
  text-transform: uppercase;
`;

export default BarMenu;