import Solicitud from "../models/Solicitud.js"
import { emailNotificaion } from "../helpers/email.js"
import Usuario from "../models/Usuario.js"

/*Esta es la funcion para solicitar un curso*/
const SolicitarCurso = async (req, res) => {
    const solicitud = new Solicitud(req.body)
    // solicitud.solicitante = req.usuario._id //El proyecto que está creado se le asigna el id del usuario que lo crea
    try {
        const solicitudGuardada = await solicitud.save()
        emailNotificaion({
            id: solicitud._id
        })
        res.json({ msg: "Solicitud Enviada con Exito" })
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
            solicitud = await Solicitud.findById(id)
            .populate('programaFormacion', 'programa')
            .populate('departamento', 'nombre')
            .populate('municipio', 'nombre')
            .populate('corregimiento', 'nombre');

            if (!solicitud) {
                return res.status(404).json({ msg: "Solicitud no encontrada" });
            }
        } else {
            solicitud = await Solicitud.find().populate('programaFormacion', 'programa');
        }
        res.json(solicitud);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener las solicitudes" });
    }
};

//Aqui obtengo las solicitudes que tiene asigando un instructor
const obtenerSolicitudxInstructor = async (req, res) => {
    try {
        // Obtén el ID del instructor desde el token JWT
        const instructorId = req.usuario._id;

        // Encuentra las solicitudes donde el campo 'instructor' coincide con el ID del instructor
        const solicitudes = await Solicitud.find({ instructor: instructorId }).populate('programaFormacion', 'programa');
        res.json(solicitudes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener las solicitudes del instructor' });
    }
}

//Aqui hago conteo de cuantas solicitudes tienen el mismo programa de Formación
const contarProgramasporSolicitud = async (req, res) => {
    const { programaFormacionId } = req.params;
    const estado = req.query.estado || ''; // Acepta estado como parámetro de consulta
    try {
        // Consulta para contar documentos con el campo programaFormacion igual al id proporcionado
        const count = await Solicitud.countDocuments({
            programaFormacion: programaFormacionId,
            ...(estado && { estado }) // Solo incluye el filtro de estado si se proporciona
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error de prueba', error });
    }
}

const asignarEstado = async (req, res) => {
    try {
        const { estado, tipoSolicitante, programaDeFormacion } = req.body;
        const instructorId = req.user._id; // Suponiendo que obtienes el ID del instructor desde el token de autenticación

        if (tipoSolicitante === "Usuario") {
            await Solicitud.updateMany(
                { instructor: instructorId, tipoSolicitante: "Usuario", programaDeFormacion },
                { estado }
            );
        } else {
            // Lógica existente para tipoSolicitante === "Empresa"
            const solicitud = await Solicitud.findById(req.params.id);
            if (solicitud.instructor.equals(instructorId)) {
                solicitud.estado = estado;
                await solicitud.save();
            }
        }

        res.status(200).json({ message: "Estado actualizado correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado de las solicitudes." });
    }
};


//Aqui asigno el instructor cuando es por empresa.
const asignarInstructor = async (req, res) => {
    const { id } = req.params
    const solicitud = await Solicitud.findById(id)
    if (!solicitud) {
        const error = new Error("Solciitud no encontrada")
        return res.status(404).json({ msg: error.message })
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



const verificacionInstructor = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    // Verifica si se proporciona un estado
    if (!estado) {
        return res.status(400).json({ msg: "El estado es requerido" });
    }

    try {
        const solicitud = await Solicitud.findById(id);
        if (!solicitud) {
            return res.status(404).json({ msg: "Solicitud no encontrada" });
        }

        // Actualiza el estado de la solicitud
        solicitud.estado = estado;
        const solicitudGuardada = await solicitud.save();
        res.json(solicitudGuardada);
    } catch (error) {
        console.log("Error al guardar solicitud:", error);
        res.status(500).json({ msg: "Error al guardar la solicitud" });
    }
};


//Aqui es para hacer el informe 
const solicitudesGeneroCaracterizacion = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Convertir las fechas a objetos Date si están presentes
        const dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        // Contar solicitudes por género (solo usuarios) con filtro de fecha
        const genero = await Solicitud.aggregate([
            { $match: { tipoSolicitante: 'Usuario', ...dateFilter } },
            { $group: { _id: "$genero", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Contar solicitudes por caracterización (solo usuarios) con filtro de fecha
        const caracterizacion = await Solicitud.aggregate([
            { $match: { tipoSolicitante: 'Usuario', ...dateFilter } },
            { $group: { _id: "$caracterizacion", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Contar solicitudes por estado (Aceptada y Denegada) con filtro de fecha
        const estados = await Solicitud.aggregate([
            { $match: { ...dateFilter } },
            { $group: { _id: "$estado", count: { $sum: 1 } } },
            { $match: { _id: { $in: ['Aceptada', 'Cancelada'] } } },
            { $sort: { _id: 1 } }
        ]);

        // Contar solicitudes por tipo de solicitante (Empresas y Usuarios) con filtro de fecha
        const empresas = await Solicitud.aggregate([
            { $match: { tipoSolicitante: 'Empresa', ...dateFilter } },
            { $group: { _id: "Empresa", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        const usuarios = await Solicitud.aggregate([
            { $match: { tipoSolicitante: 'Usuario', ...dateFilter } },
            { $group: { _id: "Usuario", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Contar el total de todas las solicitudes con filtro de fecha
        const totalSolicitudes = await Solicitud.countDocuments({ ...dateFilter });

        // Enviar respuesta JSON
        res.json({ genero, caracterizacion, estados, empresas, usuarios, totalSolicitudes });
    } catch (error) {
        console.error('Error en contarSolicitudesPorGeneroYCaracterizacion:', error);
        res.status(500).json({ message: error.message });
    }
};






//Aqui es para asignar varias solicitudes individuales a un sólo instructor
const asignarInstructorMultiplesSolicitudes = async (req, res) => {
    const { programaFormacionId, instructorId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(programaFormacionId) || !mongoose.Types.ObjectId.isValid(instructorId)) {
            return res.status(400).json({ msg: 'ID de Programa o Instructor no válido.' });
        }

        // Encuentra las solicitudes "Sin asignar" del programa de formación específico, limitadas a 25
        const solicitudes = await Solicitud.find({
            programaFormacion: programaFormacionId,
            estado: 'Sin asignar'
        }).limit(25); // Limita la consulta a 25 resultados

        if (solicitudes.length === 0) {
            return res.status(404).json({ msg: 'No hay solicitudes suficientes para asignar.' });
        }

        // Actualiza las solicitudes obtenidas
        const solicitudesActualizadas = await Solicitud.updateMany(
            { _id: { $in: solicitudes.map(solicitud => solicitud._id) } },
            { instructor: instructorId, estado: 'Asignada' }
        );

        res.json({ msg: `Instructor asignado a ${solicitudesActualizadas.nModified} solicitudes.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al asignar instructor.' });
    }
};
const borrarSolicitud = async (req, res) =>{
    const {id} = req.params
    try {
        const solicitud = await Solicitud.findByIdAndDelete(id)
        res.status(200).json({msg: "Solicitud eliminada con exito "})
    } catch (error) {
        console.log(error)
    }
}

export {
    SolicitarCurso,
    obtenerSolicitudes,
    asignarEstado,
    asignarInstructor,
    verificacionInstructor,
    obtenerSolicitudxInstructor,
    contarProgramasporSolicitud,
    solicitudesGeneroCaracterizacion,
    asignarInstructorMultiplesSolicitudes,
    borrarSolicitud

}

