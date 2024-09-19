import express from "express"
import {SolicitarCurso, obtenerSolicitudes, asignarEstado, asignarInstructor, verificacionInstructor} from "../controllers/solicitudController.js"



const router = express.Router()

router
    .post('/crearsolicitud', SolicitarCurso)
    .get('/solicitudes/:id?', obtenerSolicitudes)
    .put('/asignar_instructor/:id', asignarInstructor)
    .put('/verificacion/:id', verificacionInstructor)
router
    .route('/:id')
    .put(asignarEstado)
export default router


