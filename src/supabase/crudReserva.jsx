import { supabase } from "../index";
import Swal from "sweetalert2";

// Insertar Reserva usando función RPC
export async function InsertarReserva(p) {
  const { error } = await supabase.rpc("insertarreserva", p);
  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al insertar reserva. Verifique los datos.",
    });
  }
}

// Mostrar todas las reservas para una empresa
export async function MostrarReserva(p) {
  const { data } = await supabase.rpc("mostrarreserva", { _id_empresa: p.id_empresa });
  return data;
}

// Editar reserva directamente en la tabla
export async function EditarReserva(p) {
  const { error } = await supabase
    .from("reservas")
    .update(p)
    .eq("id", p.id);

  if (error) {
    alert("Error al editar reserva");
  }
}

// Eliminar reserva por ID
export async function EliminarReserva(p) {
  const { error } = await supabase
    .from("reservas")
    .delete()
    .eq("id", p.id);

  if (error) {
    alert("Error al eliminar reserva");
  }
}

// Buscar reserva por nombre del cliente
export async function BuscarReserva(p) {
  try {
    const { data } = await supabase.rpc("buscarreserva", {
      buscador: p.buscador,
      _id_empresa: p.id_empresa,
    });
    return data;
  } catch (error) {
    console.log("Error al buscar reserva:", error);
  }
}
