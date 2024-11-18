import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import mailRoutes from './routes/mailRoutes.js';
import appointmentRoutes from './routes/appoinmentRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { authenticateToken } from './middlewares/authenticateToken.js';
import hospitalRoutes from './routes/hospitalRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import medicationRoutes from './routes/MedicationRoutes.js'
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);

// app.use(authenticateToken);

app.use('/users', userRoutes);

app.use('/email', mailRoutes);

app.use('/appointment', appointmentRoutes);

app.use('/doctors', doctorRoutes);

app.use('/notifications', notificationRoutes);

app.use('/hospitals' , hospitalRoutes);

app.use('/post' , postRoutes);

app.use('/comments' , commentRoutes);

app.use('/medication' , medicationRoutes);



export default app;
