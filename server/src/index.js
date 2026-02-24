// 1. Importar el módulo express
const express = require('express');
const partidasRoutes = require('../routes/partidas.routes');
const dbConfig = require('./db');


// 2. Inicializar la aplicación express
const app = express();

// 3. Definir un puerto
const PORT = 3000;

// 4. Crear una ruta básica (opcional, para probar)

// PROBAR CONEXIÓN A LA DB
dbConfig.query('SELECT NOW()')
    .then(result => {
        console.log("✅ DB conectada");
        console.log("Hora del servidor:", result.rows[0].now);
    })
    .catch(err => {
        console.error("❌ Error conectando a la DB:", err.message);
    });


// Ruta básica
// app.get('/', (req, res) => {
//     res.send('¡Hola Mundo!');
// });

app.use('/api/partidas', partidasRoutes);
app.use('/api/partidas', partidasRoutes);

// 5. Escuchar en el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});




