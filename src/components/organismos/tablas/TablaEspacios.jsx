import React from "react";
import { useEspaciosStore } from "../../../store/EspaciosStore";
import { EstadoMesa } from "../espacios/EstadoMesas";
import { Paginacion } from "./Paginacion";
import { BtnCircular } from "../../moleculas/BtnCircular";

export const TablaEspacios = ({ filtroSector }) => {
  const { mesas, cargarMesas, seleccionarMesa, eliminarMesa } = useEspaciosStore();
  const empresaId = 1; // Reemplazar con el ID real de la empresa

  // Filtrar mesas si hay un sector seleccionado
  const mesasFiltradas = filtroSector ? mesas.filter((mesa) => mesa.sector_id === filtroSector) : mesas;

  React.useEffect(() => {
    cargarMesas(empresaId);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">Mesa</th>
            <th className="py-2 px-4 text-left">Estado</th>
            <th className="py-2 px-4 text-left">Capacidad</th>
            <th className="py-2 px-4 text-left">Ubicación</th>
            <th className="py-2 px-4 text-left">Sector</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {mesasFiltradas.map((mesa) => (
            <tr key={mesa.id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{mesa.nombre}</td>
              <td className="py-2 px-4">
                <EstadoMesa estado={mesa.estado} small />
              </td>
              <td className="py-2 px-4">{mesa.capacidad}</td>
              <td className="py-2 px-4">{mesa.ubicacion}</td>
              <td className="py-2 px-4">{mesa.sectores?.nombre || "-"}</td>
              <td className="py-2 px-4 space-x-1">
                <BtnCircular icono="eye" size="sm" onClick={() => seleccionarMesa(mesa.id)} title="Ver detalles" />
                <BtnCircular
                  icono="edit"
                  size="sm"
                  color="blue"
                  onClick={() => {
                    /* Implementar edición */
                  }}
                  title="Editar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Paginacion paginaActual={1} totalPaginas={1} onChangePagina={() => {}} />
    </div>
  );
};
