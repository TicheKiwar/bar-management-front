import React from "react";
import { useEspaciosStore } from "../../../store/EspaciosStore";
import { Modal } from "../../moleculas/Modal";
import { BtnCircular } from "../../moleculas/BtnCircular";
import { v } from "../../../styles/variables";

export const InfoMesaModal = ({ mesa, onClose }) => {
  const { cambiarEstadoMesa, historialMesa } = useEspaciosStore();
  const usuarioId = "4bc7af8a-3135-4106-9e80-79d643a8127b"; // Reemplazar con el ID real

  const cambiarEstado = async (nuevoEstado) => {
    try {
      console.log("Intentando cambiar estado a:", nuevoEstado);
      const resultado = await cambiarEstadoMesa(mesa.id, nuevoEstado, usuarioId);

      if (resultado?.error) {
        console.error("Error al cambiar estado:", resultado.error);
        alert("No se pudo cambiar el estado");
      } else {
        console.log("Estado cambiado exitosamente");
        // No cerramos el modal automáticamente
      }
    } catch (error) {
      console.error("Error completo:", error);
      alert("Ocurrió un error al cambiar el estado");
    }
  };

  const getEstadoStyles = (estado) => {
    switch (estado) {
      case "disponible":
        return { backgroundColor: "#f0fff4", color: "#276749" };
      case "ocupada":
        return { backgroundColor: "#fff5f5", color: "#9b2c2c" };
      case "reservada":
        return { backgroundColor: "#fffff0", color: "#975a16" };
      default:
        return { backgroundColor: "#f7fafc", color: "#2d3748" };
    }
  };

  return (
    <Modal onClose={onClose} title={`Mesa ${mesa.nombre}`}>
      {/* Información principal */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
                margin: "0 0 4px 0",
              }}
            >
              Capacidad
            </h3>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {mesa.capacidad} personas
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
                margin: "0 0 4px 0",
              }}
            >
              Estado
            </h3>
            <span
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                padding: "4px 8px",
                borderRadius: "4px",
                ...getEstadoStyles(mesa.estado),
              }}
            >
              {mesa.estado}
            </span>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
                margin: "0 0 4px 0",
              }}
            >
              Ubicación
            </h3>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              {mesa.ubicacion}
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "12px",
              borderRadius: "8px",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
                margin: "0 0 4px 0",
              }}
            >
              Forma
            </h3>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: 600,
                margin: 0,
                textTransform: "capitalize",
              }}
            >
              {mesa.forma}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <BtnCircular
            icono={<v.iconocorona />} // Asegúrate de tener este icono definido
            width="25px"
            height="25px"
            bgcolor="#4CAF50" // Verde para disponible
            textcolor="#ffffff"
            fontsize="11px"
            texto="Liberar"
            onClick={() => cambiarEstado("disponible")}
            disabled={mesa.estado === "disponible"}
          />

          <BtnCircular
            icono={<v.iconocorona />} // Asegúrate de tener este icono definido
            width="25px"
            height="25px"
            bgcolor="#F44336" // Rojo para ocupada
            textcolor="#ffffff"
            fontsize="11px"
            texto="Ocupar"
            onClick={() => cambiarEstado("ocupada")}
            disabled={mesa.estado === "ocupada"}
          />

          <BtnCircular
            icono={<v.iconocorona />} // Asegúrate de tener este icono definido
            width="25px"
            height="25px"
            bgcolor="#FFC107" // Amarillo para reservada
            textcolor="#000000" // Texto negro para mejor contraste con amarillo
            fontsize="11px"
            texto="Reservar"
            onClick={() => cambiarEstado("reservada")}
            disabled={mesa.estado === "reservada"}
          />
        </div>
      </div>

      {/* Historial */}
      <div>
        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            marginBottom: "12px",
            color: "#334155",
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "8px",
          }}
        >
          Historial de estados
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {historialMesa.length > 0 ? (
            historialMesa.map((item, index) => (
              <div
                key={index}
                style={{
                  borderLeft: "4px solid #3b82f6",
                  paddingLeft: "12px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      ...getEstadoStyles(item.estado_nuevo),
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {item.estado_nuevo}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#64748b",
                    }}
                  >
                    {new Date(item.fecha_cambio).toLocaleString()}
                  </span>
                </div>
                {item.observaciones && (
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#475569",
                      marginTop: "4px",
                    }}
                  >
                    {item.observaciones}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p
              style={{
                color: "#64748b",
                textAlign: "center",
                padding: "16px 0",
              }}
            >
              No hay historial registrado
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
