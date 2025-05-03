import React from "react";

const formaEstilos = {
  redonda: { borderRadius: "50%" },
  cuadrada: { borderRadius: "4px" },
  rectangular: { borderRadius: "4px", width: "80px" },
  barra: { width: "120px", height: "30px" },
};

// Definición de colores para cada estado
const estadoColores = {
  disponible: { background: "#4CAF50", color: "white" }, // Verde
  ocupada: { background: "#F44336", color: "white" }, // Rojo
  reservada: { background: "#FFC107", color: "black" }, // Amarillo
  mantenimiento: { background: "#9E9E9E", color: "white" }, // Gris
};

export const EstadoMesa = ({ nombre, estado, capacidad, forma = "redonda" }) => {
  const [hover, setHover] = React.useState(false);
  // Estilo base combinado con los estilos específicos
  const estiloMesa = {
    width: "60px",
    height: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    margin: "5px",
    position: "relative",
    ...formaEstilos[forma],
    ...estadoColores[estado], // Aplica colores según el estado
    cursor: "pointer",
    transform: hover ? "scale(1.05)" : "scale(1)",
    transition: "transform 0.2s ease",
  };

  // Estilo para el indicador de estado (puntito)
  const estiloIndicador = {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "2px solid #333",
  };

  // Estilo para el texto
  const estiloTexto = {
    fontSize: "0.7rem",
    textAlign: "center",
    lineHeight: "1.2",
  };

  return (
    <div style={estiloMesa} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span style={estiloTexto}>{nombre}</span>
      <span style={estiloTexto}>{capacidad} pers.</span>
      <div style={estiloIndicador}></div>
    </div>
  );
};
