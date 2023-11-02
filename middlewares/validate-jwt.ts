import { Response, Request, NextFunction } from "express";
import User from "../models/user";

const jwt = require('jsonwebtoken');

export const validateJWT = async(req: any, res: Response, next: NextFunction) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({msg: 'ERROR: No hay token en la petición'})
  }

  try {
    const {uid} =jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    if(!user) {
      return res.status(401).json({msg: 'ERROR: Token no válido'});
    }

    if (!user.status) {
      return res.status(401).json({msg: 'ERROR: Token no válido'});
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('[JWT]', error);
    res.status(401).json({msg: 'ERROR: Token no válido'})
  }
}