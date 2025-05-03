import React from "react";
import { useEspaciosStore } from "../../../store/EspaciosStore";
import { InputText } from "./InputText";
import { Selector } from "../Selector";
import { InputNumber } from "./InputNumber";
import { Btnsave } from "../../moleculas/Btnsave";

export const EspacioForm = ({ mesaExistente, onClose }) => {
  const { sectores, agregarMesa, actualizarMesa, cargarMesas } = useEspaciosStore();
  const empresaId = 1; // Reemplazar con el ID real de la empresa

  const [formData, setFormData] = React.useState({
    nombre: mesaExistente?.nombre || "",
    capacidad: mesaExistente?.capacidad || 2,
    ubicacion: mesaExistente?.ubicacion || "interior",
    forma: mesaExistente?.forma || "redonda",
    sector_id: mesaExistente?.sector_id || null,
    posicion_x: mesaExistente?.posicion_x || 0,
    posicion_y: mesaExistente?.posicion_y || 0,
    activa: mesaExistente?.activa ?? true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        id_empresa: empresaId,
        estado: "disponible",
      };

      if (mesaExistente) {
        await actualizarMesa(mesaExistente.id, data);
      } else {
        await agregarMesa(data);
      }

      await cargarMesas(empresaId);
      onClose();
    } catch (error) {
      console.error("Error al guardar mesa:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputText label="Nombre de la mesa" name="nombre" value={formData.nombre} onChange={handleChange} required />

      <InputNumber label="Capacidad" name="capacidad" value={formData.capacidad} onChange={handleChange} min={1} required />

      <Selector
        label="Ubicación"
        name="ubicacion"
        value={formData.ubicacion}
        onChange={handleChange}
        options={[
          { value: "interior", label: "Interior" },
          { value: "terraza", label: "Terraza" },
          { value: "barra", label: "Barra" },
          { value: "privado", label: "Área Privada" },
        ]}
      />

      <Selector
        label="Forma"
        name="forma"
        value={formData.forma}
        onChange={handleChange}
        options={[
          { value: "redonda", label: "Redonda" },
          { value: "cuadrada", label: "Cuadrada" },
          { value: "rectangular", label: "Rectangular" },
          { value: "barra", label: "Barra" },
        ]}
      />

      <Selector label="Sector" name="sector_id" value={formData.sector_id} onChange={handleChange} options={[{ value: null, label: "Sin sector" }, ...sectores.map((s) => ({ value: s.id, label: s.nombre }))]} />

      <div className="grid grid-cols-2 gap-4">
        <InputNumber label="Posición X" name="posicion_x" value={formData.posicion_x} onChange={handleChange} />

        <InputNumber label="Posición Y" name="posicion_y" value={formData.posicion_y} onChange={handleChange} />
      </div>

      <div className="flex items-center">
        <input type="checkbox" id="activa" name="activa" checked={formData.activa} onChange={handleChange} className="mr-2" />
        <label htmlFor="activa">Mesa activa</label>
      </div>

      <Btnsave texto={mesaExistente ? "Actualizar Mesa" : "Crear Mesa"} onClick={handleSubmit} />
    </form>
  );
};
