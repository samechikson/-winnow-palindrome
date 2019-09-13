import { PubsubManager } from 'redis-messaging-manager';

export const messenger = new PubsubManager({
  host: 'localhost',
});
