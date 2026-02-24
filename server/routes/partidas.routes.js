const express = require('express');
const router = express.Router();
const dbConfig = require('../src/db');

// GET /api/partidas - READ all
router.get('/', async (req, res) => {
    try {
        const result = await dbConfig.query(
            'SELECT * FROM partidas ORDER BY id ASC'
        );
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

module.exports = router;