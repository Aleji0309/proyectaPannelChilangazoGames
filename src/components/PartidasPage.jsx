import { useState } from "react";
import { Button } from "./ui/button";

import PartidaFormModal from "./PartidaFormModal";

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

                    <header className="grid grid-cols-[100px_160px_1fr_120px_140px_100px] gap-8 text-lg text-zinc-400 font-semibold px-4 py-2 border-b border-white/10 sticky top-0 z-10 bg-black/40 backdrop-blur-md mb-4 uppercase" >
                        <h2>Partida</h2>
                        <h2>Jugador</h2>
                        <h2>Juego</h2>
                        <h2>Nivel</h2>
                        <h2>Fecha</h2>
                        <h2>Puntaje</h2>
                    </header>

                    {partidas.map((partida) => (
                        <div key={partida.id} className="grid grid-cols-[100px_160px_1fr_120px_140px_100px] gap-8 items-center bg-white/5 border border-white/10  px-4 py-2 hover:bg-white/10 transition cursor-pointer mb-4">
                            <p>{partida.id}</p>
                            <p>{partida.jugador}</p>
                            <p>{partida.juego}</p>
                            <p>{partida.nivel}</p>
                            <p>{partida.fecha}</p>
                            <p>{partida.puntaje}</p>
                        </div>
                    ))}
                </div>

                }
            </div>
        </div>
    );
}


export default PartidasPage;
