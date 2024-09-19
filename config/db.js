import mongoose from "mongoose";

const conexionDB = async () => {
   try {
        const connection = await mongoose.connect(process.env.ENLANCE_MONGO);
        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`Conexión correcta en: ${url}`);
   } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
   } 
};

export default conexionDB;
