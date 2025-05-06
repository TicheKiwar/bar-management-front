import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OrderDetailCard,obtenerOrdenesConDetalles, cambiarEstadoOrden  } from "../../index";
import Swal from "sweetalert2";

export const OrdenesConDetalles = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [verDetalles, setVerDetalles] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  useEffect(() => {
    cargarOrdenes();
  }, []);
  
  // Efecto para filtrar las órdenes cuando cambia el filtro o las órdenes
  useEffect(() => {
    if (filtroEstado === "todos") {
      setOrdenesFiltradas(ordenes);
    } else {
      const filtradas = ordenes.filter(orden => orden.estado === filtroEstado);
      setOrdenesFiltradas(filtradas);
    }
  }, [filtroEstado, ordenes]);

  const cargarOrdenes = async () => {
    try {
      setLoading(true);
      const data = await obtenerOrdenesConDetalles();
      setOrdenes(data);
      // Al cargar inicialmente, ya se aplicará el filtro en el useEffect
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Manejador para cambiar el filtro de estado
  const handleCambioFiltro = (nuevoFiltro) => {
    setFiltroEstado(nuevoFiltro);
  };

  const handleCambiarEstado = async (idOrden, nuevoEstado) => {
    // Mostrar confirmación antes de cambiar el estado
    const confirmResult = await Swal.fire({
      title: `¿Cambiar estado a "${nuevoEstado}"?`,
      text: `La orden #${idOrden} cambiará su estado a "${nuevoEstado}".`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    });

    if (confirmResult.isConfirmed) {
      const resultado = await cambiarEstadoOrden(idOrden, nuevoEstado);
      if (resultado) {
        await cargarOrdenes();
      }
    }
  };

  // Función para mostrar los detalles de una orden específica
  const mostrarDetallesOrden = (orden) => {
    setOrdenSeleccionada(orden);
    setVerDetalles(true);
  };

  // Función para preparar los datos en el formato que espera OrderDetailCard
  const prepararDetalleParaCard = (detalle, orden) => {
    return {
      ...detalle,
      image: detalle.producto.image,
      descripcion: detalle.producto.descripcion,
      codigobarras: detalle.producto.codigobarras,
      precioventa: detalle.precio_unitario,
      cantidad: detalle.cantidad,
      subtotal: detalle.subtotal,
      nombre_cliente: orden.nombre_cliente,
      dni_cliente: orden.dni_cliente,
      telefono_cliente: orden.telefono_cliente,
      direccion_cliente: orden.direccion_cliente,
      fecha_orden: orden.fecha_orden
    };
  };

  if (loading) {
    return <LoadingContainer>Cargando órdenes...</LoadingContainer>;
  }

  // Si estamos viendo los detalles de una orden específica
  if (verDetalles && ordenSeleccionada) {
    return (
      <Container>
        <Header>
          <h1>Detalles de Orden #{ordenSeleccionada.id_orden}</h1>
          <button onClick={() => setVerDetalles(false)} className="back-button">
            ← Volver a la lista
          </button>
        </Header>

        <OrdenInfoBox>
          <div className="orden-header">
            <div>
              <h2>Orden #{ordenSeleccionada.id_orden}</h2>
              <p>Fecha: {new Date(ordenSeleccionada.fecha_orden).toLocaleString()}</p>
            </div>
            <EstadoBadge estado={ordenSeleccionada.estado}>
              {ordenSeleccionada.estado}
            </EstadoBadge>
          </div>
          
          <div className="cliente-info">
            <h3>Información del Cliente</h3>
            <p><strong>Nombre:</strong> {ordenSeleccionada.nombre_cliente}</p>
            <p><strong>DNI:</strong> {ordenSeleccionada.dni_cliente}</p>
            <p><strong>Teléfono:</strong> {ordenSeleccionada.telefono_cliente}</p>
            <p><strong>Dirección:</strong> {ordenSeleccionada.direccion_cliente}</p>
          </div>

          <div className="orden-total">
            <p><strong>Total de la Orden:</strong> ${ordenSeleccionada.total.toFixed(2)}</p>
          </div>
        </OrdenInfoBox>

        <h2>Productos de la Orden</h2>
        
        {ordenSeleccionada.detalles.map((detalle) => (
          <OrderDetailCard 
            key={detalle.id_detalle} 
            detalle={prepararDetalleParaCard(detalle, ordenSeleccionada)}
          />
        ))}

        {ordenSeleccionada.estado !== 'completada' && ordenSeleccionada.estado !== 'cancelada' && (
          <AccionesContainer>
            <button 
              onClick={() => handleCambiarEstado(ordenSeleccionada.id_orden, 'completada')}
              className="btn-completar"
            >
              Completar Orden
            </button>
            <button 
              onClick={() => handleCambiarEstado(ordenSeleccionada.id_orden, 'cancelada')}
              className="btn-cancelar"
            >
              Cancelar Orden
            </button>
          </AccionesContainer>
        )}
      </Container>
    );
  }

  // Lista de órdenes
  return (
    <Container>
      <Header>
        <h1>Gestión de Órdenes</h1>
        <FiltrosContainer>
          <p>Filtrar por estado:</p>
          <FiltroButton 
            active={filtroEstado === "todos"} 
            onClick={() => handleCambioFiltro("todos")}
          >
            Todos
          </FiltroButton>
          <FiltroButton 
            active={filtroEstado === "pendiente"} 
            onClick={() => handleCambioFiltro("pendiente")}
            color="#fff2cc"
            textColor="#856404"
          >
            Pendientes
          </FiltroButton>
          <FiltroButton 
            active={filtroEstado === "completada"} 
            onClick={() => handleCambioFiltro("completada")}
            color="#d4edda"
            textColor="#155724"
          >
            Completados
          </FiltroButton>
          <FiltroButton 
            active={filtroEstado === "cancelada"} 
            onClick={() => handleCambioFiltro("cancelada")}
            color="#f8d7da"
            textColor="#721c24"
          >
            Cancelados
          </FiltroButton>
        </FiltrosContainer>
      </Header>

      {ordenes.length === 0 ? (
        <EmptyState>
          <h2>No hay órdenes disponibles</h2>
          <p>No se encontraron órdenes en el sistema.</p>
        </EmptyState>
      ) : (
        <>
          {ordenesFiltradas.length === 0 ? (
            <EmptyState>
              <h2>No hay órdenes con el filtro seleccionado</h2>
              <p>No se encontraron órdenes con estado: {filtroEstado}.</p>
              <button 
                onClick={() => handleCambioFiltro("todos")} 
                className="btn-ver-todos"
              >
                Ver todas las órdenes
              </button>
            </EmptyState>
          ) : (
            <OrdenesGrid>
              {ordenesFiltradas.map((orden) => (
            <OrdenCard key={orden.id_orden}>
              <div className="orden-header">
                <h2>Orden #{orden.id_orden}</h2>
                <EstadoBadge estado={orden.estado}>
                  {orden.estado}
                </EstadoBadge>
              </div>
              
              <div className="orden-cliente">
                <p><strong>Cliente:</strong> {orden.nombre_cliente}</p>
                <p><strong>Fecha:</strong> {new Date(orden.fecha_orden).toLocaleString()}</p>
              </div>
              
              <div className="orden-resumen">
                <p><strong>Total:</strong> ${orden.total.toFixed(2)}</p>
                <p><strong>Productos:</strong> {orden.detalles.length}</p>
              </div>
              
              <div className="orden-acciones">
                <button 
                  onClick={() => mostrarDetallesOrden(orden)}
                  className="btn-ver-detalles"
                >
                  Ver Detalles
                </button>
                
                {orden.estado !== 'completada' && orden.estado !== 'cancelada' && (
                  <div className="acciones-estado">
                    <button 
                      onClick={() => handleCambiarEstado(orden.id_orden, 'completada')}
                      className="btn-completar"
                    >
                      Completar
                    </button>
                    <button 
                      onClick={() => handleCambiarEstado(orden.id_orden, 'cancelada')}
                      className="btn-cancelar"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </OrdenCard>
              ))}
            </OrdenesGrid>
          )}
          
          <ResumenEstadisticas>
            <EstadisticaItem>
              <h3>Total: {ordenes.length}</h3>
              <p>órdenes</p>
            </EstadisticaItem>
            <EstadisticaItem>
              <h3>{ordenes.filter(o => o.estado === 'pendiente').length}</h3>
              <p>pendientes</p>
            </EstadisticaItem>
            <EstadisticaItem>
              <h3>{ordenes.filter(o => o.estado === 'completada').length}</h3>
              <p>completadas</p>
            </EstadisticaItem>
            <EstadisticaItem>
              <h3>{ordenes.filter(o => o.estado === 'cancelada').length}</h3>
              <p>canceladas</p>
            </EstadisticaItem>
          </ResumenEstadisticas>
        </>
      )}
    </Container>
  );
};

// Estilos
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.8rem;
    color: #333;
    margin: 0 0 1rem 0;
  }
  
  .back-button {
    background: #f2f2f2;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    
    &:hover {
      background: #e7e7e7;
    }
  }
`;

const FiltrosContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  p {
    margin: 0 0.5rem 0 0;
    font-weight: 500;
    color: #555;
  }
`;

const FiltroButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${props => props.active ? (props.color || '#e9ecef') : '#f8f9fa'};
  color: ${props => props.active ? (props.textColor || '#212529') : '#6c757d'};
  border: 1px solid ${props => props.active ? (props.color || '#dee2e6') : '#dee2e6'};
  box-shadow: ${props => props.active ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
  
  &:hover {
    background-color: ${props => props.color || '#e9ecef'};
    color: ${props => props.textColor || '#212529'};
  }
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: #f9f9f9;
  border-radius: 8px;
  
  h2 {
    color: #666;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #888;
    margin-bottom: 1.5rem;
  }
  
  .btn-ver-todos {
    background: #d4af37;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.7rem 1.2rem;
    font-weight: 500;
    cursor: pointer;
    
    &:hover {
      background: #c4a030;
    }
  }
`;

const ResumenEstadisticas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: space-around;
`;

const EstadisticaItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  flex: 1;
  min-width: 100px;
  
  h3 {
    font-size: 1.8rem;
    margin: 0;
    color: #d4af37;
  }
  
  p {
    margin: 0.3rem 0 0 0;
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const OrdenesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const OrdenCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .orden-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h2 {
      font-size: 1.3rem;
      margin: 0;
      color: #333;
    }
  }
  
  .orden-cliente {
    margin-bottom: 1rem;
    
    p {
      margin: 0.3rem 0;
      color: #555;
    }
  }
  
  .orden-resumen {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    
    p {
      margin: 0;
      font-size: 1rem;
    }
  }
  
  .orden-acciones {
    .btn-ver-detalles {
      width: 100%;
      padding: 0.7rem;
      background: #d4af37;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      margin-bottom: 1rem;
      
      &:hover {
        background: #c4a030;
      }
    }
    
    .acciones-estado {
      display: flex;
      gap: 0.5rem;
      
      button {
        flex: 1;
        padding: 0.5rem;
        border: none;
        border-radius: 4px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
`;

const EstadoBadge = styled.span`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  
  ${({ estado }) => {
    switch (estado) {
      case 'pendiente':
        return `
          background-color: #fff2cc;
          color: #856404;
          border: 1px solid #f9e491;
        `;
      case 'completada':
        return `
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        `;
      case 'cancelada':
        return `
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        `;
      default:
        return `
          background-color: #e2e3e5;
          color: #383d41;
          border: 1px solid #d6d8db;
        `;
    }
  }}
`;

const OrdenInfoBox = styled.div`
  background: #fffdf5;
  border: 2px solid #d4af37;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  .orden-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h2 {
      font-size: 1.4rem;
      margin: 0;
      color: #4b3b0a;
    }
    
    p {
      margin: 0.3rem 0;
      color: #666;
    }
  }
  
  .cliente-info {
    margin-bottom: 1rem;
    
    h3 {
      font-size: 1.1rem;
      color: #6e5c2d;
      margin-bottom: 0.5rem;
    }
    
    p {
      margin: 0.3rem 0;
      color: #555;
    }
  }
  
  .orden-total {
    border-top: 1px solid #e6d7af;
    padding-top: 1rem;
    text-align: right;
    
    p {
      font-size: 1.1rem;
      font-weight: 600;
      color: #4b3b0a;
    }
  }
`;

const AccionesContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  button {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .btn-completar {
    background: #28a745;
    color: white;
    flex: 1;
    
    &:hover {
      background: #218838;
    }
  }
  
  .btn-cancelar {
    background: #dc3545;
    color: white;
    flex: 1;
    
    &:hover {
      background: #c82333;
    }
  }
`;
