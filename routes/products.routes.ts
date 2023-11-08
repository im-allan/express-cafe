import { Router } from 'express';
import { check } from 'express-validator';
import { deleteProduct, getProduct, getProducts, newProduct, updateProduct } from '../controllers/products.controllers';
import { isAdminRole, validateFields, validateJWT } from '../middlewares';
import { existCategoryById, existParam, existProductById } from '../helpers/db-validator';


const router = Router();

router.get('/', getProducts);

router.get('/:id', [
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existProductById),
  validateFields
], getProduct);

router.post('/', [
  validateJWT,
  isAdminRole,
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('price', 'Ingresa un precio válido').isInt({allow_leading_zeroes: false}),
  check('category', 'No es un Mongo Id').isMongoId(),
  check('category').custom(existCategoryById),
  check('description', 'La descripciónes obligatoria').notEmpty(),
  check('img', 'La imagen es obligatoria').isURL(),
  validateFields
], newProduct);

router.put('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existProductById),
  check('category').optional().custom(existCategoryById),
  check('name').optional().custom(existParam),
  check('price').optional().custom(existParam),
  check('description').optional().custom(existParam),
  check('img').optional().custom(existParam),
  validateFields
], updateProduct );

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  check('id', 'ERROR: No es un id válido').isMongoId(),
  check('id').custom(existProductById),
], deleteProduct);

export default router;