import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import adminRouter from './routes/admin.routes.js';
config();

const PORT = +process.env.PORT;
const app = express();

app.use(express.json());
await connectDB();

app.use('/admin', adminRouter);

app.listen(PORT, () => console.log('Server running on port', PORT));
