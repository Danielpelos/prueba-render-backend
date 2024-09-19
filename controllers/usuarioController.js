import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarid.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailOlvideClave } from "../helpers/email.js";


const registrar = async (req, res) => {
    const { email, numeroDocumento } = req.body;

    const existeUsuario = await Usuario.findOne({ email })
    if (existeUsuario) {
        const error = new Error("Usuario ya Existe")
        return res.status(400).json({ msg: error.message })
    }
    const existeDocumento = await Usuario.findOne({ numeroDocumento });
    if (existeDocumento) {
        const error = new Error("El número de documento ya está en uso");
        return res.status(400).json({ msg: error.message });
    }
    
    try {
        const usuario = Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()
        res.json({msg: 'Usuario Creado Correctamente, Revisa tu email para confirmar tu cuenta'})
    } catch (error) {
        console.log(error)
    }
};

// Autenticacion de usuarios 
const autenticar = async (req, res) =>{
    const {email, password} = req.body
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        const error = new Error("Usuario no existente")
        return res.status(404).json({msg: error.message})
    }
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombres,
            email: usuario.email,
            rol: usuario.rol,
            token: generarJWT(usuario._id)
        })
    }else{
        const error = new Error("Contraseña Incorrecta")
        return res.status(403).json({msg: error.message})
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params // leeemos de la url  
    const usuarioConfirmar = await Usuario.findOne({ token })
    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(403).json({ msg: error.message })
    }
    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.json({ msg: 'Usuario Confirmado correctamente' })
    } catch (error) {
        console.log(error)
    }
}

const olvideClave = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        //Mensaje de para correos no registrados en la base de datos
        const error = new Error("El correo electronico ingresado no existe")
        return res.status(404).json({ msg: error.message })
    }
    try {
        usuario.token = generarId()
        await usuario.save()

        //Enviar correo de confirmacion al correo electronico registrado en la base de datos por el administrador
        emailOlvideClave({
            email: usuario.email,
            nombres: usuario.nombres,
            token: usuario.token
        })


        res.json({ msg: 'Hemos enviado un email con las instrucciones' })
    } catch (error) {
        console.log(error)
    }
}

const verificacionToken = async (req, res) => {
    const { token } = req.params
    const tokenValido = await Usuario.findOne({ token })
    if (tokenValido) {
        res.json({ msg: 'Token Valido y el usuario existe' })
    } else {
        const error = new Error("Token no valido")
        return res.status(404).json({ msg: error.message })
    }
}

const nuevaClave = async (req, res) =>{
    const { token } = req.params
    const { password } = req.body

    const usuario = await Usuario.findOne({ token })

    if (usuario) {
        usuario.password = password
        usuario.token = ''
        try {
            await usuario.save()
            res.json({ msg: "Password Modificado Correctamente" })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error("Token no valido")
        return res.status(404).json({ msg: error.message })

    }

}
const instructoresLista = async (req, res) =>{
    try {
        const instructores = await Usuario.find({ rol: 'Instructor' });
        res.json(instructores)
    } catch (error) {
        console.log(error)
    }
}

const perfil = async (req, res) => {
    const { usuario } = req

    res.json(usuario)
}


export { registrar, autenticar, confirmar, olvideClave, verificacionToken, nuevaClave, perfil, instructoresLista }; 