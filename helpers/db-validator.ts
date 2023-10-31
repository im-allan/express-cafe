import Role from '../models/role'; 
import User from '../models/user';

export const isValidRole = async(role:string)=> {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`El rol ${role} no está registrado en la base de datos`)
  }
}

export const existEmail = async(email: string) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`El correo ${email} ya está registrado`);
  }
}

export const existUserById = async(id: string) => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`No existe un usuario con el id ${id}`);
  }
}