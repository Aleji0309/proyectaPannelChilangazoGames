const { Pool } = require('pg'
);

const dbConfig = new Pool({
    user: "aleleandro",
    host: "localhost",
    database: "chilangazo_db",
    password: "chilangazo_games",
    port: 5432,
});

module.exports = dbConfig;