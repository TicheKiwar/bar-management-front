import React, { useState, useEffect } from 'react';
import { useGlobalStore } from '../../store/GlobalStore';
import { obtenerTodasMesas, obtenerReservasPorFecha } from '../../supabase/crudReservas';
import { Spinner } from '../moleculas/Spinner';

export const VistaMesas = ({ fechaSeleccionada, onSeleccionarMesa }) => {
    const { modo } = useGlobalStore();
    const [mesas, setMesas] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Cargar mesas y reservas
    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            try {
                // Cargar todas las mesas
                const mesasData = await obtenerTodasMesas();
                setMesas(mesasData);

                // Cargar reservas para la fecha seleccionada
                if (fechaSeleccionada) {
                    const fechaStr = fechaSeleccionada instanceof Date
                        ? fechaSeleccionada.toISOString().split('T')[0]
                        : fechaSeleccionada;

                    const reservasData = await obtenerReservasPorFecha(fechaStr);
                    setReservas(reservasData);
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('No se pudieron cargar los datos de mesas y reservas');
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, [fechaSeleccionada]);

    // Determinar estado de una mesa
    const obtenerEstadoMesa = (mesaId) => {
        // Verificar si la mesa tiene una reserva activa para la fecha seleccionada
        const reservaActiva = reservas.find(reserva =>
            reserva.mesa === mesaId &&
            ['Pendiente', 'Confirmada'].includes(reserva.estado)
        );

        if (reservaActiva) {
            return {
                estado: reservaActiva.estado,
                cliente: reservaActiva.cliente_nombre,
                hora: new Date(reservaActiva.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                personas: reservaActiva.numero_personas,
                reservaId: reservaActiva.id
            };
        }

        // Si no tiene reserva activa, buscar en la lista de mesas
        const mesa = mesas.find(m => m.id === mesaId);
        return {
            estado: mesa?.estado || 'Disponible',
            cliente: null,
            hora: null,
            personas: mesa?.capacidad || 0
        };
    };

    // Obtener color según estado de la mesa
    const getColorEstadoMesa = (estado) => {
        switch (estado.toLowerCase()) {
            case 'disponible':
                return 'bg-green-500 border-green-700';
            case 'reservado':
            case 'pendiente':
                return 'bg-yellow-500 border-yellow-700';
            case 'confirmada':
                return 'bg-blue-500 border-blue-700';
            case 'ocupado':
                return 'bg-red-500 border-red-700';
            default:
                return 'bg-gray-400 border-gray-600';
        }
    };

    if (cargando) {
        return <Spinner />;
    }

    if (error) {
        return <div className="p-4 text-red-600">{error}</div>;
    }

    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">
                Distribución de Mesas - {fechaSeleccionada instanceof Date
                    ? fechaSeleccionada.toLocaleDateString()
                    : new Date().toLocaleDateString()}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mesas.map(mesa => {
                    const estadoInfo = obtenerEstadoMesa(mesa.id);
                    const colorClase = getColorEstadoMesa(estadoInfo.estado);

                    return (
                        <div
                            key={mesa.id}
                            onClick={() => onSeleccionarMesa(mesa.id)}
                            className={`border-2 rounded-lg p-4 ${colorClase} cursor-pointer transform transition-transform hover:scale-105 text-white shadow-lg`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-lg">Mesa {mesa.id}</h4>
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-white text-gray-800">
                                    {estadoInfo.estado}
                                </span>
                            </div>

                            <div className="text-sm">
                                <p>Capacidad: {mesa.capacidad || estadoInfo.personas} personas</p>

                                {estadoInfo.cliente && (
                                    <>
                                        <hr className="my-2 border-white border-opacity-30" />
                                        <p><span className="font-medium">Cliente:</span> {estadoInfo.cliente}</p>
                                        <p><span className="font-medium">Hora:</span> {estadoInfo.hora}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8">
                <h4 className="font-semibold mb-2">Leyenda:</h4>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                        <span>Disponible</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Pendiente</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                        <span>Confirmada</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                        <span>Ocupada</span>
                    </div>
                </div>
            </div>
        </div>
    );
};