const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ventasFilePath = './ventas.json';

// Endpoint para guardar una venta
app.post('/guardar-venta', (req, res) => {
    const nuevaVenta = req.body;

    // Leer las ventas existentes
    let ventas = [];
    if (fs.existsSync(ventasFilePath)) {
        ventas = JSON.parse(fs.readFileSync(ventasFilePath));
    }

    // Agregar la nueva venta
    ventas.push(nuevaVenta);

    // Guardar las ventas actualizadas en el archivo
    fs.writeFileSync(ventasFilePath, JSON.stringify(ventas, null, 2));
    res.status(201).send({ message: 'Venta guardada con éxito' });
});

// Endpoint para obtener todas las ventas
app.get('/obtener-ventas', (req, res) => {
    let ventas = [];
    if (fs.existsSync(ventasFilePath)) {
        ventas = JSON.parse(fs.readFileSync(ventasFilePath));
    }
    res.send(ventas);
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
