import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './Applayout';
import MapLayer from '../MapLayer';


// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Layout with both sidebars
    children: [
      {
        index: true, // Default route shows map
        element: <MapLayer />,
      },
    //   {
    //     path: 'splitView',
    //     element: <SplitView />,
    //   },
    //   {
    //     path: 'settings',
    //     element: <Settings />,
    //   },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

/* 
ROUTE STRUCTURE:

/                    → AppLayout (with sidebars) → MapLayer
/splitView          → AppLayout (with sidebars) → SplitView  
/settings           → AppLayout (with sidebars) → Settings

The AppLayout provides:
- Left sidebar (navigation)
- Right sidebar (search, reservations, saved, profile)
- Main content area (renders child routes via Outlet)

URL Navigation Examples:
- http://localhost:3000/           → Shows map
- http://localhost:3000/splitView  → Shows split view
- http://localhost:3000/settings   → Shows settings

Left sidebar links automatically navigate between these routes.
Both sidebars remain visible across all routes.
*/