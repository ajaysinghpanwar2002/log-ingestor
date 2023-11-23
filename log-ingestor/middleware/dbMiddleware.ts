import { Express } from 'express';
import { getConnectedDb } from '../db';

export const dbMiddleware = async (app: Express) => {
    const db = await getConnectedDb();
    app.locals.db = db;
};