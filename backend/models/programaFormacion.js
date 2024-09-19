import mongoose from "mongoose"

const programaFormacionSchema = mongoose.Schema({
    programa:{
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
})
const ProgramaFormacion = mongoose.model("programaFormacion", programaFormacionSchema)
export default ProgramaFormacion