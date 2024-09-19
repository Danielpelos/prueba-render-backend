import jwt, { decode } from "jsonwebtoken"
import Usuario from "../models/Usuario.js"
const checkAuth = async (req, res, next) => {
    let token 
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
        {
            try {
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updateAt -__v") // Aqui consulta la inforación del usuario que tiene el token con el select -password hace que no traiga la password
                return next()
            } catch (error) { 
                return res.status(404).json({msg: "Hubo un error"})
            }
        } 
    if(!token){
        const error = new Error("Token no valido")
        return res.status(401).json({msg: error.message})
    }
    next() 
}
export default checkAuth