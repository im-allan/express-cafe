"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const db_validator_1 = require("../helpers/db-validator");
const users_controller_1 = require("../controllers/users.controller");
const router = (0, express_1.Router)();
module.exports = router;
router.get('/', users_controller_1.usersGet);
router.put('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validator_1.existUserById),
    (0, express_validator_1.check)('role').custom(db_validator_1.isValidRole),
    validate_fields_1.validateFields
], users_controller_1.usersPut);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener más de 6 caracteres').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'El correo ingresado no es válido').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validator_1.existEmail),
    (0, express_validator_1.check)('role').custom(db_validator_1.isValidRole),
    validate_fields_1.validateFields
], users_controller_1.usersPost);
router.delete('/:id', [
    (0, express_validator_1.check)('id', 'No es un ID válido').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validator_1.existUserById),
    validate_fields_1.validateFields
], users_controller_1.usersDelete);
//# sourceMappingURL=user.routes.js.map