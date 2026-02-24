const express = require('express');
const router = express.Router();
const dbConfig = require('../src/db');

// GET /api/partidas - READ all
router.get('/', async (req, res) => {
    try {
        const result = await dbConfig.query(
            'SELECT * FROM partidas ORDER BY id ASC'
        );
        console.log(result);
        console.log(typeof (result));
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener partidas" });
    }
});

// GET /api/partidas - READ only one
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    // 1) Validar ID
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        // 2) Query parametrizada (segura)
        const result = await dbConfig.query(
            'SELECT * FROM partidas WHERE id = $1',
            [id]

        );

        // console.log(result);
        // console.log(typeof (result));

        // 3) Si no existe
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Partida no encontrada" });
        }

        // 4) Devolver un solo objeto
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener partida" });
    }


});


// POST /api/partidas - Create one
router.post('/', async (req, res) => {
    try {
        const { jugador, juego, nivel, fecha, puntaje } = req.body;

        // Validación mínima
        if (!jugador || jugador.trim() === "") {
            return res.status(400).json({ error: "jugador es requerido" });
        }

        const result = await dbConfig.query(
            `INSERT INTO partidas (jugador, juego, nivel, fecha, puntaje)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [jugador.trim(), juego?.trim() ?? "", nivel ?? "Fácil", fecha, Number(puntaje ?? 0)]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al crear partida" });
    }
});

// PUT /api/partidas - Update one
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    const { jugador, juego, nivel, fecha, puntaje } = req.body;

    if (!jugador || jugador.trim() === "") {
        return res.status(400).json({ error: "jugador es requerido" });
    }

    try {
        const result = await dbConfig.query(
            `UPDATE partidas
            SET jugador = $1, juego = $2, nivel = $3, fecha = $4, puntaje = $5
            WHERE id = $6
            RETURNING *`,
            [jugador.trim(), juego?.trim() ?? "", nivel ?? "Fácil", fecha, Number(puntaje ?? 0), id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Partida no encontrada" });
        }

        return res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error modificar partida" });
    }
});


// DELETE /api/partidas - Delete one
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const result = await dbConfig.query(
            'DELETE FROM partidas WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Partida no encontrada" });
        }

        return res.status(200).json({ deleted: result.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al eliminar la partida" });
    }
});



module.exports = router;