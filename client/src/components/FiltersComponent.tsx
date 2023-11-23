import React, { useState, useCallback } from 'react';
import '../styles/FiltersComponent.css';

interface FiltersComponentProps {
    onFilterChange: (filters: Record<string, string>) => void;
}

enum FilterFields {
    Level = 'level',
    Message = 'message',
    ResourceId = 'resourceId',
    Timestamp = 'timestamp',
    TraceId = 'traceId',
    SpanId = 'spanId',
    Commit = 'commit',
    StartDate = 'startDate', 
    EndDate = 'endDate', 
}

const INITIAL_FILTERS: Record<string, string> = {
    [FilterFields.Level]: '',
    [FilterFields.Message]: '',
    [FilterFields.ResourceId]: '',
    [FilterFields.Timestamp]: '',
    [FilterFields.TraceId]: '',
    [FilterFields.SpanId]: '',
    [FilterFields.Commit]: '',
    [FilterFields.StartDate]: '', 
    [FilterFields.EndDate]: '',
};

const FiltersComponent: React.FC<FiltersComponentProps> = ({ onFilterChange }) => {
    const [filters, setFilters] = useState<Record<string, string>>(INITIAL_FILTERS);

    const handleFilterChange = useCallback((field: string, value: string) => {
        setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    }, []);

    const applyFilters = useCallback(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    return (
        <div className="filters-container">
            {Object.values(FilterFields).map((field) => (
                <label key={field} htmlFor={field} className="filter-label">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                    <input
                        id={field}
                        type="text"
                        value={filters[field]}
                        onChange={(e) => handleFilterChange(field, e.target.value)}
                        className="filter-input"
                        aria-label={`Filter by ${field}`}
                        placeholder={`Enter ${field}`}
                    />
                </label>
            ))}
            <button onClick={applyFilters} className="filter-button">Apply Filters</button>
        </div>
    );
};

export default FiltersComponent;