import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";


const partidasIniciales = []

const PartidasPage = () => {

    // declaracion de estados
    const [partidas, setPartidas] = useState(partidasIniciales);
    const [open, setOpen] = useState(false);
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


    // funcion para generar id random
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const randomNumber = getRandomInt(1, 1000)


    //funcion para guardar una partida
    const guardarPartida = () => {
        const nuevaPartida = {
            id: randomNumber,
            jugador: form.jugador,
            juego: form.juego,
            nivel: form.nivel,
            fecha: form.fecha,
            puntaje: form.puntaje,

        }
        setPartidas(prev => [...prev, nuevaPartida]);
        limpiarFormulario();
        setOpen(false);
    }


    //funcion para cancelar una partida
    const cancelarPartida = () => {
        limpiarFormulario();
        setOpen(false);
    }


    return (
        <div className="w-full oerflow-x-auto m-0">
            <div className="partidas-container bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-6  w-[1200px] mx-auto max-w-none mt-20">
                <div className="header">
                    <h1 className="text-4xl mb-8 font-bold text-yellow-400" >Chilangazo League</h1>

                    <Button onClick={openModal} className="mb-8 text-2xl bg-red-500 uppercase p-8" >Nueva Partida</Button>
                </div>

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


                <br />
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nueva Partida</DialogTitle>
                            <DialogDescription>Descripción de la partida</DialogDescription>
                        </DialogHeader>

                        {/* INPUT Jugador */}
                        <div className="grid gap-4">
                            <Label htmlFor="jugador">Jugador</Label>
                            <Input
                                id="jugador"
                                type="text"
                                placeholder="Jugador"
                                value={form.jugador}
                                onChange={e => setForm((prev) => ({ ...prev, jugador: e.target.value }))}
                            ></Input>

                        </div>
                        {/* INPUT JUEGO */}
                        <div className="grid gap-6">
                            <Label htmlFor="juego" >Juego</Label>
                            <Input
                                id="juego"
                                type="text"
                                placeholder="Mictlán Runner"
                                value={form.juego}
                                onChange={e => setForm((prev) => ({ ...prev, juego: e.target.value }))}
                            />
                        </div>

                        {/* INPUT Nivel */}
                        <div className="grid gap-6">
                            <Label htmlFor="nivel">Nivel</Label>
                            <Select id="nivel" value={form.nivel} onValueChange={(nivelSeleccionado) => setForm((prev) => ({ ...prev, nivel: nivelSeleccionado }))}  >
                                <SelectTrigger>
                                    <SelectValue placeholder="Nivel" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Fácil">Fácil</SelectItem>
                                        <SelectItem value="Medio">Medio</SelectItem>
                                        <SelectItem value="Difícil">Difícil</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* INPUT Fecha */}
                        <div className="grid gap-6">
                            <Label htmlFor="fecha">Fecha</Label>
                            <Input
                                id="fecha"
                                type="date"
                                value={form.fecha}
                                placeholder="Fecha de la Partida"
                                onChange={e => setForm((prev) => ({ ...prev, fecha: e.target.value }))}
                            >
                            </Input>
                        </div>

                        {/* INPUT Puntaje */}
                        <div className="grid gap-4">
                            <Label htmlFor="puntaje" >Puntaje</Label>
                            <Input id="puntaje" placeholder="ej. 3000" value={form.puntaje} onChange={e => setForm((prev) => ({ ...prev, puntaje: Number(e.target.value) }))}  >
                            </Input>
                        </div>

                        {/* Botón  Guardar Partida */}
                        <div className="flex gap-4 ">
                            <Button className="bg-green-500 w-[200px]" onClick={guardarPartida} disabled={jugadorVacio} >Guardar</Button>
                            <Button className="bg-red-500 w-[200px]" onClick={cancelarPartida} >Cancelar</Button>
                        </div>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    );
}


export default PartidasPage;
