import React from 'react';
import '../styles/ResultDisplayComponent.css';

interface LogItemProps {
    log: Log;
}

const LogItem: React.FC<LogItemProps> = ({ log }) => (
    <li className="results-item">
        <pre className="results-pre">{JSON.stringify(log, null, 2)}</pre>
    </li>
);

interface PaginationProps {
    onNextPage: () => void;
    onPreviousPage: () => void;
    currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ onNextPage, onPreviousPage, currentPage }) => (
    <div className="pagination">
        <button onClick={onPreviousPage} disabled={currentPage === 1}>Previous</button>
        <button onClick={onNextPage}>Next</button>
    </div>
);

interface ResultDisplayComponentProps {
    logs: Log[];
    onNextPage: () => void;
    onPreviousPage: () => void;
    currentPage: number;
}

const ResultDisplayComponent: React.FC<ResultDisplayComponentProps> = ({ logs, onNextPage, onPreviousPage, currentPage }) => {
    return (
        <div className="results-container">
            <h2 className="results-title">Search Results</h2>
            <ul className="results-list">
                {logs.map((log) => (
                    <LogItem key={log.id} log={log} />
                ))}
            </ul>
            <Pagination onNextPage={onNextPage} onPreviousPage={onPreviousPage} currentPage={currentPage} />
        </div>
    );
};

export default ResultDisplayComponent;