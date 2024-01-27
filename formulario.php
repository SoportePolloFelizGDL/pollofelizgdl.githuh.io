<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = $_POST["Nombre"];
    $apellido = $_POST["Apellido"];
    $email = $_POST["E-mail"];
    $comentario = $_POST["Comentario"];

    // Configura el destinatario del correo
    $destinatario = "soporte@pollofelizgdl.com"; // Reemplaza con tu dirección de correo electrónico

    // Asunto del correo
    $asunto = "Nuevo comentario de $nombre $apellido";

    // Mensaje del correo
    $mensaje = "Nombre: $nombre\nApellido: $apellido\nE-mail: $email\nComentario:\n$comentario";

    // Encabezados del correo
    $headers = "From: $email";

    // Envía el correo
    mail($destinatario, $asunto, $mensaje, $headers);

    // Puedes redirigir a una página de agradecimiento o mostrar un mensaje
    echo "Comentario enviado correctamente. Gracias por tu opinión.";
} else {
    // Redirige si intentan acceder directamente al script PHP.
    header("Location: index.html");
    exit();
}
?>
