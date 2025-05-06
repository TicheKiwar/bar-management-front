import { useQuery } from "@tanstack/react-query";
import { ReservaTemplate } from "../components/templates/ReservaTemplate";
import { useReservaStore } from "../store/ReservaStore";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { usePermisosStore, BloqueoPagina } from "../index";

export function Reservas() {
  const { datapermisos } = usePermisosStore();
  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Reservas")
  );
  if (!statePermiso) return <BloqueoPagina />;

  const { mostrarReservas, datareservas, buscarReservas, buscador } =
    useReservaStore();
  const { dataempresa } = useEmpresaStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar reservas", dataempresa.id],
    queryFn: () => mostrarReservas({ idempresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });

  const { data: buscar } = useQuery({
    queryKey: ["buscar reservas", buscador],
    queryFn: () =>
      buscarReservas({ cliente: buscador, id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <span>Error...</span>;
  }

  return (
    <>
      <ReservaTemplate data={datareservas} />
    </>
  );
}
