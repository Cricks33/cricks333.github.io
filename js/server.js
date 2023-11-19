const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware para manejar datos JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el formulario
app.post('/sendmail', (req, res) => {
    const { name, email, message } = req.body;

    // Configura el transporte de nodemailer (puedes usar un servicio SMTP real aquí)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tucorreoelectronico@gmail.com',
            pass: 'tucontraseñadeGmail'
        }
    });

    // Configura el contenido del correo electrónico
    const mailOptions = {
        from: 'tucorreoelectronico@gmail.com',
        to: 'christophernavarrete33@example.com',
        subject: 'Nuevo mensaje de contacto',
        text: `Nombre: ${name}\nCorreo electrónico: ${email}\nMensaje: ${message}`
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo electrónico');
        } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.status(200).send('Correo electrónico enviado correctamente');
        }
    });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});