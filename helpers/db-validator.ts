import { Category, Product, Role, User } from '../models';

export const isValidRole = async(role:string)=> {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`ERROR: El rol ${role} no está registrado en la base de datos`)
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
    throw new Error(`ERROR: No existe un usuario con el id ${id}`);
  }
}

export const existCategoryById = async(id: string) => {
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    throw new Error(`ERROR: No existe una categoría con el id ${id}`);
  }
}

export const existProductById = async(id: string) => {
  const existProduct = await Product.findById(id);
  if (!existProduct) {
    throw new Error(`ERROR: No existe un producto con el id ${id}`);
  }
}

export const existParam = (param: string | number) => {

  if (typeof param === 'string' && param.length === 0) {
    throw new Error('El parámetro no debe estar vacío');

  } else if (typeof param === 'number' && !Number.isInteger(param)) {
    throw new Error('El número debe ser un entero');

  } else {
    return param;
  }
}