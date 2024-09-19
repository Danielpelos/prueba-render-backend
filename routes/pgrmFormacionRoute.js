import express from "express"
import {AgregarPrograma, traerProgramas} from "../controllers/pgrmFormacionController.js"



const router = express.Router()

router
    
    .post('/agregar-programa', AgregarPrograma)
    .get('/obtener-programas', traerProgramas)
    




export default router


