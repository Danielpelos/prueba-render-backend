import mongoose from "mongoose"
import { Corregimiento, Municipio, Departamento } from "../models/Ubicacion.js"
import Usuario from "./Usuario.js"

const solicitudSchema = mongoose.Schema({
    corregimiento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corregimiento',
        required: true
    },
    vereda:{
        type: String,
        trim: true,
    },
    solicitante:{
        type: String,
        required: true,
        trim: true
    },
    programaFormacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'programaFormacion'
    },
    modalidad:{
        type: String,
        required: true,
        enum: ['Presencial', 'Virtual', 'Mixta']
    },
    jornada:{
        type: String,
        required: true,
        enum: ['Mañana', 'Tarde', 'Noche']
    },
    fechaEstimada:{
        type:Date,
        required: true,
        default: Date.now()
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    estado: {
        type: String,
        enum:['Aceptada', 'Asignada', 'Archivado', 'Sin asignar', 'Cancelada'],
        default: 'Sin asignar'


    },
},{
    timestamps: true
})
const Solicitud = mongoose.model("Solicitud", solicitudSchema)
export default Solicitud