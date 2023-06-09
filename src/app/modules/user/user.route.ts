import express from 'express';
import { createUser } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createUserZodSchema } from './user.validation';

const router = express.Router();

router.post('/create-user', validateRequest(createUserZodSchema), createUser);
export default router;
