import { Response, Request } from "express";
import User from '../models/user';
export const usersGet = (req: Request, res: Response) => {
  
  res.json({
    msg: 'GET API - Controller',
  })
}

export const usersPost = async(req: Request, res:  Response) => {
  const body = req.body;
  const user = new User(body);
  await user.save();
  res.status(201).json({
    user
  })
}

export const usersPut = (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    msg: 'PUT API - Controller',
    id
  })
}

export const usersPatch = (req: Request, res: Response) => {
  res.status(200).json({
    msg: 'PATCH API - Controller',
  })
}

export const usersDelete = (req: Request, res: Response) => {
  res.json({
    msg: 'DELETE API - Controller',
  })
}
