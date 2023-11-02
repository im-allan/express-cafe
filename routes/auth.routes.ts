import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  validateFields
], login);


export default router;