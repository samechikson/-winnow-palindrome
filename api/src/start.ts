import app from '@server';
import { logger, dbConnect } from '@shared';

// Start the server
const port = Number(process.env.PORT || 3000);
const db = 'mongodb://localhost:27017/test';

(async () => {
    await dbConnect({ db });
    app.listen(port, () => {
        logger.info('Express server started on port: ' + port);
    });
})();
