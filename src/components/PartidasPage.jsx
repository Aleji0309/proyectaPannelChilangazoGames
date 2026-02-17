import { useState } from "react";
import { Button } from "./ui/button";


const partidasIniciales = [
    {
        id: 1,
        name: "Partida 1",
        nivel: 1,
        fecha: "2024-06-01",
        puntaje: 1000,
    },
    {
        id: 2,
        name: "Partida 2",
        nivel: 2,
        fecha: "2024-06-02",
        puntaje: 2500,
    }
]



const PartidasPage = () => {
    const [partidas, setPartidas] = useState(partidasIniciales);

    const handleNuevaPartida = () => {
        const nuevaPartida = {
            id: Date.now(),
            name: "Partida " + (partidas.length + 1),
            fecha: Date.now(),
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
                    {partidas.map((partida) => (<div key={partida.id}>{partida.name}</div>))}

                </div>
                }
                <Button onClick={handleNuevaPartida} >Agregar Partida</Button>
            </div>
        </div>
    );
}


export default PartidasPage;
