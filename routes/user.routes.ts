import { Router } from 'express';
import { check } from 'express-validator';

import { validateFields, validateJWT, isAdminRole } from '../middlewares';

import { existEmail, existUserById, isValidRole } from '../helpers/db-validator';

import { usersGet, usersPost, usersPut, usersDelete } from '../controllers/user.controller';

const router = Router();
router.get('/', usersGet)

router.put('/:id', [
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existUserById),
  check('role').custom(isValidRole),
  validateFields
], usersPut)

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6}),
  check('email', 'El correo ingresado no es válido').isEmail(),
  check('email',).custom(existEmail),
  check('role').custom(isValidRole),
  validateFields
], usersPost)

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existUserById),
  validateFields
], usersDelete)

export default router;