// Mostrar ventana emergente con platillos
function mostrarCategoria(categoria) {
    document.getElementById("categoriaTitulo").innerText = categoria;
    document.getElementById("categoriaModal").style.display = "block";
}

// Cerrar ventana emergente
function cerrarModal() {
    document.getElementById("categoriaModal").style.display = "none";
}

// Ejemplo de función para agregar un platillo al pedido
function agregarPlatillo(nombre, precio) {
    const tableBody = document.querySelector("#orderTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>1</td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>
            <button onclick="eliminarPlatillo(this)">X</button>
            <button onclick="sumarPlatillo(this)">+</button>
            <button onclick="restarPlatillo(this)">-</button>
        </td>
    `;
    tableBody.appendChild(row);
    actualizarTotales();
}

// Actualizar totales de la venta
function actualizarTotales() {
    // Lógica para calcular el subtotal, IVA y total
}

function nuevaCuenta() {
    // Lógica para limpiar la tabla y resetear totales
}

function cobrar() {
    // Lógica para manejar el cobro
}

// Variables globales para almacenamiento de datos de la venta
let items = []; // Guardará los items con cantidad, nombre y precio

// Mostrar ventana emergente con platillos de la categoría seleccionada
function mostrarCategoria(categoria) {
    document.getElementById("categoriaTitulo").innerText = categoria;
    document.getElementById("categoriaModal").style.display = "block";

    // Ejemplo de platillos por categoría (puedes modificarlo para cargar los platillos reales)
    const platillos = {
        Promociones: [{ nombre: "Combo Familiar", precio: 150 }],
        Familiares: [{ nombre: "Medio Pollo", precio: 100 }, { nombre: "1 Pollo", precio: 180 }],
        Individuales: [{ nombre: "1/4 Pollo", precio: 50 }, { nombre: "Hamburguesa", precio: 70 }],
        // Agrega más categorías y platillos aquí
    };
    renderPlatillos(platillos[categoria] || []);
}

// Renderizar los platillos en la ventana emergente
function renderPlatillos(platillos) {
    const container = document.getElementById("platillos");
    container.innerHTML = ""; // Limpia los platillos anteriores

    platillos.forEach(platillo => {
        const button = document.createElement("button");
        button.innerText = `${platillo.nombre} - $${platillo.precio}`;
        button.onclick = () => agregarPlatillo(platillo.nombre, platillo.precio);
        container.appendChild(button);
    });
}

// Cerrar ventana emergente
function cerrarModal() {
    document.getElementById("categoriaModal").style.display = "none";
}

// Función para agregar un platillo a la lista de pedidos
function agregarPlatillo(nombre, precio) {
    // Verificar si el platillo ya está en la lista y aumentar cantidad
    const existingItem = items.find(item => item.nombre === nombre);
    if (existingItem) {
        existingItem.cantidad++;
    } else {
        items.push({ nombre, precio, cantidad: 1 });
    }
    actualizarTablaPedidos();
    actualizarTotales();
}

// Actualizar la tabla de pedidos en el HTML
function actualizarTablaPedidos() {
    const tableBody = document.querySelector("#orderTable tbody");
    tableBody.innerHTML = ""; // Limpiar tabla

    items.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.cantidad}</td>
            <td>${item.nombre}</td>
            <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
            <td>
                <button onclick="eliminarPlatillo(${index})">X</button>
                <button onclick="sumarPlatillo(${index})">+</button>
                <button onclick="restarPlatillo(${index})">-</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para actualizar los totales
function actualizarTotales() {
    const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("iva").innerText = iva.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// Función para sumar cantidad de un platillo
function sumarPlatillo(index) {
    items[index].cantidad++;
    actualizarTablaPedidos();
    actualizarTotales();
}

// Función para restar cantidad de un platillo
function restarPlatillo(index) {
    if (items[index].cantidad > 1) {
        items[index].cantidad--;
    } else {
        items.splice(index, 1); // Si llega a 0, elimina el item
    }
    actualizarTablaPedidos();
    actualizarTotales();
}

// Función para eliminar un platillo de la lista
function eliminarPlatillo(index) {
    items.splice(index, 1);
    actualizarTablaPedidos();
    actualizarTotales();
}

// Función para limpiar la cuenta y resetear todos los datos
function nuevaCuenta() {
    items = [];
    actualizarTablaPedidos();
    actualizarTotales();
    document.getElementById("subtotal").innerText = "0.00";
    document.getElementById("iva").innerText = "0.00";
    document.getElementById("total").innerText = "0.00";
}

// Diccionario de platillos para cada categoría
const platillosPorCategoria = {
    Promociones: [
        { nombre: "Combo Familiar", precio: 150 },
        { nombre: "Combo 2 Pollo", precio: 280 },
    ],
    Familiares: [
        { nombre: "Medio Pollo", precio: 100 },
        { nombre: "1 Pollo", precio: 180 },
        { nombre: "Pollo y Medio", precio: 250 },
        { nombre: "2 Pollos", precio: 320 }
    ],
    Individuales: [
        { nombre: "1/4 Pollo", precio: 50 },
        { nombre: "Hamburguesa con Papas", precio: 70 },
        { nombre: "Nuggets con Papas", precio: 60 }
    ],
    // Agrega más categorías y platillos aquí
};

// Función para mostrar el modal con los platillos de una categoría
function mostrarCategoria(categoria) {
    const modal = document.getElementById("categoriaModal");
    const categoriaTitulo = document.getElementById("categoriaTitulo");
    const platillosContainer = document.getElementById("platillos");

    // Actualizar título del modal
    categoriaTitulo.innerText = categoria;

    // Limpiar los platillos anteriores del modal
    platillosContainer.innerHTML = "";

    // Obtener los platillos de la categoría seleccionada
    const platillos = platillosPorCategoria[categoria] || [];

    // Renderizar los platillos en el modal
    platillos.forEach(platillo => {
        const button = document.createElement("button");
        button.classList.add("platillo-btn");
        button.innerText = `${platillo.nombre} - $${platillo.precio}`;
        button.onclick = () => {
            agregarPlatillo(platillo.nombre, platillo.precio);
            cerrarModal(); // Cerrar el modal después de agregar el platillo
        };
        platillosContainer.appendChild(button);
    });

    // Mostrar el modal
    modal.style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("categoriaModal").style.display = "none";
}

let pagosParciales = [];
let totalVenta = 0; // Define esto al calcular el total de la venta

// Función para mostrar el modal de pago
function abrirPagoModal() {
    document.getElementById("pagoModal").style.display = "block";
}

// Función para cerrar el modal de pago
function cerrarPagoModal() {
    document.getElementById("pagoModal").style.display = "none";
}

// Función para agregar un pago parcial
function agregarPagoParcial() {
    const metodo = document.getElementById("metodoPago").value;
    const cantidad = parseFloat(document.getElementById("cantidadPago").value);

    if (cantidad > 0) {
        pagosParciales.push({ metodo, cantidad });
        actualizarPagosParciales();
        cerrarPagoModal();
    } else {
        alert("Por favor, ingresa una cantidad válida.");
    }
}

// Función para actualizar la lista de pagos parciales en el DOM
function actualizarPagosParciales() {
    const totalPagado = pagosParciales.reduce((acc, pago) => acc + pago.cantidad, 0);
    const cambio = totalPagado - totalVenta;
    let pagosListHTML = "";

    pagosParciales.forEach((pago, index) => {
        pagosListHTML += `<p>Pago ${index + 1}: ${pago.metodo} - $${pago.cantidad.toFixed(2)}</p>`;
    });

    document.getElementById("totalPagado").innerText = `Total Pagado: $${totalPagado.toFixed(2)}`;
    document.getElementById("cambio").innerText = cambio >= 0 ? `Cambio: $${cambio.toFixed(2)}` : "Cambio: $0.00";
}

// Función para iniciar el proceso de pago
function cobrar() {
    if (pagosParciales.length === 0) {
        abrirPagoModal();
    } else {
        alert("El monto total ya ha sido cubierto.");
    }
}

// Función para generar el contenido del ticket y mostrar el modal
function verTicket() {
    const modal = document.getElementById("ticketModal");
    const ticketContenido = document.getElementById("ticketContenido");

    const totalPagado = pagosParciales.reduce((acc, pago) => acc + pago.cantidad, 0);
    const cambio = totalPagado - totalVenta;

    let ticketHTML = `
        <h3>Resumen de Venta</h3>
        <p>Subtotal: $${(totalVenta / 1.16).toFixed(2)}</p>
        <p>IVA (16%): $${(totalVenta - totalVenta / 1.16).toFixed(2)}</p>
        <p>Total a Pagar: $${totalVenta.toFixed(2)}</p>
        <h4>Pagos Parciales:</h4>`;

    pagosParciales.forEach((pago, index) => {
        ticketHTML += `<p>Pago ${index + 1}: ${pago.metodo} - $${pago.cantidad.toFixed(2)}</p>`;
    });

    ticketHTML += `
        <p>Total Pagado: $${totalPagado.toFixed(2)}</p>
        <p>Cambio: $${cambio >= 0 ? cambio.toFixed(2) : 0.00}</p>
        <p>Gracias por tu compra</p>`;

    ticketContenido.innerHTML = ticketHTML;
    modal.style.display = "block";
}

// Función para cerrar el modal del ticket
function cerrarTicketModal() {
    document.getElementById("ticketModal").style.display = "none";
}

// Función para imprimir el ticket
function imprimirTicket() {
    const ticketContenido = document.getElementById("ticketContenido").innerHTML;
    const ventanaImpresion = window.open("", "_blank");
    ventanaImpresion.document.write(`<html><body>${ticketContenido}</body></html>`);
    ventanaImpresion.document.close();
    ventanaImpresion.print();
}

// Mostrar ticket cuando el pago es completo
function finalizarVenta() {
    const totalPagado = pagosParciales.reduce((acc, pago) => acc + pago.cantidad, 0);
    if (totalPagado >= totalVenta) {
        verTicket();
    } else {
        alert("Faltan pagos para completar la venta.");
    }
}


