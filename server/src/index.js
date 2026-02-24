const express = require('express');
const cors = require("cors");
const dbConfig = require('./db');
const partidasRoutes = require('../routes/partidas.routes');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

dbConfig.query('SELECT NOW()')
    .then(result => {
        console.log("✅ DB conectada");
        console.log("Hora del servidor:", result.rows[0].now);
    })
    .catch(err => {
        console.error("❌ Error conectando a la DB:", err.message);
    });

app.use('/api/partidas', partidasRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});