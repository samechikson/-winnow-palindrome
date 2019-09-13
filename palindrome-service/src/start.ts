import pubSubManager from '@manager';
import { dbConnect, pErr, logger } from '@shared';
import { newProblemConsumer } from './consumers';
import { map, tap } from 'rxjs/operators';

// Initialize connection to database
const db = 'mongodb://localhost:27017/test';
dbConnect({ db });

// Start the Pub/Sub Manager
pubSubManager.consume('redis').subscribe(
    async (msg: string) => {
        try {
            logger.info('in the main');
            await newProblemConsumer(msg);
        } catch (err) {
            logger.error(`Error in the new problem subscriber ${err}`)
        }
    },
    (error) => {
        logger.error(`Error in the subscribe: ${error}`)
    },
);
