import { useState, useEffect } from 'react';
import Main from './Main';
import LeftSidebar from './LeftSideBar';
import RightSidebar from './RightSideBar';

function AppLayout() {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



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
      />
    </div>
  );
}

export default AppLayout;