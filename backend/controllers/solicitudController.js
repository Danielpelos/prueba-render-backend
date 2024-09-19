import Solicitud from "../models/Solicitud.js"
import Historial from "../models/Historial.js"
import { emailNotificaion } from "../helpers/email.js"
import Usuario from "../models/Usuario.js"

/*Esta es la funcion para solicitar o crear una solicitud nueva*/
const SolicitarCurso = async (req, res) =>{
    const solicitud = new Solicitud(req.body) 
    // solicitud.solicitante = req.usuario._id //El proyecto que está creado se le asigna el id del usuario que lo crea
    try {
        const solicitudGuardada = await solicitud.save()
        emailNotificaion({
            id: solicitud._id
        })
        res.json(solicitudGuardada)
    } catch (error) {
        console.log(error)
    }
}

//Esta es la funcion para obtener todas las solicitudes existentes o por id
const obtenerSolicitudes = async (req, res) => {
    const { id } = req.params;
    try {
        let solicitud;
        if (id) {
            solicitud = await Solicitud.findById(id);
            if (!solicitud) {
                return res.status(404).json({ msg: "Solicitud no encontrada" });
            }
        } else {
            solicitud = await Solicitud.find();
        }
        res.json(solicitud);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener las solicitudes" });
    }
};


const asignarEstado = async (req, res) =>{
    const {id} =req.params
    const solicitud = await Solicitud.findById(id)

    if(!solicitud){
        const error = new Error("Solciitud no encontrada")
        return res.status(404).json({msg: error.message})
    }

    solicitud.estado= req.body.estado || solicitud.estado

    try {
        const solicitudGuardada = await solicitud.save()
        res.json(solicitudGuardada)
    } catch (error) {
        console.log(error)
    }

}

const asignarInstructor = async (req, res)=>{
    const {id} =req.params
    const solicitud = await Solicitud.findById(id)
    if(!solicitud){
        const error = new Error("Solciitud no encontrada")
        return res.status(404).json({msg: error.message})
    }
    solicitud.instructor = req.body.instructor || solicitud.instructor
    try {
        solicitud.estado = 'Asignada'
        const solicitudGuardada = await solicitud.save()
        res.json(solicitudGuardada)
    } catch (error) {
        console.log(error)
    }
}

const verificacionInstructor = async (req, res) =>{
    const {id} =req.params
    const solicitud = await Solicitud.findById(id)
    if(!solicitud){
        const error = new Error("Solciitud no encontrada")
        return res.status(404).json({msg: error.message})
    }
    if (Usuario.rol === 'Instructor') {
        solicitud.estado = req.body.estado || solicitud.estado
        try {
            const solicitudGuardada = await solicitud.save()
            res.json(solicitudGuardada)
        } catch (error) {
            console.log(error)
        }
    }
}



export{
    SolicitarCurso, obtenerSolicitudes, asignarEstado, asignarInstructor, verificacionInstructor
}