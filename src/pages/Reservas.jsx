
import { useQuery } from "@tanstack/react-query";
import { useEmpresaStore } from "../store/EmpresaStore";
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
import { ReservaTemplate } from "../components/templates/ReservaTemplate";
import { useReservaStore } from "../store/ReservaStore";

export function Reserva() {
  const {mostrarReserva,datareserva,buscarReserva} = useReservaStore()
  const {buscador} = useReservaStore();
  const {dataempresa} = useEmpresaStore()
  //mostrar data
 const {data,isLoading,error} = useQuery({queryKey:["mostrar reservas",dataempresa.id],queryFn:()=>mostrarReserva({id_empresa:dataempresa.id}),enabled:dataempresa.id!=null})
 //buscador
 const {data:buscar} = useQuery({queryKey:["buscar reservas",buscador],queryFn:()=>buscarReserva({descripcion: buscador,id_empresa:dataempresa.id}),enabled:dataempresa.id!=null})
 //respuestas
 if(isLoading){
  return <SpinnerLoader/>
 }
 if(error){
  return <span>Error...</span>
 }
  return (<>

    <ReservaTemplate data={datareserva}/>
  </>)
}
