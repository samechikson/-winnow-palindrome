import { PubsubManager } from 'redis-messaging-manager';
import { logger } from '@shared';
import { delay } from 'rxjs/operators';

const pubSubManager = new PubsubManager({
  host: 'localhost',
});
pubSubManager.getServerEventStream('error')
  .subscribe(() => {
    logger.info('Got error event');
  });
pubSubManager.getServerEventStream('connect')
  .subscribe(() => {
    logger.info('Got connect event');
  });
pubSubManager.getServerEventStream('reconnecting')
  // .pipe(delay(1000))
  .subscribe(() => {
    logger.info('Got reconnecting event');
  });

export default pubSubManager;
