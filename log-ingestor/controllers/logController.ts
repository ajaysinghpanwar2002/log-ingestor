import { Request, Response, NextFunction } from 'express';
import LogModel, { Log } from '../models/logModel';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';
import { BATCH_SIZE, BATCH_TIME } from '../constants';

let logBatch: Log[] = [];

setInterval(async () => {
    if (logBatch.length > 0) {
        await processAndStoreBatch([...logBatch]);
        logBatch = [];
    }
}, BATCH_TIME);

export const ingestLog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errors.array());
    }

    const logData: Log[] = req.body;
    logBatch.push(...logData);

    if (logBatch.length >= BATCH_SIZE) {
        await processAndStoreBatch([...logBatch]);
        logBatch = [];
    }

    res.status(StatusCodes.OK).json({ success: true, logData });
};

export const searchLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(errors.array());
    }

    const { searchQuery, filters, page, limit } = req.body;
    const { startDate, endDate, ...otherFilters } = filters; // Destructure startDate and endDate from filters
    const query: Record<string, any> = {};

    if (searchQuery) {
        query.message = { $regex: new RegExp(searchQuery, 'i') };
    }

    Object.keys(otherFilters).forEach((field) => { // Use otherFilters instead of filters
        if (otherFilters[field]) {
            query[field] = otherFilters[field];
        }
    });

    // timestamp filter
    if (startDate && endDate) {
        query.timestamp = {
            $gt: new Date(startDate),
            $lt: new Date(endDate),
        };
    }

    let logs = await LogModel.find(query);
    // Apply pagination
    logs = logs.slice((page - 1) * limit, page * limit);
    res.status(StatusCodes.OK).json({ success: true, logs });
};

async function processAndStoreBatch(logBatch: Log[]): Promise<void> {
    await LogModel.insertMany(logBatch);
}