//IMPORTAR LIBRERIAS
const express = require('express');
const session = require('express-session');
const app = express();


//CONFIGURACIONES
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Configuración de la session
app.use(session({
    secret: 'mi-clave-secreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

//RUTAS ESTATICAS
app.use(express.static('public'));

//PUERTO DEL SERVIDOR
const PORT = process.env.PORT || 3009;
app.listen(PORT, function(){
    if(PORT === 3009){
        console.log("http://localhost:3009");
    } else {
        console.log(PORT);
    }
});