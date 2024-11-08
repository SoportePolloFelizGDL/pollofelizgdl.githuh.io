// Variables para el resumen de la venta
let total = 0;

function agregarPlatillo(nombre, descripcion, precio) {
    total += precio;
    document.getElementById("total").innerText = total.toFixed(2);
    console.log(`Producto agregado: ${nombre} - $${precio}`);
}


let total = 0;

function agregarPlatillo(nombre, descripcion, precio) {
    const table = document
        .getElementById("ticketTable")
        .getElementsByTagName("tbody")[0];
    let found = false;

    // Recorre todas las filas para ver si el platillo ya está en la tabla
    for (let row of table.rows) {
        const cellDescription = row.cells[1].innerText;
        if (cellDescription.includes(descripcion)) {
            // Si el platillo ya está, actualiza la cantidad y el subtotal
            const quantityCell = row.cells[0];
            const subtotalCell = row.cells[2];
            const currentQuantity = parseInt(quantityCell.innerText);
            const currentSubtotal = parseFloat(
                subtotalCell.innerText.replace("$", "")
            );

            // Incrementa la cantidad
            const newQuantity = currentQuantity + 1;
            quantityCell.innerText = newQuantity;

            // Actualiza el subtotal
            const newSubtotal = currentSubtotal + precio;
            subtotalCell.innerText = `$${newSubtotal.toFixed(2)}`;

            // Actualiza el total
            total += precio;
            document.getElementById("total").innerText = total.toFixed(2);

            found = true;
            break;
        }
    }

    // Si el platillo no se encontró, agrega una nueva fila
    if (!found) {
        const newRow = table.insertRow();
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        cell1.innerHTML = "1";
        cell2.innerHTML = `${nombre} - ${descripcion}`;
        cell3.innerHTML = `$${precio.toFixed(2)}`;
        cell4.innerHTML =
            '<button class="delete-btn" onclick="eliminarPlatillo(this)">X</button>';
        total += precio;
        document.getElementById("total").innerText = total.toFixed(2);
    }
}

function generarFolio() {
    const sucursal = document.getElementById("sucursal").value;
    const fecha = new Date();
    const año = fecha.getFullYear().toString().slice(-2);
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    const segundo = String(fecha.getSeconds()).padStart(2, '0');
    const costo = String(total).replace('.', '').padStart(4, '0');

    return `${sucursal}${año}${mes}${dia}${hora}${minuto}${segundo} ${costo}`;
}

function finalizarVenta() {
    const folio = generarFolio();
    alert(`Venta finalizada.\nFolio: ${folio}\nTotal: $${total.toFixed(2)}`);
    generarCodigoBarras(folio);
    total = 0;
    document.getElementById("total").innerText = total.toFixed(2);
}

