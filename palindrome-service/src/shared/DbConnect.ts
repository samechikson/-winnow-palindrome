import mongoose from 'mongoose';
import { logger } from './Logger';

type TInput = {
  db: string;
};

export const dbConnect = ({ db }: TInput) => {
  const connect = async () => {
    try {
      await mongoose.connect(
        db,
        {
          useNewUrlParser: true,
          autoReconnect: true,
          reconnectTries: 10,
          reconnectInterval: 1000,
        },
      );
      logger.info(`Successfully connected to ${db}`);
    } catch (error) {
      logger.error('Error connecting to database: ', error);
    }
  };

  connect();

  mongoose.connection.on('disconnected', connect);

  return new Promise((resolve, reject) => {
    mongoose.connection.once('open', resolve);
  });
};
