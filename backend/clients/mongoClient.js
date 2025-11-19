import mongoose from "mongoose";

let uri = '';

if (process.env.NODE_ENV !== 'production' ) {
    uri = 'mongodb://localhost:27017/TiendaSol';
} else {
    uri = process.env.MONGO_URI;
    console.log(`Usando variables de entorno inyectadas por Render (Producción).`);
}


export function connect() {
    // Retornamos la promesa para poder encadenar .then()
    return mongoose.connect(uri)
        .then(() => console.info('Connected to MongoDB (Mongoose)'))
        .catch(error => console.error('Database connection error (Mongoose):', error));
}

export function close() {
    return mongoose.disconnect()
        .then(() => console.info('MongoDB connection closed (Mongoose)'))
        .catch(error => console.error('Error closing connection (Mongoose):', error));
}
