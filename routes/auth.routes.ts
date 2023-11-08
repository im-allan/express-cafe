import { Router } from 'express';
import { check } from 'express-validator';

import { googleSignIn, login } from '../controllers/auth.controllers';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validateFields
], login);

router.post('/google', [
  check('id_token', 'Google Token es necesario').notEmpty(),
  validateFields
], googleSignIn);


export default router;