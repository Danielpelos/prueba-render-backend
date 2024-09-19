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

const traerProgramas = async (req, res) => {
    try {
        const programas = await programaFormacion.find(); // No olvides el await
        res.status(200).json(programas); // Envía la respuesta con los programas
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al traer los programas de formación" });
    }
};


export{
    AgregarPrograma, traerProgramas
}