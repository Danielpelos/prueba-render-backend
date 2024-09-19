import express from "express"
import {AgregarDepartamento, AgregarMunicipio, AgregarCorregimiento, traerDepartamentos, traerMunicipios, traerCorregimientos} from "../controllers/ubicacionControllers.js"

const router = express.Router()

router.post('/departamento', AgregarDepartamento),
router.post('/municipio', AgregarMunicipio)
router.post('/corregimiento', AgregarCorregimiento)
router.get('/obtener-departamentos/', traerDepartamentos)
router.get('/obtener-municipios/:id', traerMunicipios)
router.get('/obtener-corregimientos/:id', traerCorregimientos)
    

router
    .route('/:id')
    .get()
    .delete()

export default router

