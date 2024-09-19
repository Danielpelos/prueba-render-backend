import {Departamento, Municipio, Corregimiento} from "../models/Ubicacion.js"
import mongoose from "mongoose"

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

const traerDepartamentos = async (req, res) =>{
    try {
        const departamentos = await Departamento.find();
        res.json(departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener los departamentos" });
    }
}
const traerMunicipios = async (req, res) =>{
    try {
        const { id } = req.params;
        

        // Usar el ObjectId del departamento para encontrar los municipios
        const municipios = await Municipio.find({ departamento: id });
        res.json(municipios);
    } catch (error) {
        console.error("Error al obtener los municipios:", error);
        res.status(500).send("Error al obtener los municipios");
    }
}
const traerCorregimientos = async (req, res) =>{
    try {
        const { id } = req.params;

        // Usar el ObjectId del municipio para encontrar los corregimientos
        const corregimientos = await Corregimiento.find({ municipio: id });
        res.json(corregimientos);
    } catch (error) {
        console.error("Error al obtener los corregimientos:", error);
        res.status(500).send("Error al obtener los corregimientos");
    }
}


export{
    AgregarDepartamento, AgregarMunicipio, AgregarCorregimiento, traerDepartamentos, traerMunicipios, traerCorregimientos
}