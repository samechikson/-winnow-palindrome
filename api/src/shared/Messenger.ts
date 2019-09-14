import { PubsubManager } from 'redis-messaging-manager';
import { logger } from './Logger';
import { delay } from 'rxjs/operators';

export const messenger = new PubsubManager({
  host: 'localhost',
});

messenger.getServerEventStream('error')
  .subscribe(() => {
    logger.info('Got error event');
  });
messenger.getServerEventStream('connect')
  .subscribe(() => {
    logger.info('Got connect event');
  });
messenger.getServerEventStream('reconnecting')
  .pipe(delay(1000))
  .subscribe(() => {
    logger.info('Got reconnecting event');
  });