function imprimirTicket() {
    const folio = generarFolio();
    const sucursal = document.getElementById("sucursal").value;
    const atendiente = document.getElementById("atendiente").value;
    const servicio = document.getElementById("servicio").value;
    const pago = document.getElementById("pago").value;
    const fecha = new Date().toLocaleString();
    const subtotal = total / 1.16;
    const iva = total - subtotal;
    const pagoCliente = parseFloat(prompt("Ingrese el pago del cliente:", total.toFixed(2)));
    const cambio = pagoCliente - total;

    // Crear una nueva ventana para el ticket
    const ventanaTicket = window.open('', '', 'width=300,height=600');

    // Contenido del ticket en formato HTML
    ventanaTicket.document.write(`
        <html>
        <head>
            <style>
                body { width: 80mm; font-family: Arial, sans-serif; text-align: center; }
                .ticket-header { margin-bottom: 10px; }
                .ticket-content { text-align: left; }
                .ticket-footer { margin-top: 20px; }
                hr { border: 1px dashed #000; }
                .logo { max-width: 100px; margin: 0 auto; }
                .product-row { display: flex; justify-content: space-between; }
                .bold { font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="ticket-header">
                <img src="/LogoPFo.png" alt="Logo Restaurante" />
                <h2>PROMOTORA DE ALIMENTOS LA GRANJA SA DE CV</h2>
                <p>Río de La Loza 1976, El Rosario, 44870 Guadalajara, Jal.</p>
                <p>${fecha}</p>
                <p>Sucursal: ${sucursal}</p>
                <p>Atiende: ${atendiente}</p>
                <p>Servicio: ${servicio === "comedor" ? "Comedor" : "Para Llevar"}</p>
            </div>
            <hr>
            <div class="ticket-content">
                <h3>Detalle de la Venta</h3>
                <table id="ticketTable">
        <thead>
          <tr>
            <th>C.</th>
            <th>Platillo</th>
            <th>Subtotal</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody>
          <!-- Las filas se añadirán aquí -->
        </tbody>
      </table>
                <!-- Fin de los productos -->
                <hr>
                <p class="bold">Subtotal: $${subtotal.toFixed(2)}</p>
                <p class="bold">IVA (16%): $${iva.toFixed(2)}</p>
                <p class="bold">Total: $${total.toFixed(2)}</p>
                <p>Forma de Pago: ${pago}</p>
                <p>Pago del Cliente: $${pagoCliente.toFixed(2)}</p>
                <p>Cambio: $${cambio.toFixed(2)}</p>
                <p>Folio: ${folio}</p>
                <canvas id="codigoBarrasTicket"></canvas>
                <p>facturacionpf.gdl@gmail.com</p>
                <p class="bold">GRACIAS POR SU COMPRA</p>
            </div>
        </body>
        </html>
    `);

    // Generar código de barras en el ticket
    ventanaTicket.onload = () => {
        const canvas = ventanaTicket.document.getElementById("codigoBarrasTicket");
        JsBarcode(canvas, folio, {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 50,
            displayValue: false
        });

        // Abrir el cuadro de impresión después de un breve retraso para cargar el código de barras
        setTimeout(() => ventanaTicket.print(), 500);
    };
}


function generarCodigoBarras(folio) {
    JsBarcode("#codigoBarras", folio, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 50,
        displayValue: true
    });

    async function finalizarVenta() {
        const folio = generarFolio();
        const sucursal = document.getElementById("sucursal").value;
        const atendiente = document.getElementById("atendiente").value;
        const servicio = document.getElementById("servicio").value;
        const pago = document.getElementById("pago").value;

        // Datos de la venta
        const venta = {
            folio,
            sucursal,
            atendiente,
            servicio,
            pago,
            total
        };

        try {
            // Enviar la venta al servidor
            const response = await fetch("http://localhost:3000/venta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(venta)
            });

            if (response.ok) {
                const result = await response.json();
                alert(`Venta finalizada y guardada con éxito.\nFolio: ${folio}\nTotal: $${total.toFixed(2)}`);
                generarCodigoBarras(folio);
                total = 0;
                document.getElementById("total").innerText = total.toFixed(2);
            } else {
                alert("Error al guardar la venta.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor.");
        }
    }
    // Nueva función para limpiar los campos de la venta
    function limpiarCampos() {
        // Reiniciar el total y actualizar en la interfaz
        total = 0;
        document.getElementById("total").innerText = total.toFixed(2);

        // Limpiar los campos de entrada
        //document.getElementById("sucursal").selectedIndex = 0;
        //document.getElementById("atendiente").value = "";
        //document.getElementById("servicio").selectedIndex = 0;
        //document.getElementById("pago").selectedIndex = 0;

        // Limpiar el contenido del canvas de código de barras
        const canvas = document.getElementById("codigoBarras");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    function toggleMenu(menuId) {
        // Obtener todos los menús de productos
        const menus = document.querySelectorAll('.menu-items');

        // Recorrer todos los menús y ocultarlos, excepto el que se selecciona
        menus.forEach(menu => {
            if (menu.id === menuId) {
                menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
            } else {
                menu.style.display = 'none';
            }
        });
    }

}
