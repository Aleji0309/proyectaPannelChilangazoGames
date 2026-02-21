import { useState } from "react";
import { Button } from "./ui/button";

import PartidaFormModal from "./PartidaFormModal";
import PartidasContainer from "./PartidasTable";


const partidasIniciales = []

const PartidasPage = () => {

    // declaracion de estados
    const [partidas, setPartidas] = useState(partidasIniciales);
    const [open, setOpen] = useState(false);
    const [nextId, setNextId] = useState(1);
    const formVacio = {
        jugador: "",
        juego: "",
        nivel: "Fácil",
        fecha: new Date().toISOString().slice(0, 10),
        puntaje: 0,
    };

    //formulario para una nueva partida
    const [form, setForm] = useState(formVacio);

    const jugadorVacio = form.jugador.trim() === "";


    //funcion para abrir el modal de una nueva partida
    const openModal = () => {
        setOpen(true);
    }

    // funcion para limpiar el formulario
    const limpiarFormulario = () => {
        console.log("formularior limpi");
        setForm(formVacio);
    }

    //funcion para guardar una partida
    const guardarPartida = () => {
        const nuevaPartida = {
            id: nextId,
            jugador: form.jugador,
            juego: form.juego,
            nivel: form.nivel,
            fecha: form.fecha,
            puntaje: form.puntaje,

        }
        setPartidas(prev => [...prev, nuevaPartida]);
        limpiarFormulario();
        setOpen(false);
        setNextId(prev => prev + 1);
    }

    //funcion para cancelar una partida
    const cancelarPartida = () => {
        limpiarFormulario();
        setOpen(false);
    }


    return (
        <div className="w-full overflow-x-auto m-0">
            <div className="partidas-container bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6  w-[1200px] mx-auto max-w-none mt-20">
                <div className="header">
                    <h1 className="text-4xl mb-8 font-bold text-yellow-400" >Chilangazo League</h1>

                    <Button onClick={openModal} className="mb-8 text-2xl bg-red-500 uppercase p-8" >Nueva Partida</Button>
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
                    />
                </div>

                }
            </div>
        </div>
    );
}


export default PartidasPage;
