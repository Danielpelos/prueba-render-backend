import mongoose from "mongoose";

const historialSchema = mongoose.Schema({
    solicitud: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solicitud',
        required: true
    },
    corregimiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corregimiento',
        required: true
    },
    programaFormacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'programaFormacion'
    },
    modalidad: {
        type: String,
        required: true,
        enum: ['Presencial', 'Virtual', 'Mixta']
    },
    jornada: {
        type: String,
        required: true,
        enum: ['Mañana', 'Tarde', 'Noche']
    },
    fechaEstimada: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: 'Eliminada'
    }
}, {
    timestamps: true
});

const Historial = mongoose.model("Historial", historialSchema);
export default Historial;
