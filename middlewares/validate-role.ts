import { Request, Response, NextFunction } from "express"; 
import { Role } from "../constants";

export const isAdminRole = (req: any, res: Response, next: NextFunction) => {
  
  if (!req.user) {
    return res.status(500).json({
      msg: 'ERROR: Verificar rol sin token validado'
    });
  }

  const { role } = req.user;
  if (role !== Role.ADMIN_ROLE) {
    return res.status(401).json({
      msg: 'ERROR: No tienes permiso para realizar esta acción'
    })
  }
  next();
}

export const hasRole = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    
    if (!req.user) {
      return res.status(500).json({
        msg: 'ERROR: Verificar rol sin token validado'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        mgs: 'ERROR: No tienes permisos para realizar esta acción'
      })
    }
    next();
  }
}