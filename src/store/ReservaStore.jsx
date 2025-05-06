import { create } from "zustand";
import {
    BuscarReserva,
    EditarReserva,
    EliminarReserva,
    InsertarReserva,
    MostrarReserva,
} from "../index";

export const useReservaStore = create((set, get) => ({
    buscador: "",
    setBuscador: (p) => {
        set({ buscador: p });
    },
    datareserva: [],
    reservaItemSelect: [],
    parametros: {},

    mostrarReserva: async (p) => {
        const response = await MostrarReserva(p);
        set({ parametros: p });
        set({ datareserva: response });
        set({ reservaItemSelect: response[0] });
        return response;
    },

    selectReserva: (p) => {
        set({ reservaItemSelect: p });
    },

    insertarReserva: async (p) => {
        await InsertarReserva(p);
        const { mostrarReserva, parametros } = get();
        set(mostrarReserva(parametros));
    },

    eliminarReserva: async (p) => {
        await EliminarReserva(p);
        const { mostrarReserva, parametros } = get();
        set(mostrarReserva(parametros));
    },

    editarReserva: async (p) => {
        await EditarReserva(p);
        const { mostrarReserva, parametros } = get();
        set(mostrarReserva(parametros));
    },

    buscarReserva: async (p) => {
        const response = await BuscarReserva(p);
        set({ datareserva: response });
    },
}));
