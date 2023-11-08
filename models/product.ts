import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    uppercase: true,
    lowercase: false,
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  img: {
    type: String,
    required: true
  }
});

ProductSchema.methods.toJSON = function () {
  const {__v, status, ...data} = this.toObject();
  return data;
}

export default model('Product', ProductSchema);