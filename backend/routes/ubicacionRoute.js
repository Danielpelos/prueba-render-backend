import express from "express"
import {AgregarDepartamento, AgregarMunicipio, AgregarCorregimiento} from "../controllers/ubicacionControllers.js"

const router = express.Router()

router.post('/departamento', AgregarDepartamento),
router.post('/municipio', AgregarMunicipio)
router.post('/corregimiento', AgregarCorregimiento)
    

router
    .route('/:id')
    .get()
    .delete()

export default router

