import React, { useState, useEffect, useCallback } from 'react';
import SeriesFilterSection from './SeriesFilterSection';
import Navbar from '../componet/Navbar';
import Footer from '../componet/Footer';


const useSeriesFilters = () => {
    const [filters, setFilters] = useState({
        search: '',
        genre: '',
        year: '',
        country: ''
    });
    const [debouncedSearch, setDebouncedSearch] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, 300);
        return () => clearTimeout(timer);
    }, [filters.search]);
    const updateFilter = useCallback((key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    }, []);
    const clearAllFilters = useCallback(() => {
        setFilters({ search: '', genre: '', year: '', country: '' });
    }, []);
    const getActiveFiltersCount = useCallback(() => {
        let count = 0;
        if (filters.genre) count++;
        if (filters.year) count++;
        if (filters.country) count++;
        return count;
    }, [filters]);
    return {
        filters: { ...filters, search: debouncedSearch },
        updateFilter,
        clearAllFilters,
        getActiveFiltersCount,
        rawSearch: filters.search
    };
};


//     const [filteredSeries, setFilteredSeries] = useState(series);
//     const [isLoading, setIsLoading] = useState(false);
//     useEffect(() => {
//         setIsLoading(true);
//         const timer = setTimeout(() => {
//             let filtered = [...series];
//             if (filters.search) {
//                 const searchTerm = filters.search.toLowerCase();
//                 filtered = filtered.filter(item =>
//                     item.title.toLowerCase().includes(searchTerm) ||
//                     item.englishTitle.toLowerCase().includes(searchTerm) ||
//                     item.description.toLowerCase().includes(searchTerm)
//                 );
//             }
//             if (filters.genre) {
//                 filtered = filtered.filter(item => item.genre === filters.genre);
//             }
//             if (filters.year) {
//                 filtered = filtered.filter(item => item.year === filters.year);
//             }
//             if (filters.country) {
//                 filtered = filtered.filter(item => item.country === filters.country);
//             }
//             filtered.sort((a, b) => {
//                 if (b.rating !== a.rating) {
//                     return b.rating - a.rating;
//                 }
//                 return parseInt(b.year) - parseInt(a.year);
//             });
//             setFilteredSeries(filtered);
//             setIsLoading(false);
//         }, 150);
//         return () => clearTimeout(timer);
//     }, [series, filters]);
//     return { filteredSeries, isLoading };
// };

const EnhancedSeriesFilterSection = () => {
    const {
        filters,
        updateFilter,
        clearAllFilters,
        getActiveFiltersCount,
        rawSearch
    } = useSeriesFilters();
  
    return (
        <div className="min-h-screen bg-black">
            <Navbar />
            <SeriesFilterSection
                filters={filters}
                rawSearch={rawSearch}
                updateFilter={updateFilter}
                clearAllFilters={clearAllFilters}
                getActiveFiltersCount={getActiveFiltersCount}
            />
            <Footer />
        </div>
    );
};

export default EnhancedSeriesFilterSection;
