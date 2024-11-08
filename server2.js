const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Configuración de body-parser
app.use(bodyParser.json());

// Conexión a la base de datos SQLite
const db = new sqlite3.Database("./ventas.db", (err) => {
    if (err) {
        console.error("Error al abrir la base de datos:", err.message);
    } else {
        console.log("Conectado a la base de datos SQLite.");
        db.run(`
            CREATE TABLE IF NOT EXISTS ventas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                folio TEXT NOT NULL,
                sucursal TEXT,
                atendiente TEXT,
                servicio TEXT,
                pago TEXT,
                total REAL,
                fecha TEXT
            )
        `);
    }
});

// Ruta para agregar una venta
app.post("/venta", (req, res) => {
    const { folio, sucursal, atendiente, servicio, pago, total } = req.body;
    const fecha = new Date().toISOString();

    const sql = `INSERT INTO ventas (folio, sucursal, atendiente, servicio, pago, total, fecha)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [folio, sucursal, atendiente, servicio, pago, total, fecha];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Ruta para obtener todas las ventas
app.get("/ventas", (req, res) => {
    const sql = "SELECT * FROM ventas";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({
            data: rows
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
