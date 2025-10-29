import { Search, ArrowRight, X } from 'lucide-react';
import { LocationSearch } from './LocationSearch';
import { DateTimeField } from './DateTimeField';
import { LOCATIONS } from '../utils/constants';
import type { SearchFormProps } from '../types/search.types';
import { Button } from '../Button';
import LayerToggle from './LayerToggle';

export function SearchForm({
  location,
  fromDateTime,
  untilDateTime,
  currentTime,
  onLocationChange,
  onFromDateTimeChange,
  onUntilDateTimeChange,
  onSearch,
  isSearching,
  showValidation = false,
  showAllSpaces = false,
  onToggleAllSpaces,
  onClearSearch,
  clearTrigger = 0,
}: SearchFormProps) {
  return (
    <div style={styles.searchCard}>
      <div style={styles.searchFields}>
        <LocationSearch
          key={`location-search-${clearTrigger}`}
          value={location}
          onChange={onLocationChange}
          locations={LOCATIONS}
          showValidation={showValidation}
        />
        
        <div style={styles.dateTimeRow}>
          <DateTimeField
            label="From"
            value={fromDateTime}
            onChange={onFromDateTimeChange}
            timeLabel="Time"
            minValue={currentTime}
          />
          
          <div style={styles.arrow}>
            <ArrowRight size={24} color="#9ca3af" />
          </div>
          
          <DateTimeField
            label="Until"
            value={untilDateTime}
            onChange={onUntilDateTimeChange}
            timeLabel="Time"
            minValue={fromDateTime}
          />
        </div>
      </div>
      
      <div style={styles.buttonContainer}>
        <Button 
          onPress={onSearch} 
          isDisabled={isSearching}
          size="lg"
          icon={<Search size={20} />}
        >
          {isSearching ? 'Searching...' : 'Show parking spaces'}
        </Button>
        
        {/* Clear Search Button */}
        {onClearSearch && (
          <div style={styles.clearContainer}>
            <span style={styles.clearLabel}>Clear Search</span>
            <button
              onClick={onClearSearch}
              disabled={!location && !showValidation}
              style={{
                ...styles.clearButton,
                ...(!location && !showValidation ? styles.clearButtonDisabled : {})
              }}
              title="Clear search"
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        )}
        
        {onToggleAllSpaces && (
          <LayerToggle
            label="All Spaces"
            checked={showAllSpaces}
            onChange={onToggleAllSpaces}
            selectorColor="#22c55e"
            iconDataURL=""
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  searchCard: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: 'none',
  },
  searchFields: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginBottom: '12px',
  },
  dateTimeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'nowrap' as const,
  },
  arrow: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '0px',
    flexShrink: 0,
  },
  buttonContainer: {
    marginTop: '0px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  clearContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },
  clearLabel: {
    fontSize: '12px',
    fontWeight: '500' as const,
    color: '#374151',
    whiteSpace: 'nowrap' as const,
  },
  clearButton: {
    padding: '10px',
    background: '#f3f4f6',
    color: '#6b7280',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    flexShrink: 0,
    height: '40px',
    width: '40px',
  },
  clearButtonDisabled: {
    background: '#f9fafb',
    color: '#d1d5db',
    border: '1px solid #e5e7eb',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
};