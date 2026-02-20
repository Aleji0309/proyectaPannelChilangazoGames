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


    //funcion para guardar una partida
    const guardarPartida = () => {
        const nuevaPartida = {
            id: Date.now(),
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
        <div className="partidas-container mt-8">
            <h1>Partidas Page</h1>
            <div className="partidas-card bg-zinc-800 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Partida</h2>
                {partidas.length === 0 ? (
                    <p className="text-zinc-400">No hay partidas disponibles</p>
                ) : <div className="partidas">
                    <p>Hay  #{partidas.length} partidas</p>
                    {partidas.map((partida) => (
                        <div key={partida.id}>

                            <p>Partida - {partida.id} <br /> </p>
                            <p>Jugador - {partida.jugador} <br /> </p>
                            <p>Juego - {partida.juego} <br /> </p>
                            <p>Nivel - {partida.nivel} <br /> </p>
                            <p>Fecha - {partida.fecha} <br /> </p>
                            <p>Puntaje - {partida.puntaje} <br /> </p>
                        </div>)

                    )}

                </div>
                }
                <Button onClick={openModal} >Nueva Partida</Button>
                <br />

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
