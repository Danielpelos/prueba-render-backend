import Anuncio from "../models/Anuncios.js"

const nuevoAnuncio = async (req, res) => {
    const { body, file } = req;
  
    const anuncio = new Anuncio({
      ...body,
      imagen: file ? file.path : null
    });
  
    try {
      const anuncioGuardado = await anuncio.save();
      res.json(anuncioGuardado);
    } catch (error) {
      console.error('Error al guardar el anuncio:', error);
      res.status(400).json({ msg: "Error al crear el anuncio" });
    }
};
  
const obtenerAnuncios = async (req, res)=>{
    const {id} = req.params
    const anuncio = await Anuncio.findById(id)
    
    if (!anuncio) {
        return res.status(404).json({msg: "Anuncio no encontrado"})    
    }
    res.json(anuncio)
}
const obtenerAnuncioPorPrograma = async (req, res) => {
    const { id } = req.params;
    try {
        const anuncio = await Anuncio.findOne({ programaFormacion: id });
        if (!anuncio) {
            return res.status(404).json({ msg: "Anuncio no encontrado para este programa de formación" });
        }
        res.json(anuncio);
    } catch (error) {
        console.error('Error al obtener el anuncio por programa de formación:', error);
        res.status(500).json({ msg: "Error al obtener el anuncio" });
    }
};


const obtenerTodosLosAnuncios = async (req, res) => {
    try {
        const anuncios = await Anuncio.find()
            .populate('programaFormacion', 'programa') //  'programa' está en el modelo 'programaFormacion'
            .populate('departamento', 'nombre') // 'nombre' está en el modelo 'Departamento'
            .populate('municipio', 'nombre'); // 'nombre' está en el modelo 'Municipio'

        res.json(anuncios);
    } catch (error) {
        console.error('Error al obtener los anuncios:', error);
        res.status(500).json({ msg: "Error al obtener los anuncios" });
    }
};



const editarAnuncios = async (req, res)=>{
    const {id} = req.params
    const anuncio = await Anuncio.findById(id)
    
    if (!anuncio) {
        return res.status(404).json({msg: "Anuncio no encontrado"})    
    }
    
    anuncio.programaFormacion = req.body.programaFormacion || anuncio.programaFormacion
    anuncio.descripcion = req.body.descripcion || anuncio.descripcion
    anuncio.fechaInicio = req.body.fechaInicio || anuncio.fechaInicio
    anuncio.fechaFinal = req.body.fechaFinal || anuncio.fechaFinal
    anuncio.jornada = req.body.jornada || anuncio.jornada
    anuncio.modalidad = req.body.modalidad || anuncio.modalidad
    anuncio.imagenURL = req.body.imagenURL || anuncio.imagenURL

    try {
        const anuncioGuardado = await anuncio.save()
        res.json(anuncioGuardado)
    } catch (error) {
        console.log(error)
    }
}
const eliminarAnuncios = async(req, res)=>{
    const {id} = req.params
    const anuncio = await Anuncio.findById(id)
    
    if (!anuncio) {
        return res.status(404).json({msg: "Anuncio no encontrado"})    
    }
    try {
        await anuncio.deleteOne()
        res.json({msg:"Anuncio eliminado"})
    } catch (error) {
        console.log(error)
    }
}
// const llamarAnuncio = async (req, res) =>{
//     const anuncio = (req.body)
//     const existeAnuncio = await Anuncio._id
    
// }

// const agregarAnuncio = async(req, res)=>{}
// const obtenerAnucio = async(req, res) =>{}

// const editarAnuncio = async(req, res) =>{}
// const eliminarAnuncio = async(req, res) =>{}
const anuncio = async (req, res)=>{
    console.log('desde anuncio...')
}
export {
    nuevoAnuncio,
    obtenerAnuncios,
    editarAnuncios,
    eliminarAnuncios,
    obtenerTodosLosAnuncios,
    obtenerAnuncioPorPrograma
    // editarAnuncio,
    
};