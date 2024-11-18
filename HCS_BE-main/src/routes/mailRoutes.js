import express from 'express';
import { sendMail , verifyEmail} from '../controllers/mailController.js'

const router = express.Router();


router.post('/send-verification-email', sendMail);
router.get('/verify-email', verifyEmail);


export default router;
