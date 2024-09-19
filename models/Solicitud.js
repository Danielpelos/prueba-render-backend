import mongoose from "mongoose"
import { Corregimiento, Municipio, Departamento } from "../models/Ubicacion.js"
import Usuario from "./Usuario.js"

const solicitudSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        trim: true
    },
    tipoDocumento: {
        type: String,
        enum: ['Cedula', 
            'Contraseña', 
            'Tarjeta_Identidad', 
            'Pasaporte', 
            'Cedula_Extrangeria'
        ]
    },
    numeroDocumento: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d+$/, 'El número de documento debe ser un valor numérico'] // Ajusta según el formato esperado
    },
    caracterizacion: {
        type: String,
        enum: ['Indigena',
                'Desplazado',
                'Afrodescendiente',
                'Victima del Conflicto',
                'Mujer Cabeza de Familia',
                'Discapacitado',
                'LGBTQ+',
                'Adulto Mayor',
                'Minoría Étnica',
                'Campesino']
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email debe ser válido']
    },
    celular: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'El número de celular debe ser válido']
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'],
        validate: {
            validator: function(v) {
                return v !== 'Otro' || this.otroGenero; // Solo permite 'Otro' si otroGenero tiene un valor
            },
            message: props => `${props.value} requiere que se especifique el género.`,
        },
    },
    otroGenero: {
        type: String,
    },

    fechaNacimiento: {
        type: Date,
    },
    departamento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    municipio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    },
    corregimiento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corregimiento',
        required: false // Esto permite que el campo sea opcional
    },
    vereda:{
        type: String,
        trim: true,
    },
    
    programaFormacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'programaFormacion'
    },
    aprendicez:{
        type: Number,
        trim: true,
    },

    modalidad:{
        type: String,
       
        enum: ['Presencial', 'Virtual', 'Mixta']
    },
    jornada:{
        type: String,
       
        enum: ['Mañana', 'Tarde', 'Noche']
    },
    fechaEstimada:{
        type:Date,
        
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
    tipoSolicitante:{
        type: String,
        enum:['Usuario', 'Empresa']
    }
   
},{
    timestamps: true
})
const Solicitud = mongoose.model("Solicitud", solicitudSchema)
export default Solicitud