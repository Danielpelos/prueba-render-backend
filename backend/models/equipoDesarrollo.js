import mongoose from "mongoose"

const equipoDesarrolloSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})
const equipoDesarrollo = mongoose.model("equipoDesarrollo", equipoDesarrolloSchema)
export default equipoDesarrollo