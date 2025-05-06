import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useReservaStore = create((set) => ({
  datareservas: [],
  buscador: "",
  setBuscador: (texto) => set({ buscador: texto }),
  
  mostrarReservas: async ({ idempresa }) => {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .eq("id_empresa", idempresa);

    if (error) throw error;
    set({ datareservas: data });
    return data;
  },

  buscarReservas: async ({ descripcion, id_empresa }) => {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .ilike("nombre_cliente", `%${descripcion}%`)
      .eq("id_empresa", id_empresa);

    if (error) throw error;
    set({ datareservas: data });
    return data;
  },
}));
