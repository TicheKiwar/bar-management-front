import React from "react";
import { useEspaciosStore } from "../../../store/EspaciosStore";
import { EstadoMesa } from "./EstadoMesas";
import { InfoMesaModal } from "./InfoMesaModal";

export const MapaMesas = ({ sectorId }) => {
  const { mesas, seleccionarMesa, mesaSeleccionada, limpiarSeleccion } = useEspaciosStore();

  // Filtrar mesas por sector si está especificado
  const mesasFiltradas = sectorId ? mesas.filter((mesa) => mesa.sector_id === sectorId) : mesas;

  // Estilo para el contenedor del mapa (simulando el local)
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "500px",
    backgroundColor: "#272727",
    border: "2px solid #333",
    borderRadius: "8px",
  };

  return (
    <div style={containerStyle}>
      {mesasFiltradas.map((mesa) => (
        <div
          key={mesa.id}
          onClick={() => seleccionarMesa(mesa.id)}
          style={{
            position: "absolute",
            left: `${mesa.posicion_x}px`,
            top: `${mesa.posicion_y}px`,
            cursor: "pointer",
          }}
        >
          <EstadoMesa nombre={mesa.nombre} estado={mesa.estado} capacidad={mesa.capacidad} forma={mesa.forma} />
        </div>
      ))}

      {mesaSeleccionada && <InfoMesaModal mesa={mesaSeleccionada} onClose={limpiarSeleccion} />}
    </div>
  );
};
