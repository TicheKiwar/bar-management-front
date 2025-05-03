import React, { useState } from "react";
import { useEspaciosStore } from "../../store/EspaciosStore";
import { TablaEspacios } from "../organismos/tablas/TablaEspacios";
import { MapaMesas } from "../organismos/espacios/MapaMesas";
import { SectorSelector } from "../organismos/espacios/SectorSelector";
import { VistaMesasSelector } from "../organismos/espacios/VistaMesasSelector";
import { BtnCircular } from "../moleculas/BtnCircular";
import { Modal } from "../moleculas/Modal";
import { EspacioForm } from "../organismos/formularios/EspacioForm";

export const EspaciosTemplate = () => {
  const { mesas, cargarMesas, cargarSectores, sectores } = useEspaciosStore();
  const [vista, setVista] = useState("mapa");
  const [sectorSeleccionado, setSectorSeleccionado] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mesaEditando, setMesaEditando] = useState(null);
  const empresaId = 1;

  React.useEffect(() => {
    cargarMesas(empresaId); // <-- Añade esto para cargar las mesas
    cargarSectores(empresaId);
  }, []);

  const abrirFormNuevaMesa = () => {
    setMesaEditando(null);
    setMostrarForm(true);
  };

  const abrirFormEditarMesa = (mesa) => {
    setMesaEditando(mesa);
    setMostrarForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Mesas</h1>

        <div className="flex space-x-4">
          <VistaMesasSelector vista={vista} onChange={setVista} />

          <SectorSelector sectores={sectores} seleccionado={sectorSeleccionado} onChange={setSectorSeleccionado} />

          <BtnCircular icono="plus" onClick={abrirFormNuevaMesa} texto="Nueva Mesa" />
        </div>
      </div>

      {vista === "mapa" ? <MapaMesas sectorId={sectorSeleccionado} /> : <TablaEspacios filtroSector={sectorSeleccionado} />}

      {mostrarForm && (
        <Modal onClose={() => setMostrarForm(false)} title={mesaEditando ? "Editar Mesa" : "Nueva Mesa"}>
          <EspacioForm mesaExistente={mesaEditando} onClose={() => setMostrarForm(false)} />
        </Modal>
      )}
    </div>
  );
};
