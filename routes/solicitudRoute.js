import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
    SolicitarCurso,
    obtenerSolicitudes,
    asignarEstado,
    asignarInstructor,
    verificacionInstructor,
    obtenerSolicitudxInstructor,
    contarProgramasporSolicitud,
    solicitudesGeneroCaracterizacion,
    asignarInstructorMultiplesSolicitudes,
    borrarSolicitud
} from "../controllers/solicitudController.js"

const router = express.Router();

router
    .post('/crear-solicitud', SolicitarCurso)
    .post('/solicitud-empresa', SolicitarCurso)
    .get('/solicitudes/:id?', checkAuth, obtenerSolicitudes)
    .put('/asignar-instructor/:id', asignarInstructor)
    .put('/verificacion/:id',  verificacionInstructor)
    .get('/asignado/instructor', checkAuth, obtenerSolicitudxInstructor)
    .get('/solicitudesprograma/:programaFormacionId', contarProgramasporSolicitud)
    .get('/reporte/genero-caracterizacion', solicitudesGeneroCaracterizacion)
    .put('/asignado/instructormultiple', asignarInstructorMultiplesSolicitudes)
    .delete('/eliminar/:id', borrarSolicitud)

export default router;
