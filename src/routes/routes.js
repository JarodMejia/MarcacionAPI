const express = require("express");
// Importa el codigo de Feed
const feedController = require("../controllers/feed");
// Crea una variable para enroutar las funciones
const router = express.Router();

//router.get("/trafos", feedController.getData); //Valores principales para mandar a la app
router.post("/verificacion", feedController.Verificacion);   
router.post("/registro", feedController.Registro);  
router.post("/iniciomarcacion", feedController.InicioMarcacion);  
router.post("/marcacion", feedController.Marcacion);  
router.post("/desactivacion", feedController.Desactivacion);  

module.exports = router;
