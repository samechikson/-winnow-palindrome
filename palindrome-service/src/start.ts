import pubSubManager from '@manager';
import { dbConnect, logger } from '@shared';
import { newProblemConsumer } from './consumers';

// Initialize connection to database
const db = `mongodb://${process.env.DB_HOST}:27017/test`;

(async () => {
    dbConnect({ db });

    // Start the Pub/Sub Manager
    try {
        pubSubManager.consume('redis').subscribe(
            async (msg: string) => {
                try {
                    await newProblemConsumer(msg);
                } catch (err) {
                    logger.error(`Error in the new problem subscriber ${err}`);
                }
            },
            (error) => {
                logger.error(`Error in the subscribe: ${error}`);
            },
        );
    } catch (error) {
        logger.error('pubSubManager had a problem: ', error);
    }
})();
