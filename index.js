import express from "express";
import morgan from 'morgan';
import conexionDB from "./config/db.js";
import dotenv from "dotenv";
import cors from 'cors';
import usuarioRoutes from "./routes/usuarioRoutes.js";
import solicitudRoute from "./routes/solicitudRoute.js";
import anunciosRoutes from "./routes/anunciosRoutes.js";
import ubicacionRoute from "./routes/ubicacionRoute.js";
import pgrmFormacionRoute from "./routes/pgrmFormacionRoute.js";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Permitir todos los orígenes para simplificar el desarrollo
app.use(cors());

//Configuración de CORS más estricta (descomentar si es necesario)
 const whitelist = ["http://localhost:5173"];
  const corsOptions = {
      origin: function(origin, callback) { 
          if (whitelist.includes(origin) || !origin) {
             callback(null, true);
        } else {
           callback(new Error("Error de cors"));
        }
     }
};
app.use(cors(corsOptions));

dotenv.config();
conexionDB();

// Subir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static('uploads'));

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/informes', solicitudRoute);
app.use('/api/solicitud', solicitudRoute);
app.use('/api/anuncios', anunciosRoutes);
app.use('/api/ubicacion', ubicacionRoute);
app.use('/api/programas', pgrmFormacionRoute);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

