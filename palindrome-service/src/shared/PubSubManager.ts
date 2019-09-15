import { PubsubManager } from 'redis-messaging-manager';
import { logger } from '@shared';

logger.info(`REDIS_HOST: ${process.env.REDIS_HOST}`);

export const pubSubManager = new PubsubManager({
  host: process.env.REDIS_HOST,
  retryStrategy: (times) => times < 5 ? 5000 : false,
});
pubSubManager.getServerEventStream('error')
  .subscribe(() => {
    logger.info(`Could not connect to Redis at ${process.env.REDIS_HOST}`);
  });
pubSubManager.getServerEventStream('connect')
  .subscribe(() => {
    logger.info(`Connected to Redis at ${process.env.REDIS_HOST}`);
  });
pubSubManager.getServerEventStream('reconnecting')
  .subscribe(() => {
    logger.info(`Retrying connection to Redis at ${process.env.REDIS_HOST}`);
  });
