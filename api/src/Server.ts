import express from 'express';
import logger from 'morgan';
import BaseRouter from './routes';
import { dbConnect } from '@shared';

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = 'mongodb://localhost:27017/test';
dbConnect({ db });
app.use('/', BaseRouter);

// Export express instance
export default app;
