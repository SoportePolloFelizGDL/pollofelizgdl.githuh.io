// Variables globales
let order = [];
let total = 0;

// Función para mostrar/ocultar submenús
function toggleMenu(sectionId) {
    const submenu = document.getElementById(sectionId);
    submenu.style.display = submenu.style.display === "none" ? "block" : "none";
}

// Función para agregar un producto al pedido
function addProduct(name, price) {
    const item = { name, price, quantity: 1 };
    order.push(item);
    total += price;
    updateOrderSummary();
}

// Función para actualizar el resumen de la venta
function updateOrderSummary() {
    const saleSummary = document.getElementById("saleSummary");
    saleSummary.innerHTML = ""; // Limpiar el contenido anterior

    order.forEach((item, index) => {
        const itemElement = document.createElement("p");
        itemElement.innerHTML = `${item.quantity} x ${item.name} - $${item.price * item.quantity}`;
        saleSummary.appendChild(itemElement);
    });

    document.getElementById("totalPrice").textContent = total.toFixed(2);
}

// Función para borrar el pedido
function clearOrder() {
    order = [];
    total = 0;
    updateOrderSummary();
}

// Función para procesar el pago
function checkout() {
    const paymentType = prompt("Seleccione el tipo de pago (efectivo, crédito, débito):");
    if (!paymentType) return;

    const paymentAmount = parseFloat(prompt("Ingrese la cantidad con la que paga el cliente:"));
    if (isNaN(paymentAmount) || paymentAmount < total) {
        alert("La cantidad es insuficiente. Intente de nuevo.");
        return;
    }

    const change = paymentAmount - total;
    alert(`Cambio: $${change.toFixed(2)}`);
    
    // Guardar la venta en la base de datos
    saveOrderToDatabase(paymentType, paymentAmount, change);
    clearOrder();
}

// Función para guardar la orden en la base de datos
async function saveOrderToDatabase(paymentType, paymentAmount, change) {
    const attendantName = document.getElementById("attendantName").value;
    const branch = document.getElementById("branch").value;
    const serviceType = document.getElementById("serviceType").value;
    
    const orderData = {
        attendantName,
        branch,
        serviceType,
        items: order,
        total,
        paymentType,
        paymentAmount,
        change,
        date: new Date().toISOString()
    };
    
    // Aquí iría la llamada a la API para guardar en la base de datos
    // Ejemplo: await fetch('/api/saveOrder', { method: 'POST', body: JSON.stringify(orderData) });
    console.log("Orden guardada en la base de datos:", orderData);
}

// Función para imprimir el ticket
function printTicket() {
    const branch = document.getElementById("branch").value;
    const serviceType = document.getElementById("serviceType").value;
    const attendantName = document.getElementById("attendantName").value;

    let ticket = "Restaurante XYZ\n";
    ticket += `Sucursal: ${branch}\n`;
    ticket += `Servicio: ${serviceType}\n`;
    ticket += `Atiende: ${attendantName}\n\n`;
    ticket += "Resumen de la venta:\n";

    order.forEach((item) => {
        ticket += `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    ticket += `\nTotal: $${total.toFixed(2)}\n`;
    console.log(ticket);
    alert("Ticket generado en consola");

    function printTicket() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
    
        const branch = document.getElementById("branch").value;
        const serviceType = document.getElementById("serviceType").value;
        const attendantName = document.getElementById("attendantName").value;
    
        let yPosition = 10; // Posición inicial en el PDF
    
        doc.setFontSize(12);
        doc.text("Restaurante XYZ", 10, yPosition);
        yPosition += 10;
        doc.text(`Sucursal: ${branch}`, 10, yPosition);
        yPosition += 10;
        doc.text(`Servicio: ${serviceType}`, 10, yPosition);
        yPosition += 10;
        doc.text(`Atiende: ${attendantName}`, 10, yPosition);
        yPosition += 10;
    
        // Agregar los detalles del pedido
        doc.text("Resumen de la venta:", 10, yPosition);
        yPosition += 10;
    
        order.forEach(item => {
            doc.text(`${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`, 10, yPosition);
            yPosition += 10;
        });
    
        yPosition += 10;
        doc.text(`Total: $${total.toFixed(2)}`, 10, yPosition);
    
        // Abrir PDF en una nueva ventana para su impresión
        doc.save("ticket.pdf"); // Guarda como PDF
    }
    
}
