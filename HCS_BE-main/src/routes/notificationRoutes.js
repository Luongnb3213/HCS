import express from 'express';
import {getNotificationById} from  '../controllers/notificationController.js'

const router = express.Router();

router.post('/' , getNotificationById)


export default router;
