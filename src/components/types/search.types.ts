// Location type for search
export interface Location {
  id: number;
  name: string;
}

// Location search component props
export interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  locations: Location[];
  showValidation?: boolean;
}

// DateTime field component props
export interface DateTimeFieldProps {
  label: string;
  value: any; // DateValue from @internationalized/date
  onChange: (value: any) => void;
  timeLabel: string;
  minValue?: any; // DateValue from @internationalized/date
}

// Search component props
export interface SearchProps {
  showAllSpaces?: boolean;
  onToggleAllSpaces?: () => void;
  onSearchResults?: (results: ParkingSearchResponse) => void;
  onResultClick?: (space: ParkingSpace) => void;
}

// Search form component props
export interface SearchFormProps {
  location: string;
  fromDateTime: any;
  untilDateTime: any;
  currentTime: any;
  onLocationChange: (value: string) => void;
  onFromDateTimeChange: (dateTime: any) => void;
  onUntilDateTimeChange: (dateTime: any) => void;
  onSearch: () => void;
  onClearSearch?: () => void;
  isSearching: boolean;
  showValidation: boolean;
  showAllSpaces?: boolean;
  onToggleAllSpaces?: () => void;
  clearTrigger?: number; // Number that increments only on explicit clear
}

// Parking search request
export interface ParkingSearchRequest {
  location: string;
  startTime: string;
  endTime: string;
}

// Parking space data
export interface ParkingSpace {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  rating?: number;
  distance?: string;
  availability?: string;
  features?: string[];
}

// Search response
export interface ParkingSearchResponse {
  spaces: ParkingSpace[];
  totalResults: number;
}

// Search results component props
export interface SearchResultsProps {
  results: ParkingSearchResponse;
  onResultClick?: (space: ParkingSpace) => void;
  searchLocation?: { lat: number; lng: number } | null;
  showAllSpaces?: boolean;
}