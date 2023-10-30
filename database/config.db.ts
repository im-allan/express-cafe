import mongoose from 'mongoose';


export const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.MONGODB_CNN ?? '')
    console.log('[DB_CONNECTION] Base de datos conectada')
  } catch (error) {
    console.log('[DB_CONNECTION]', error)
    throw new Error('[DB_CONNECTION] Error al inicializar la base de datos');
  }
}