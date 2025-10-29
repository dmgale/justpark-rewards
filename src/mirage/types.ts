export interface ParkingSpace {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  price: number; 
  features: string[];
}

export interface ParkingSearchRequest {
  location: string; // e.g., "London Bridge"
  startTime: string; // e.g., "2025-10-15T09:00:00Z"
  endTime: string; // e.g., "2025-10-15T17:00:00Z"
}

export interface ParkingSearchResponse {
  spaces: ParkingSpace[];
}