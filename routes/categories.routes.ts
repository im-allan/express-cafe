import { Router } from 'express';
import { check } from 'express-validator';

import { isAdminRole, validateFields, validateJWT } from '../middlewares';
import { deleteCategory, getCategories, getCategory, newCategory, updateCategory } from '../controllers/categories.controllers';
import { existCategoryById } from '../helpers/db-validator';

const router = Router();

router.get('/', getCategories);

router.get('/:id', [
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields
], getCategory);

router.post('/', [
  validateJWT,
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('name', 'Ingresa un nombre válido').not().isString(),
  validateFields
], newCategory);

router.put('/:id', [
  validateJWT,
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existCategoryById),
  check('name', 'El nombre es obligatorio').notEmpty(),
  validateFields
], updateCategory);

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existCategoryById),
  validateFields
], deleteCategory);

export default router;