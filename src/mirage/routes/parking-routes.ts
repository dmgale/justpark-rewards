import { Response } from 'miragejs';
import { parkingSpaces } from '../data/parkingSpaces';
import type { ParkingSearchRequest } from '../types';
import { convertToGeoJSON } from '../../util/converToGeoJson';

export function parkingRoutes(server: any) {
  // POST /api/parking/search
  server.post('/parking/search', (schema: any, request: any) => {
    const requestBody: ParkingSearchRequest = JSON.parse(request.requestBody);
    const { location, startTime, endTime } = requestBody;

    console.log('🔍 Parking search request:', { location, startTime, endTime });

    // Filter spaces based on location keyword
    let filteredSpaces = parkingSpaces;
    
    if (location) {
      const searchTerm = location.toLowerCase();
      filteredSpaces = parkingSpaces.filter(space => 
        space.name.toLowerCase().includes(searchTerm) ||
        space.address.toLowerCase().includes(searchTerm)
      );
    }

    // If no matches found, return random spaces
    if (filteredSpaces.length === 0) {
      console.log('⚠️ No matches found for location, returning random spaces');
      filteredSpaces = parkingSpaces;
    }

    // Shuffle and return 3-5 random spaces
    const shuffled = [...filteredSpaces].sort(() => 0.5 - Math.random());
    const resultCount = Math.min(
      Math.floor(Math.random() * 3) + 3, // Random 3-5
      shuffled.length
    );
    const selectedSpaces = shuffled.slice(0, resultCount);

    // Convert to GeoJSON format
    const geoJSONResponse = convertToGeoJSON({ spaces: selectedSpaces });

    console.log(`✅ Returning ${selectedSpaces.length} parking spaces in GeoJSON format`);

    return new Response(200, {}, geoJSONResponse);
  });
}