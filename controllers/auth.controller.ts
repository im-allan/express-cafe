import { Request, Response } from "express"

import bcrypt from 'bcrypt';

import User from "../models/user";
import { generateJWT } from "../helpers/generate-jwt";

export const login = async(req: Request, res: Response) => {
  
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({
        msg: 'Lo sentimos, sus credenciales no coinciden. Inténtelo de nuevo'
      })
    }
    
    if (!user.status) {
      return res.status(400).json({
        msg: 'Lo sentimos, sus credenciales no coinciden. Inténtelo de nuevo'
      })
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Lo sentimos, sus credenciales no coinciden. Inténtelo de nuevo'
      })
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Internal Server Error'
    })
  }
}