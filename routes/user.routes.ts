import { Router } from 'express';
import { usersGet, usersPost, usersPut, usersPatch, usersDelete } from '../controllers/users.controller';

const router = Router();

module.exports = router;

router.get('/', usersGet)

router.post('/', usersPost)

router.put('/:id', usersPut)

router.patch('/', usersPatch)

router.delete('/', usersDelete)