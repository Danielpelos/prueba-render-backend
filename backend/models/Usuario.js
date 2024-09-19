import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    tipoDocumento: {
        type: String,
        required: true,
        enum: ['Cedula', 'Contraseña', 'Tarjeta_Identidad', 'Pasaporte', 'Cedula_Extrangeria']
    },
    numeroDocumento: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\d+$/, 'El número de documento debe ser un valor numérico'] // Ajusta según el formato esperado
    },
    rol: {
        type: String,
        enum: ['Usuario', 'Instructor', 'administrador'],
        default: "Usuario",
    },
    corregimiento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Corregimiento',
        required: true
    },
    vereda:{
        type: String,
        trim: true
    },
    // departamento: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // municipio: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    // corregimiento: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    password: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    genero: {
        type: String,
        required: true,
        trim: true
    },
    caracterizacion: {
        type: String,
        required: true,
        enum: ['Indigena', 'Desplazado', 'Afrodescendiente', 'Victima del Conflicto']
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
    token: {
        type: String,
        default: null
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    confirmado: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Crea campos `createdAt` y `updatedAt` automáticamente
});

// para el hashing de la contraseña
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;