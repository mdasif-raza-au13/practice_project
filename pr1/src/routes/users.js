import express from 'express';
import{ getUser, getUsers, createUsers, updateUser, deleteUser} from '../controler/users.js'

const router = express.Router();

router.get('/viewall', getUsers);

router.get('/viewone/:id', getUser);

router.post('/create', createUsers);

router.patch('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

export default router;