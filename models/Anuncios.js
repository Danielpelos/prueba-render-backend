 import mongoose from "mongoose"

 const anunciosSchema = mongoose.Schema({
     programaFormacion:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'programaFormacion'
    },
    descripcion:{
        type: String,
        required: true
    },
    FechaInicio:{
        type: Date, //Almacena la fecha con una cadena
        required: true
    },
    FechaFinal:{
        type: Date, //Almacena la fecha con una cadena
        required: true
    },
    jornada:{
        type: String,
        enum: ['Diurno', 'Nocturno', 'Mixto'],
        required: true
    },
    modalidad:{
        type: String,
        enum:['Presencial', 'Virtual', 'Mixto'],
        required: true
    },
    imagen:{
        type: String,
       required:true
    },
    departamento:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true
    },
    municipio:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Municipio',
        required: true
    },
    publicado:{
        type: Boolean,
        default: true,
    }

    //Se quita el campo usuario por motivo usuario ya esta 
}, 
{
    timestamps: true,
});

anunciosSchema.methods.setImgURL = function setImgURL (){

}



//Decalaramos la tabla 
const Anuncio = mongoose.model("Anuncio", anunciosSchema)
export default Anuncio



