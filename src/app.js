import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/admin.routes.js';
import doctorRouter from './routes/doctor.routes.js';
config();

const PORT = +process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
await connectDB();

app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);

app.listen(PORT, () => console.log('Server running on port', PORT));
