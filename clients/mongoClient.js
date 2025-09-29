import mongoose from "mongoose";

const uri = 'mongodb://localhost:27017/TiendaSolDB';

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
