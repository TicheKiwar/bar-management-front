import { supabase } from "../index";
import Swal from "sweetalert2";

/**
 * Obtiene todas las órdenes con sus detalles y datos de productos
 * @returns {Promise<Array>} - Lista de órdenes con sus detalles
 */
export async function obtenerOrdenesConDetalles() {
  try {
    const { data, error } = await supabase.rpc("obtener_ordenes_con_detalles");
    
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar las órdenes",
        text: error.message,
      });
      return [];
    }
    
    // Procesamos y estructuramos los datos para tener órdenes con sus detalles agrupados
    const ordenesAgrupadas = agruparOrdenesPorId(data);
    return ordenesAgrupadas;
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error inesperado",
      text: error.error_description || error.message,
    });
    return [];
  }
}

/**
 * Agrupa los resultados planos de la base de datos en una estructura jerárquica
 * @param {Array} data - Datos planos de la consulta
 * @returns {Array} - Órdenes estructuradas con sus detalles
 */
function agruparOrdenesPorId(data) {
  const ordenesMap = new Map();
  
  data.forEach(item => {
    // Si la orden no existe en el mapa, la creamos
    if (!ordenesMap.has(item.id_orden)) {
      ordenesMap.set(item.id_orden, {
        id_orden: item.id_orden,
        fecha_orden: item.fecha_orden,
        nombre_cliente: item.nombre_cliente,
        dni_cliente: item.dni_cliente,
        telefono_cliente: item.telefono_cliente,
        direccion_cliente: item.direccion_cliente,
        total: item.total,
        estado: item.estado,
        detalles: []
      });
    }
    
    // Agregamos el detalle a la orden correspondiente
    const detalleProducto = {
      id_detalle: item.id_detalle,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      precio_unitario: item.precio_unitario,
      subtotal: item.subtotal,
      producto: {
        id: item.id_producto,
        descripcion: item.descripcion,
        idmarca: item.idmarca,
        stock: item.stock,
        stock_minimo: item.stock_minimo,
        codigobarras: item.codigobarras,
        codigointerno: item.codigointerno,
        precioventa: item.precioventa,
        preciocompra: item.preciocompra,
        id_categoria: item.id_categoria,
        id_empresa: item.id_empresa,
        image: item.image
      }
    };
    
    ordenesMap.get(item.id_orden).detalles.push(detalleProducto);
  });
  
  // Convertimos el mapa a un array
  return Array.from(ordenesMap.values());
}

/**
 * Obtener los detalles de una orden específica por su ID
 * @param {number} idOrden - ID de la orden a buscar
 * @returns {Promise<Object>} - Orden con sus detalles
 */
export async function obtenerOrdenPorId(idOrden) {
  try {
    const { data, error } = await supabase.rpc("obtener_ordenes_con_detalles");
    
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar la orden",
        text: error.message,
      });
      return null;
    }
    
    // Filtramos solo los registros de la orden buscada
    const datosOrden = data.filter(item => item.id_orden === idOrden);
    
    if (datosOrden.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Orden no encontrada",
        text: "No se encontró la orden solicitada",
      });
      return null;
    }
    
    // Agrupamos los detalles de esta orden específica
    const ordenesAgrupadas = agruparOrdenesPorId(datosOrden);
    return ordenesAgrupadas[0]; // Retornamos la primera y única orden del resultado
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error inesperado",
      text: error.error_description || error.message,
    });
    return null;
  }
}

/**
 * Cambia el estado de una orden
 * @param {number} idOrden - ID de la orden
 * @param {string} nuevoEstado - Nuevo estado para la orden
 * @returns {Promise<boolean>} - Resultado de la operación
 */
export async function cambiarEstadoOrden(idOrden, nuevoEstado) {
  try {
    const { error } = await supabase
      .from('ordenes')
      .update({ estado: nuevoEstado })
      .eq('id_orden', idOrden);
    
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar el estado",
        text: error.message,
      });
      return false;
    }
    
    Swal.fire({
      icon: "success",
      title: "Estado actualizado",
      text: `La orden ha sido actualizada a: ${nuevoEstado}`,
      showConfirmButton: false,
      timer: 1500,
    });
    
    return true;
    
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error inesperado",
      text: error.error_description || error.message,
    });
    return false;
  }
}