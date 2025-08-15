const conectar = require("mysql");

const conexion = conectar.createConnection({
    host: "mysql-sistems.alwaysdata.net",
    user: "sistems",
    password: "31466704",
    database: "sistems_pikatas"
});

conexion.connect(function(err){
    if (err) {
        throw err;
    }else{
        console.log("Conexión exitosa a la base de datos");
    }
});

module.exports = conexion;