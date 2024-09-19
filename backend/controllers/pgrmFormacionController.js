import programaFormacion from "../models/programaFormacion.js"

const AgregarPrograma = async (req, res) =>{
    const ProgramaFormacion = new programaFormacion(req.body) 
    // solicitud.solicitante = req.usuario._id //El proyecto que está creado se le asigna el id del usuario que lo crea
    try {
        const programaGuardado = await ProgramaFormacion.save()
        res.json(programaGuardado)
    } catch (error) {
        console.log(error)
    }
}

export{
    AgregarPrograma
}