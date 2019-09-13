import mongoose from 'mongoose';
import { logger } from './Logger';

type TInput = {
  db: string;
};

export const dbConnect = ({ db }: TInput) => {

  const connect = () => {
    mongoose
      .connect(
        db,
        { useNewUrlParser: true },
      )
      .then(() => {
        // tslint:disable-next-line:no-console
        return logger.info(`Successfully connected to ${db}`);
      })
      .catch((error) => {
        // tslint:disable-next-line:no-console
        logger.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
