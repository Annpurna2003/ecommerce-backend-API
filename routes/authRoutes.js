import express from 'express';
import validate from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';
import {register,login }from '../controllers/authController.js';

const userouter = express.Router();
userouter.post('/register', validate(registerSchema), register);
userouter.post('/login', validate(loginSchema), login);
export default userouter;
