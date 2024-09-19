import {Departamento, Municipio, Corregimiento} from "../models/Ubicacion.js"

const AgregarDepartamento = async (req, res) =>{
    const departamento = new Departamento(req.body) 
    // solicitud.solicitante = req.usuario._id //El proyecto que está creado se le asigna el id del usuario que lo crea
    try {
        const departamentoGuardado = await departamento.save()
        res.json(departamentoGuardado)
    } catch (error) {
        console.log(error)
    }
}
const AgregarMunicipio = async (req, res)=>{
    const municipio = new Municipio(req.body) 
    // solicitud.solicitante = req.usuario._id //El proyecto que está creado se le asigna el id del usuario que lo crea
    try {
        const municipioGuardado = await municipio.save()
        res.json(municipioGuardado)
    } catch (error) {
        console.log(error)
    }
}
const AgregarCorregimiento = async (req, res) =>{
    const corregimiento = new Corregimiento(req.body) 
    // solicitud.solicitante = req.usuario._id //El proyecto que está creado se le asigna el id del usuario que lo crea
    try {
        const corregimientoGuardado = await corregimiento.save()
        res.json(corregimientoGuardado)
    } catch (error) {
        console.log(error)
    }
}


export{
    AgregarDepartamento, AgregarMunicipio, AgregarCorregimiento
}