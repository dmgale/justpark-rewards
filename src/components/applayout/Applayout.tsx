import { useState, useEffect } from 'react';
import Main from './Main';
import LeftSidebar from './LeftSideBar';
import RightSidebar from './RightSideBar';
import Search from '../search/Search';

function AppLayout() {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showAllSpaces, setShowAllSpaces] = useState(true);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Example data for reservations and saved spaces
  const [reservations, setReservations] = useState([
    {
      name: "King's Cross Parking",
      address: "123 King's Cross Rd, London",
      price: 8.50,
      date: "28 Oct 2025, 14:00",
    },
    {
      name: "Camden Lock Garage",
      address: "78 Camden High St, London",
      price: 6.00,
      date: "29 Oct 2025, 10:00",
    },
  ]);

  const [savedSpaces, setSavedSpaces] = useState([
    {
      name: "Angel Central Car Park",
      address: "456 Angel St, London",
      price: 7.00,
      rating: 4.5,
    },
    {
      name: "Shoreditch Underground Parking",
      address: "12 Old St, London",
      price: 9.50,
      rating: 4.8,
    },
    {
      name: "Islington Secure Parking",
      address: "234 Upper St, London",
      price: 5.50,
      rating: 4.2,
    },
  ]);

  const handleSearchResults = (results: any) => {
    console.log('Search results:', results);
    // You can lift this state up and pass to MapLayer if needed
  };

  const handleResultClick = (space: any) => {
    console.log('Clicked space:', space);
    // Handle space click - maybe fly to location on map
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Left Sidebar - Navigation */}
      <LeftSidebar
        isLeftSidebarCollapsed={isLeftSidebarCollapsed}
        changeIsLeftSidebarCollapsed={setIsLeftSidebarCollapsed}
      />

      {/* Main Content - Uses Outlet for nested routes */}
      <Main
              isRightSidebarCollapsed={isRightSidebarCollapsed}
              screenWidth={screenWidth} children={undefined}      />

      {/* Right Sidebar - Search, Reservations, Saved, Profile */}
      <RightSidebar
        isRightSidebarCollapsed={isRightSidebarCollapsed}
        changeIsRightSidebarCollapsed={setIsRightSidebarCollapsed}
        reservations={reservations}
        savedSearches={savedSpaces}
      />
    </div>
  );
}

export default AppLayout;