import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";



const partidasIniciales = []

const PartidasPage = () => {
    const [partidas, setPartidas] = useState(partidasIniciales);
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    }


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
                            PRUEBA DE MODAL
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}


export default PartidasPage;
