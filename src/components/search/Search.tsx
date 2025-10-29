// @ts-nocheck
import React, { useState } from 'react';
import { parseDateTime, now } from '@internationalized/date';
import { AlertCircle } from 'lucide-react';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import '../ui/search-styles.css';
import '../ui/search-responsive.css';
import type { ParkingSearchRequest, ParkingSearchResponse, SearchProps, ParkingSpace } from '../types/search.types';

// Convert GeoJSON to simple format
function convertFromGeoJSON(geoJSON: any) {
  if (!geoJSON || geoJSON.type !== "FeatureCollection" || !Array.isArray(geoJSON.features)) {
    throw new Error("Invalid GeoJSON: expected FeatureCollection");
  }

  return {
    spaces: geoJSON.features.map((feature: any) => ({
      id: feature.properties.ID || feature.properties.id,
      name: feature.properties.NAME || feature.properties.name,
      address: feature.properties.ADDRESS || feature.properties.address,
      lat: feature.geometry.coordinates[1], // GeoJSON is [lng, lat]
      lng: feature.geometry.coordinates[0],
      price: feature.properties.PRICE || feature.properties.price,
      features: feature.properties.FEATURES_ARRAY || 
        (typeof feature.properties.FEATURES === 'string'
          ? feature.properties.FEATURES.split(", ").map((f: string) => f.trim())
          : feature.properties.FEATURES || [])
    }))
  };
}


function Search({ showAllSpaces, onToggleAllSpaces, onSearchResults, onResultClick }: SearchProps = {}) {
  const currentTime = now('UTC');
  const [location, setLocation] = useState('');
  const [fromDateTime, setFromDateTime] = useState(parseDateTime('2025-10-23T14:24'));
  const [untilDateTime, setUntilDateTime] = useState(parseDateTime('2025-10-23T18:24'));
  const [searchResults, setSearchResults] = useState<ParkingSearchResponse | null>(null);
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(0); // Increment only on explicit clear
  const [error, setError] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const handleFromDateTimeChange = (newDateTime) => {
    // Prevent setting "From" to a time in the past
    if (newDateTime && newDateTime.compare(currentTime) < 0) {
      return; // Don't update if trying to set to past
    }
    
    setFromDateTime(newDateTime);
    // If "Until" is before the new "From" time, update it
    if (untilDateTime && newDateTime && untilDateTime.compare(newDateTime) < 0) {
      setUntilDateTime(newDateTime);
    }
  };

  const handleUntilDateTimeChange = (newDateTime) => {
    // Prevent setting "Until" to before "From"
    if (newDateTime && fromDateTime && newDateTime.compare(fromDateTime) < 0) {
      return; // Don't update if trying to set before "From"
    }
    
    setUntilDateTime(newDateTime);
  };

  const handleSearch = async () => {
    if (!location) {
      setShowValidation(true);
      return;
    }
    
    setShowValidation(false);
    setIsSearching(true);
    setError(null);
    
    // Convert date objects to ISO strings
    const startTimeISO = fromDateTime?.toString() 
      ? `${fromDateTime.toString()}:00Z` 
      : new Date().toISOString();
    const endTimeISO = untilDateTime?.toString() 
      ? `${untilDateTime.toString()}:00Z` 
      : new Date().toISOString();
    
    const requestData: ParkingSearchRequest = {
      location,
      startTime: startTimeISO,
      endTime: endTimeISO
    };

    console.log('🔍 Search request:', requestData);

    try {
      const response = await fetch('/api/parking/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch parking spaces');
      }

      const data: ParkingSearchResponse = await response.json();
      console.log('✅ Search response (GeoJSON):', data);
      
      // Convert GeoJSON response to simple format
      const convertedData = convertFromGeoJSON(data);
      console.log('✅ Converted to simple format:', convertedData);
      
      // Create response in expected format
      const searchResponse: ParkingSearchResponse = {
        spaces: convertedData.spaces,
        totalResults: convertedData.spaces.length
      };
      
      setSearchResults(searchResponse);
      
      // Store search location from first result for distance calculation
      if (convertedData.spaces.length > 0) {
        setSearchLocation({
          lat: convertedData.spaces[0].lat,
          lng: convertedData.spaces[0].lng
        });
      }
      
      // Turn off "All Spaces" when search results are shown
      if (onToggleAllSpaces && showAllSpaces) {
        onToggleAllSpaces();
      }
      
      // Call the callback if provided
      if (onSearchResults) {
        onSearchResults(searchResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('❌ Error searching parking:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    // Clear all search state
    setSearchResults(null);
    setSearchLocation(null);
    setLocation('');
    setError(null);
    setShowValidation(false);
    
    // Increment clear trigger to force LocationSearch remount
    setClearTrigger(prev => prev + 1);
    
    // Notify parent component that search was cleared
    if (onSearchResults) {
      onSearchResults({ spaces: [], totalResults: 0 });
    }
    
    // Turn on "All Spaces" when clearing search
    if (onToggleAllSpaces && !showAllSpaces) {
      onToggleAllSpaces();
    }
  };

  return (
    <>
      {/* Combined Search Container */}
      <div style={styles.searchContainer}>
        {/* Search Form */}
        <div style={styles.searchFormWrapper}>
          <SearchForm
            location={location}
            fromDateTime={fromDateTime}
            untilDateTime={untilDateTime}
            currentTime={currentTime}
            onLocationChange={(value) => {
              setLocation(value);
              if (value) setShowValidation(false);
            }}
            onFromDateTimeChange={handleFromDateTimeChange}
            onUntilDateTimeChange={handleUntilDateTimeChange}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            isSearching={isSearching}
            showValidation={showValidation}
            showAllSpaces={showAllSpaces}
            onToggleAllSpaces={onToggleAllSpaces}
            clearTrigger={clearTrigger}
          />
        </div>

        {/* Search Results - Show when results exist, regardless of AllSpaces */}
        {searchResults && searchResults.spaces.length > 0 && (
          <div style={styles.resultsWrapper}>
            <SearchResults 
              results={searchResults} 
              onResultClick={onResultClick}
              searchLocation={searchLocation}
            />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div style={styles.error}>
          <AlertCircle size={20} />
          <div>
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}
    </>
  );
}

export default Search;

const styles = {
  searchContainer: {
    position: 'absolute' as const,
    top: '16px',
    left: '16px',
    bottom: '16px',
    width: '500px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    maxHeight: 'calc(100vh - 32px)',
  },
  searchFormWrapper: {
    flexShrink: 0,
  },
  resultsWrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: 0, 
    height: 0,
  },
  error: {
    position: 'absolute' as const,
    top: '16px',
    left: '472px',
    zIndex: 1000,
    padding: '16px',
    background: '#fee2e2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    color: '#991b1b',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    maxWidth: '400px',
  },
};