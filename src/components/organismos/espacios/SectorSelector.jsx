import React from "react";

export const SectorSelector = ({ sectores, seleccionado, onChange }) => {
  return (
    <select value={seleccionado || ""} onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : null)} className="border rounded px-3 py-2">
      <option value="">Todos los sectores</option>
      {sectores.map((sector) => (
        <option key={sector.id} value={sector.id}>
          {sector.nombre}
        </option>
      ))}
    </select>
  );
};
