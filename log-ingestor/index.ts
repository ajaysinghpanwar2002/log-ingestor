import express, { Express } from 'express';
import cors from 'cors';
import config from './config';
import { dbMiddleware } from './middleware/dbMiddleware';
import logRouter from './routes/logRouter';
import { errorHandler } from './errorHandler';

const app: Express = express();

(async () => {
    await dbMiddleware(app);

    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use("/api", logRouter);
    app.use(errorHandler);

    app.listen(config.PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${config.PORT}`);
    });
})();