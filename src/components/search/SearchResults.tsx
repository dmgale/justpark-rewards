import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, Search } from 'lucide-react';
import { ParkingSpaceCard } from './ParkingSpaceCard';
import type { SearchResultsProps } from '../types/search.types';
import { calculateDistance } from '../../util/calcDistance';

export function SearchResults({ results, onResultClick, searchLocation }: SearchResultsProps) {
  const [sortBy, setSortBy] = useState<'recommended' | 'cheapest' | 'closest'>('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  if (!results) return null;

  // Extract all unique features from results
  const allFeatures = Array.from(
    new Set(
      results.spaces
        .flatMap(space => space.features || [])
        .filter(Boolean)
    )
  ).sort();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedFeatures([]);
  };

  // Filter spaces based on selected features
  const filteredSpaces = results.spaces.filter(space => {
    if (selectedFeatures.length === 0) return true;
    
    const spaceFeatures = space.features || [];
    return selectedFeatures.every(feature => spaceFeatures.includes(feature));
  });

  // Sort filtered results
  const sortedSpaces = [...filteredSpaces].sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'closest' && searchLocation) {
      const distA = calculateDistance(searchLocation.lat, searchLocation.lng, a.lat, a.lng);
      const distB = calculateDistance(searchLocation.lat, searchLocation.lng, b.lat, b.lng);
      return distA - distB;
    }
    return 0; // recommended - keep original order
  });

  return (
    <div style={styles.container} className="search-results-container">
      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={{
            ...styles.tab,
            ...(sortBy === 'recommended' ? styles.tabActive : {})
          }}
          onClick={() => setSortBy('recommended')}
        >
          Recommended
        </button>
        <button
          style={{
            ...styles.tab,
            ...(sortBy === 'cheapest' ? styles.tabActive : {})
          }}
          onClick={() => setSortBy('cheapest')}
        >
          Cheapest
        </button>
        <button
          style={{
            ...styles.tab,
            ...(sortBy === 'closest' ? styles.tabActive : {})
          }}
          onClick={() => setSortBy('closest')}
        >
          Closest
        </button>
        
        {/* Filters Button with Dropdown */}
        <div style={styles.filterContainer} ref={filterRef}>
          <button 
            style={{
              ...styles.filterButton,
              ...(selectedFeatures.length > 0 ? styles.filterButtonActive : {})
            }}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={16} />
            Filters
            {selectedFeatures.length > 0 && (
              <span style={styles.filterBadge}>{selectedFeatures.length}</span>
            )}
          </button>

          {/* Dropdown Menu */}
          {showFilters && (
            <div style={styles.dropdown}>
              <div style={styles.dropdownHeader}>
                <span style={styles.dropdownTitle}>Filter by Features</span>
                {selectedFeatures.length > 0 && (
                  <button style={styles.clearButton} onClick={clearFilters}>
                    Clear all
                  </button>
                )}
              </div>
              
              <div style={styles.dropdownContent}>
                {allFeatures.length > 0 ? (
                  allFeatures.map(feature => (
                    <label key={feature} style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedFeatures.includes(feature)}
                        onChange={() => toggleFeature(feature)}
                        style={styles.checkbox}
                      />
                      <span>{feature}</span>
                    </label>
                  ))
                ) : (
                  <div style={styles.noFeatures}>No features available</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div style={styles.resultsCount}>
        {filteredSpaces.length} {filteredSpaces.length === 1 ? 'space' : 'spaces'} found
        {selectedFeatures.length > 0 && (
          <span style={styles.filteringText}> with selected filters</span>
        )}
      </div>

      {/* Results List */}
      <div style={styles.resultsList} className="search-results-list">
        {sortedSpaces.length > 0 ? (
          sortedSpaces.map((space) => (
            <ParkingSpaceCard 
              key={space.id} 
              space={space} 
              onClick={() => onResultClick?.(space)}
            />
          ))
        ) : (
          <div style={styles.noResults}>
            <Search size={48} color="#9ca3af" strokeWidth={2} />
            <p style={styles.noResultsText}>No spaces match your filters</p>
            <button style={styles.clearFiltersButton} onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  tabs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    flexShrink: 0,
  },
  tab: {
    padding: '8px 16px',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: '#22c55e',
    color: '#ffffff',
  },
  filterContainer: {
    marginLeft: 'auto',
    position: 'relative' as const,
  },
  filterButton: {
    padding: '8px 12px',
    background: 'transparent',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.2s',
  },
  filterButtonActive: {
    backgroundColor: '#22c55e',
    color: '#ffffff',
    borderColor: '#22c55e',
  },
  filterBadge: {
    backgroundColor: '#ffffff',
    color: '#22c55e',
    borderRadius: '10px',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: '600',
    minWidth: '20px',
    textAlign: 'center' as const,
  },
  dropdown: {
    position: 'absolute' as const,
    top: 'calc(100% + 8px)',
    right: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    minWidth: '240px',
    zIndex: 1000,
  },
  dropdownHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
  },
  dropdownTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111827',
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: '#22c55e',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  dropdownContent: {
    padding: '8px',
    maxHeight: '300px',
    overflowY: 'auto' as const,
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
    fontSize: '14px',
    color: '#374151',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    appearance: 'none' as const,
    backgroundColor: '#ffffff',
    border: '2px solid #d1d5db',
    borderRadius: '4px',
    position: 'relative' as const,
    transition: 'all 0.2s',
  },
  noFeatures: {
    padding: '16px',
    textAlign: 'center' as const,
    color: '#9ca3af',
    fontSize: '14px',
  },
  resultsCount: {
    padding: '12px 16px',
    fontSize: '13px',
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    flexShrink: 0,
  },
  filteringText: {
    color: '#22c55e',
    fontWeight: '500',
  },
  resultsList: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    padding: '8px',
    minHeight: 0,
    height: 0,
    // Force visible scrollbar
    scrollbarWidth: 'thin' as const, // Firefox
    scrollbarColor: '#22c55e #f3f4f6', // Firefox: thumb track
  },
  noResults: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    textAlign: 'center' as const,
  },
  noResultsText: {
    marginTop: '16px',
    marginBottom: '16px',
    fontSize: '16px',
    color: '#6b7280',
  },
  clearFiltersButton: {
    padding: '10px 20px',
    backgroundColor: '#22c55e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
};