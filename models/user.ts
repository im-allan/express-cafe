import { Schema, model } from 'mongoose';
import { Role } from '../constants';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: [Role.ADMIN_ROLE, Role.USER_ROLE, Role.SALES_ROLE]
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
});

UserSchema.methods.toJSON = function () {
  const {__v, password, _id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

export default model('User', UserSchema);