import mongoose from "mongoose"

const corregimientoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    municipio:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    }
})
const municipioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    departamento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    }
})

const departamentoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    }
})
const Corregimiento = mongoose.model("Corregimiento", corregimientoSchema)
const Municipio = mongoose.model("Municipio", municipioSchema)
const Departamento = mongoose.model("Departamento", departamentoSchema)
export {
    Corregimiento, Municipio, Departamento
}