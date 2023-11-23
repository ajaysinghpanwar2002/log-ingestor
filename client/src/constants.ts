export const SERVER_URL = "http://localhost:3000/api"

export interface Log {
    level: string;
    message: string;
    resourceId: string;
    timestamp: string;
    traceId: string;
    spanId: string;
    commit: string;
    metadata?: { parentResourceId?: string };
}
export const ITEMS_PER_PAGE = 5;
