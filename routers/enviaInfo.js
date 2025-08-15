const express = require('express');
const router = express.Router();

router.post('/enviarInfo', (req, res) => {
    const { name, subject, message } = req.body;
    
    // Formatear el mensaje con emojis y estructura clara
    const formattedMessage = `📄 *Nuevo mensaje de contacto* 📄\n\n` +
                            `👤 *Nombre:* ${name}\n` +
                            `📌 *Asunto:* ${subject}\n\n` +
                            `📝 *Mensaje:*\n${message}\n\n` +
                            `_Este mensaje fue enviado desde el formulario de contacto_`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(formattedMessage);
    
    // Crear el enlace de WhatsApp
    const whatsappUrl = `https://wa.me/+50685396632?text=${encodedMessage}`;
    const whatsappUrl1 = `https://wa.me/+584145003573?text=${encodedMessage}`;
    
    // Redirigir al usuario a WhatsApp
    res.redirect(whatsappUrl1);
});

module.exports = router;