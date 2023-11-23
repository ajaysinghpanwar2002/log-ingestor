import mongoose from 'mongoose';
import { Log } from '../types/logInterface';

const logSchema = new mongoose.Schema<Log>({
    level: { type: String, required: true },
    message: { type: String, required: true },
    resourceId: { type: String, required: true },
    timestamp: { type: Date, required: true },
    traceId: { type: String, required: true },
    spanId: { type: String, required: true },
    commit: { type: String, required: true },
    metadata: {
        parentResourceId: { type: String },
    },
});

logSchema.index({ timestamp: 1, level: 1, resourceId: 1 });

const LogModel = mongoose.model<Log>('Log', logSchema);
export { Log };
export default LogModel;