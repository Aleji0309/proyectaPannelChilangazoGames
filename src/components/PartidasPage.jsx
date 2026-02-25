import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import PartidaFormModal from "./PartidaFormModal";
import PartidasContainer from "./PartidasTable";



const PartidasPage = () => {

    // declaracion de estados
    const [partidas, setPartidas] = useState([]);
    const [open, setOpen] = useState(false);
    const [nextId, setNextId] = useState(1);
    const formVacio = {
        jugador: "",
        juego: "",
        nivel: "Fácil",
        fecha: new Date().toISOString().slice(0, 10),
        puntaje: 0,
    };

    // Funcion para hacer FETCH  de GET al API REST del backend
    useEffect(() => {
        fetch("http://localhost:3000/api/partidas")
            .then((res) => res.json())
            .then((result) => {
                setPartidas(result);
                console.log("Success ", result);
            })
            .catch((error) => {
                console.log("Error", error);
            });
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
        console.log("formularior limpi");
        setForm(formVacio);
    }

    // funcion FECTH POST API REST
    async function fetchPost() {
        const payload = {
            jugador: form.jugador,
            juego: form.juego,
            nivel: form.nivel,
            fecha: form.fecha,
            puntaje: form.puntaje,
        };

        const response = await fetch('http://localhost:3000/api/partidas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        setPartidas(prev => [...prev, data]);
    }

    //funcion para guardar una partida
    const guardarPartida = async () => {
        await fetchPost();
        limpiarFormulario();
        setOpen(false);
    };

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
