import { Document } from 'mongoose';

export interface Log extends Document {
    level: string;
    message: string;
    resourceId: string;
    timestamp: Date;
    traceId: string;
    spanId: string;
    commit: string;
    metadata?: { parentResourceId?: string };
}