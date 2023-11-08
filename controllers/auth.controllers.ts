import { Request, Response } from "express"

import bcrypt from 'bcrypt';

import User from "../models/user";
import { generateJWT } from "../helpers/generate-jwt";
import { googleVerify } from "../helpers/google-verify";
import { Role } from "../constants";

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

export const googleSignIn = async(req: Request, res: Response) => {
  const {id_token} = req.body;
  try {
    const {email, name, img} = await googleVerify(id_token);
    let user = await User.findOne({email});
    if (!user) {
      const data = {
        name,
        email,
        password: 'Google',
        img,
        role: Role.USER_ROLE,
        google: true
      }

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Lo sentimos, su cuenta ha sido desactivada. Contacte con el administrador'
      })
    }
    
    const token = await generateJWT(user.id);
    
    res.json({
      user,
      token
    })
    
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "ERROR: Token de Google inválido"
    })
  }
}