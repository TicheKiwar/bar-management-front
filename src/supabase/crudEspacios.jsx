import { supabase } from "./supabase.config";

export const obtenerMesas = async (empresaId) => {
  const { data, error } = await supabase
    .from("espacios")
    .select(
      `
      *,
      sectores: sector_id (nombre)
    `
    )
    .eq("id_empresa", empresaId)
    .order("nombre", { ascending: true });

  if (error) throw error;
  return data;
};

export const crearMesa = async (mesaData) => {
  const { data, error } = await supabase.from("espacios").insert(mesaData).select();

  if (error) throw error;
  return data[0];
};

export const actualizarMesa = async (id, mesaData) => {
  const { data, error } = await supabase.from("espacios").update(mesaData).eq("id", id).select();

  if (error) throw error;
  return data[0];
};

export const cambiarEstadoMesa = async (id, nuevoEstado, usuarioId, reservaId = null, observaciones = null) => {
  // Primero actualizamos el estado en la mesa
  const { error: updateError } = await supabase.from("espacios").update({ estado: nuevoEstado }).eq("id", id);

  if (updateError) throw updateError;

  // Luego registramos el cambio en el histórico
  const { data, error: historyError } = await supabase
    .from("estados_mesa")
    .insert({
      id_espacio: id,
      estado_nuevo: nuevoEstado,
      id_usuario: usuarioId,
      id_reserva: reservaId,
      observaciones,
    })
    .select();

  if (historyError) throw historyError;
  return data[0];
};

export const obtenerSectores = async (empresaId) => {
  const { data, error } = await supabase.from("sectores").select().eq("id_empresa", empresaId).order("nombre", { ascending: true });

  if (error) throw error;
  return data;
};

export const obtenerHistorialMesa = async (mesaId) => {
  const { data, error } = await supabase
    .from("estados_mesa")
    .select(
      `
      *,
      usuario: id_usuario (nombres),
      reserva: id_reserva (cliente_nombre)
    `
    )
    .eq("id_espacio", mesaId)
    .order("fecha_cambio", { ascending: false });

  if (error) throw error;
  return data;
};
