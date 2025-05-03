import { create } from "zustand";
import { obtenerMesas, crearMesa, actualizarMesa, cambiarEstadoMesa, obtenerSectores, obtenerHistorialMesa } from "../supabase/crudEspacios";

export const useEspaciosStore = create((set, get) => ({
  mesas: [],
  sectores: [],
  mesaSeleccionada: null,
  historialMesa: [],
  loading: false,
  error: null,

  // Cargar mesas
  cargarMesas: async (empresaId) => {
    set({ loading: true, error: null });
    try {
      const mesas = await obtenerMesas(empresaId);
      set({ mesas, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Cargar sectores
  cargarSectores: async (empresaId) => {
    set({ loading: true, error: null });
    try {
      const sectores = await obtenerSectores(empresaId);
      set({ sectores, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Agregar nueva mesa
  agregarMesa: async (mesaData) => {
    set({ loading: true, error: null });
    try {
      const nuevaMesa = await crearMesa(mesaData);
      set((state) => ({
        mesas: [...state.mesas, nuevaMesa],
        loading: false,
      }));
      return nuevaMesa;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Actualizar mesa
  actualizarMesa: async (id, mesaData) => {
    set({ loading: true, error: null });
    try {
      const mesaActualizada = await actualizarMesa(id, mesaData);
      set((state) => ({
        mesas: state.mesas.map((mesa) => (mesa.id === id ? mesaActualizada : mesa)),
        loading: false,
      }));
      return mesaActualizada;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Cambiar estado de mesa
  cambiarEstadoMesa: async (id, nuevoEstado, usuarioId, reservaId = null, observaciones = null) => {
    set({ loading: true, error: null });
    try {
      await cambiarEstadoMesa(id, nuevoEstado, usuarioId, reservaId, observaciones);
      set((state) => ({
        mesas: state.mesas.map((mesa) => (mesa.id === id ? { ...mesa, estado: nuevoEstado } : mesa)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Seleccionar mesa y cargar su historial
  seleccionarMesa: async (mesaId) => {
    set({ loading: true, error: null });
    try {
      const historial = await obtenerHistorialMesa(mesaId);
      const mesa = get().mesas.find((m) => m.id === mesaId);
      set({
        mesaSeleccionada: mesa,
        historialMesa: historial,
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Limpiar selección
  limpiarSeleccion: () => {
    set({
      mesaSeleccionada: null,
      historialMesa: [],
    });
  },
}));
