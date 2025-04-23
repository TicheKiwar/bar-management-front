import React, { useEffect } from "react";
import { useProductosStore } from "../../index"; 
import { ProductCardBar } from "../../index"; 
import styled from "styled-components";

const BarMenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; /* Espacio entre las tarjetas */
  justify-content: center;
  padding: 6rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  color:rgb(119, 93, 13);
  margin-top: 3rem;
  text-transform: uppercase;
`;

const BarMenu = () => {
  const { dataproductos, mostrarProductos } = useProductosStore((state) => ({
    dataproductos: state.dataproductos,
    mostrarProductos: state.mostrarProductos,
  }));

  useEffect(() => {
    mostrarProductos({ _id_empresa: 1 });
  }, [mostrarProductos]);

  return (
    <div>
      <Title>Menú BarMaster</Title>
      <BarMenuContainer>
        {dataproductos && dataproductos.length > 0 ? (
          dataproductos.map((producto, index) => (
            <ProductCardBar
              key={index}
              nombre={producto.descripcion}
              precio={producto.precioventa}
              img={producto.image}
              descripcion={producto.codigobarras}
            />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </BarMenuContainer>
    </div>
  );
};

export default BarMenu;
