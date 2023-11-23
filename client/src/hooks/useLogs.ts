import { useState, useEffect } from 'react';
import axios from 'axios';
import { Log, ITEMS_PER_PAGE, SERVER_URL } from '../constants';

export const useLogs = (searchQuery: string, filters: Record<string, string>, currentPage: number) => {
    const [logs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.post<{ logs: Log[] }>(`${SERVER_URL}/logs/search`, {
                    searchQuery,
                    filters,
                    page: currentPage,
                    limit: ITEMS_PER_PAGE,
                });
                setLogs(response.data.logs);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        void fetchLogs();
    }, [searchQuery, filters, currentPage]);

    return logs;
};