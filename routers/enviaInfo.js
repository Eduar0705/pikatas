const express = require('express');
const router = express.Router();

router.post('/enviarInfo', (req, res) => {
    const { nombre, telefono, fecha, hora, comensales, email, comentarios} = req.body;
    
    // Formatear el mensaje con emojis y estructura clara
    const formattedMessage = `📄 *Nuevo mensaje de contacto* 📄\n\n` +
                            `👤 *Nombre:* ${nombre}\n` +
                            `📞 *Telefono:* ${telefono}\n\n` +
                            `📅 *Fecha:* ${fecha}\n\n` +
                            `⏰ *Hora:* ${hora}\n\n` +
                            `🍽️ *Comensales:* ${comensales}\n\n` +
                            `📧 *Email:* ${email}\n\n` +
                            `📝 *Mensaje:*\n${comentarios}\n\n` +
                            `_Este mensaje fue enviado desde el formulario de contacto_`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(formattedMessage);
    
    // Crear el enlace de WhatsApp
    const whatsappUrl1 = `https://wa.me/+584145003573?text=${encodedMessage}`;
    
    // Redirigir al usuario a WhatsApp
    res.redirect(whatsappUrl1);
});

module.exports = router;