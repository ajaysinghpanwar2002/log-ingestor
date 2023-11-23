import React, { useState, useCallback } from 'react';
import '../styles/SearchComponent.css';

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = useCallback((event: React.FormEvent) => {
        event.preventDefault();
        onSearch(searchQuery);
    }, [onSearch, searchQuery]);

    return (
        <form className="search-container" onSubmit={handleSearch}>
            <input
                className="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for logs with the message"
                aria-label="Search query"
            />
            <button className="search-button" type="submit">Search</button>
        </form>
    );
};

export default SearchComponent;