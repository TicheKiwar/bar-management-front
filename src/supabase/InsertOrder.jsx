import { supabase } from "../index";
import Swal from "sweetalert2";

export async function InsertarOrden(pedido) {
  try {
    const { error } = await supabase.rpc("insertar_orden_y_detalles", {
      carrito: pedido.carrito,
      cliente: pedido.clienteData
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar la orden",
        text: error.message,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Orden registrada con éxito",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    alert(error.error_description || error.message + " al insertar orden");
  }
}
