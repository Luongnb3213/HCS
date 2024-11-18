import express from 'express';
import { Login, refreshToken, Signup } from '../controllers/authController.js';

const router = express.Router();


router.post('/login', Login);
router.post('/token', refreshToken);
router.post('/signup', Signup);


export default router;
