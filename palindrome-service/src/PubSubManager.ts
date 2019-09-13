import { PubsubManager } from 'redis-messaging-manager';

const pubSubManager = new PubsubManager({
  host: 'localhost',
});
export default pubSubManager;
