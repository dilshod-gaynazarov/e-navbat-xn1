import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/admin.routes.js';
import doctorRouter from './routes/doctor.routes.js';
import graphRouter from './routes/graph.routes.js';
import logger from './utils/logger/logger.js';
import { fileURLToPath } from 'url';
import path from 'path';
config();

process.on('uncaughtException', (err) => {
  console.log(`Uncaught exception: ${err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reasion, promise) => {
  console.log(`Unhandled rejection: ${reasion}`);
});

const PORT = +process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

await connectDB();

app.use('/admin', adminRouter);
app.use('/doctor', doctorRouter);
app.use('/graph', graphRouter);

app.use((err, req, res, next) => {
  if (err) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: err });
  } else {
    next();
  }
});

app.listen(PORT, logger.info(`Server running on port ${PORT}`));
