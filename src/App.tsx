import React, { useState, useRef } from 'react';
import { ParkingProvider } from './context/ParkingContext';
import MapLayer from './components/MapLayer';
import type { ParkingSpace } from './components/types/search.types';
import RightSidebar from './components/applayout/RightSideBar';

function App() {
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(true); 
  const mapLayerRef = useRef<any>(null);

  // Handle "View on Map" from sidebar
  const handleViewOnMap = (space: ParkingSpace) => {
    console.log('Flying to parking space:', space.name);
    
    // Trigger map to fly to this location
    if (mapLayerRef.current && mapLayerRef.current.flyToLocation) {
      mapLayerRef.current.flyToLocation(space.lng, space.lat);
    }
  
  };

  return (
    <ParkingProvider>
      <div className="App">
        <MapLayer ref={mapLayerRef} />
        <RightSidebar
          isRightSidebarCollapsed={isRightSidebarCollapsed}
          changeIsRightSidebarCollapsed={setIsRightSidebarCollapsed}
          onViewOnMap={handleViewOnMap}
        />
      </div>
    </ParkingProvider>
  );
}

export default App;