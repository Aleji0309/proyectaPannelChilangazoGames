import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";


const partidasIniciales = []

const PartidasPage = () => {

    // declaracion de constantes
    const [partidas, setPartidas] = useState(partidasIniciales);
    const [open, setOpen] = useState(false);

    //formulario para una nueva partida
    const [form, setForm] = useState({
        id: Date.now(),
        jugador: "",
        juego: "",
        nivel: "Fácil",
        fecha: new Date().toISOString().slice(0, 10),
        puntaje: "",
    });


    //funcion para abrir el modal de una nueva partida
    const openModal = () => {
        setOpen(true);
    }

    // funcion para agregar una nueva partida
    const handleNuevaPartida = () => {
        const nuevaPartida = {
            id: Date.now(),
            jugador: "Ale",
            juego: "Mictlán Runner",
            nivel: "Fácil",
            fecha: new Date().toISOString().slice(0, 10),
            puntaje: 3000,

        }

        setPartidas(prev => [...prev, nuevaPartida]);
    }

    //formulario para guardar una partida
    const guardarPartida = () => {
        console.log("Click guardar partida");
        setOpen(false);
    }

    console.log(form.jugador);
    console.log(form.juego);
    console.log(form.nivel);
    console.log(form.fecha);
    console.log(form.puntaje);
    console.log(typeof (form.puntaje));


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
                <Button onClick={handleNuevaPartida} >PARTIDA FAKE</Button>
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
                                value={form.value}
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
                            <Label htmlFor="Puntaje" >Puntaje</Label>
                            <Input id="Puntaje" placeholder="ej. 3000" value={form.puntaje} onChange={e => setForm((prev) => ({ ...prev, puntaje: Number(e.target.value) }))}  >
                            </Input>
                        </div>

                        {/* Botón  Guardar Partida */}
                        <div className="flex gap-4 ">

                            <Button className="bg-green-500 w-[200px]" onClick={guardarPartida}>Guardar</Button>
                            <Button className="bg-red-500 w-[200px]">Cancelar</Button>

                        </div>

                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}


export default PartidasPage;
