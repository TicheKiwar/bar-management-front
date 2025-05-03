import React from "react";

export const VistaMesasSelector = ({ vista, onChange }) => {
  return (
    <div className="flex border rounded overflow-hidden">
      <button className={`px-3 py-2 ${vista === "mapa" ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => onChange("mapa")}>
        Mapa
      </button>
      <button className={`px-3 py-2 ${vista === "lista" ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => onChange("lista")}>
        Lista
      </button>
    </div>
  );
};
