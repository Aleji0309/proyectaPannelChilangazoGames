
// Funcion para hacer FETCH  de GET al API REST del backend
const url = "http://localhost:3000/api/partidas";
export async function obtenerPartidas() {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function crearPartidas(payload) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const eliminarPartidaSeleccionada = async (id) => {
    const url = `http://localhost:3000/api/partidas/${id}`;

    const response = await fetch(url, { method: "DELETE" });

    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }

    return true;
};

