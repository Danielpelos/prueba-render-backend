import express from "express";
import {registrar, autenticar, confirmar, olvideClave, verificacionToken, nuevaClave, perfil, instructoresLista} from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/registro-instructor", registrar);  
router.post("/login", autenticar)  
router.get('/confirmar/:token', confirmar)
router.post('/olvide-clave', olvideClave) 
router.get('/olvide-clave/:token', verificacionToken) 
router.post('/olvide-clave/:token', nuevaClave) 
router.get('/perfil', checkAuth, perfil)
router.get('/instructores', instructoresLista)

export default router;

