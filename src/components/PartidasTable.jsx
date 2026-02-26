import { Button } from "./ui/button";


const PartidasContainer = ({
    partidas,
    onDelete,
    onEditar
}) => {

    return (
        <div>
            {/* CONTENEDOR HEADER */}
            <header className="grid grid-cols-[70px_160px_140px_100px_160px_100px_100px] gap-8 text-lg text-zinc-400 font-semibold px-4 py-2 border-b border-white/10 sticky top-0 z-10 bg-black/40 backdrop-blur-md mb-4 uppercase" >
                <h2>Partida</h2>
                <h2>Jugador</h2>
                <h2>Juego</h2>
                <h2>Nivel</h2>
                <h2>Fecha</h2>
                <h2>Puntaje</h2>
                <h2>Acción</h2>

            </header>

            {/* CONTENEDOR PARTIDA */}
            {
                partidas.map((partida) => (
                    <div key={partida.id} className="grid grid-cols-[70px_160px_140px_100px_160px_100px_100px] gap-8 items-center bg-white/5 border border-white/10  px-4 py-2 hover:bg-white/10 transition cursor-pointer mb-4">
                        <p>{partida.id}</p>
                        <p>{partida.jugador}</p>
                        <p>{partida.juego}</p>
                        <p>{partida.nivel}</p>
                        <p>{partida.fecha}</p>
                        <p>{partida.puntaje}</p>
                        <div className="flex gap-4" >
                            <Button className="bg-blue-500" onClick={() => onEditar(partida)}>Editar</Button>
                            <Button className="bg-red-500" onClick={() => onDelete(partida.id)} >Eliminar</Button>
                        </div>
                    </div>
                ))
            }
        </div>);
}

export default PartidasContainer;