import express from "express";
import conexionDB from "./config/db.js";
import dotenv from "dotenv";
import solicitudRoute from "./routes/solicitudRoute.js"
import pgrmFormacionRoute from "./routes/pgrmFormacionRoute.js"
import ubicacionRoute from "./routes/ubicacionRoute.js"


const app = express();
app.use(express.json())

dotenv.config();
conexionDB();

//Routing
app.use('/api/solicitud', solicitudRoute) //Aqui se trae la importación, de las rutas de solicitar curso
app.use('/api/crearprograma', pgrmFormacionRoute) //Aqui se trae la importación, de las rutas de agregar un programa de formacion
app.use('/api/crearubicacion', ubicacionRoute) //Aqui se trae la importación, de las rutas de agregar un programa de formacion



const PORT = process.env.PORT || 4001; 
app.listen(4001, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
});
