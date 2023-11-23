import React, { useState } from 'react';
import { FiltersComponent, SearchComponent, ResultDisplayComponent } from './components';
import { useLogs } from './hooks/useLogs';
import './App.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Record<string, string>>({
    level: '',
    message: '',
    resourceId: '',
    timestamp: '',
    traceId: '',
    spanId: '',
    commit: '',
    startDate: '', 
    endDate: '',
  });

  const logs = useLogs(searchQuery, filters, currentPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage > 1 ? prevPage - 1 : 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (updatedFilters: Record<string, string>) => {
    setFilters(updatedFilters);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Log Search</h1>
      <SearchComponent onSearch={handleSearch} />
      <FiltersComponent onFilterChange={handleFilterChange} />
      <ResultDisplayComponent logs={logs} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} currentPage={currentPage} />
    </div>
  );
};

export default App;