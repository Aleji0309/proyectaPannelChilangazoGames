
const [partidas, setPartidas] = useState(partidasIniciales);

const handleNuevaPartida = () => {
    setOpen(true);
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