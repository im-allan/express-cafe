import { Response, Request } from "express";
import bcrypt from "bcrypt";

import User from '../models/user';


export const usersGet = async(req: Request, res: Response) => {
  const { limit = 5, skip = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true })
      .skip(Number(skip))
      .limit(Number(limit))
  ]);

  res.json({
    total,
    users
  })
}

export const usersPost = async(req: Request, res:  Response) => {
  const { name, email, password, role } = req.body;
  const user = new User({name, email, password, role});

  // Encriptar password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync( password, salt );
  
  // Guardar en BD
  await user.save();
  res.status(201).json({
    user
  })
}

export const usersPut = async(req: Request, res: Response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate(id, rest)
 
  res.status(200).json(user)
}

export const usersDelete = async(req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, {status: false});

  res.json(user)
}
