import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import PartidaFormModal from "./PartidaFormModal";
import PartidasContainer from "./PartidasTable";
import { crearPartidas, obtenerPartidas, eliminarPartidaSeleccionada } from "server/src/api/partidasApi";



const PartidasPage = () => {

    // declaracion de estados
    const [partidas, setPartidas] = useState([]);
    const [open, setOpen] = useState(false);
    const formVacio = {
        jugador: "",
        juego: "",
        nivel: "Fácil",
        fecha: new Date().toISOString().slice(0, 10),
        puntaje: 0,
    };


    // estado para obtener partidas
    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await obtenerPartidas();
                setPartidas(data);
            } catch (error) {
                console.error("Error cargando partidas:", error);
            }
        };

        cargar();
    }, []);



    //formulario para una nueva partida
    const [form, setForm] = useState(formVacio);
    const jugadorVacio = form.jugador.trim() === "";


    //funcion para abrir el modal de una nueva partida
    const openModal = () => {
        setOpen(true);
    }

    // funcion para limpiar el formulario
    const limpiarFormulario = () => {
        setForm(formVacio);
    }


    //funcion para guardar una partida
    //estado para crear partidas
    const guardarPartida = async () => {
        try {
            const payload = {
                jugador: form.jugador,
                juego: form.juego,
                nivel: form.nivel,
                fecha: form.fecha,
                puntaje: form.puntaje,
            };

            const nueva = await crearPartidas(payload);
            setPartidas(prev => [...prev, nueva]);

            limpiarFormulario();
            setOpen(false);

        } catch (error) {
            console.error("Error creando partida:", error);
        }
    };

    // funcion para elminar una partida
    // estado para eliminar una partida 
    const eliminarPartida = async (id) => {
        try {
            await eliminarPartidaSeleccionada(id);

            setPartidas((prev) => prev.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error eliminando partida:", error);
        }
    };


    //funcion para cancelar una partida
    const cancelarPartida = () => {
        limpiarFormulario();
        setOpen(false);
    }


    return (
        <div className="w-full overflow-x-auto m-0">
            <div className="partidas-container bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6  w-[1200px] mx-auto max-w-none mt-20">
                <div className="header flex  gap-8">
                    <h1 className="text-4xl mb-8 font-bold text-yellow-400" >Chilangazo League</h1>
                    <Button onClick={openModal} className="mb-8 text-2xl bg-green-500 uppercase p-6" >Nueva Partida</Button>

                </div>

                {/* FORMULARIO CONTENEDOR */}
                <PartidaFormModal
                    open={open}
                    onOpenChange={setOpen}
                    form={form}
                    setForm={setForm}
                    onSave={guardarPartida}
                    onCancel={cancelarPartida}
                    disableSave={jugadorVacio}
                />

                {partidas.length === 0 ? (
                    <p className="text-zinc-400 text-2xl">No hay partidas disponibles</p>
                ) : <div className="mt-4 overflow-auto max-h-[420px] pr-2">

                    {/* PARTIDAS CONTENEDOR */}
                    <PartidasContainer
                        partidas={partidas}
                        onDelete={eliminarPartida}
                    />
                </div>

                }
            </div>
        </div>
    );

}

export default PartidasPage;
