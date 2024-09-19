import express from "express"
import {AgregarPrograma} from "../controllers/pgrmFormacionController.js"



const router = express.Router()

router
    .route('/')
    .post(AgregarPrograma)

router
    .route('/:id')
    .get()
    .delete()

export default router


