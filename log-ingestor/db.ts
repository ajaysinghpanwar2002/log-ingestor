import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.DATABASE_URL as string;

let connectedDb: mongoose.Connection | null = null;

export async function getConnectedDb(): Promise<mongoose.Connection> {
    if (!connectedDb) {
        try {
            await mongoose.connect(String(mongoURI));
            connectedDb = mongoose.connection;
            console.log('Connected to MongoDB server');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    if (!connectedDb) {
        throw new Error('Database connection not established');
    }

    return connectedDb;
}
