import express from "express"
import{
    nuevoAnuncio,
    obtenerAnuncios,
    editarAnuncios,
    eliminarAnuncios,
    obtenerTodosLosAnuncios,
    obtenerAnuncioPorPrograma
} from "../controllers/anunciosController.js"
import upload from "../config/multer.js"


const router = express.Router()

//rutas de anuncios
    router
    .get("/obtener_todos_los_anuncios", obtenerTodosLosAnuncios)
    .get("/obtener_anuncio_programa/:id", obtenerAnuncioPorPrograma)
    .post("/crear_anuncio", upload.single('imagen'), nuevoAnuncio)
    .get("/obtener_anuncio/:id", obtenerAnuncios)
    .put("/editar_anuncio/:id", editarAnuncios)
    .delete("/eliminar_anuncio/:id", eliminarAnuncios)

export default router

