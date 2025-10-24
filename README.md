# JustPark Rewards 🏆

A parking space search application with an innovative tiered loyalty program concept for JustPark.

## 🎯 Project Overview

**JustPark Rewards** is a frontend technical challenge submission that reimagines JustPark's parking search experience with a loyalty tiered approach. This application demonstrates a modern, accessible parking search interface with interactive geospatial visualization.

## ✨ Features

### Core Requirements (Challenge Completion)
- ✅ Search parking by location and date/time
- ✅ Interactive map with parking space markers (DeckGL)
- ✅ Side-by-side list view of available spaces
- ✅ Filter by price and features (EV Charging, CCTV, etc.)
- ✅ Interactive map/list synchronization - hover to highlight markers
- ✅ Mock API implementation using Mirage JS
- ✅ Full TypeScript support
- ✅ React Router 7 for navigation

### Technical Highlights
- **React Aria Components** - Accessible, production-ready UI components
- **DeckGL** - High-performance geospatial visualization
- **Mirage JS** - Mock API with 20 real London parking locations
- **TypeScript** - Full type safety throughout the application
- **Vite** - Fast development and optimized builds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd justpark-gold

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
TBC
```

## 🎨 Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router 7
- **UI Components**: React Aria Components (Adobe)
- **Maps**: DeckGL for geospatial visualization
- **Mock API**: Mirage JS
- **Styling**: Tailwind CSS

## 🧪 Mock API

The application uses Mirage JS to mock the parking search API. The mock server:
- Intercepts `/api/parking/search` POST requests
- Returns 3-5 parking spaces based on location search
- Includes 20 real London parking locations with accurate coordinates
- Simulates network latency (400ms delay)
- Automatically disabled in production builds

### API Contract

**POST** `/api/parking/search`

Request:
```typescript
{
  location: string;      // e.g., "London Bridge"
  startTime: string;     // e.g., "2025-10-15T09:00:00Z"
  endTime: string;       // e.g., "2025-10-15T17:00:00Z"
}
```

Response:
```typescript
{
  spaces: Array<{
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    price: number;        // Total price in GBP
    features: string[];   // e.g., ["EV Charging", "Covered"]
  }>;
}
```

## 🗺️ Features in Detail

### Interactive Map
- Powered by DeckGL for smooth, performant rendering
- Custom markers for each parking space
- Hover effects synchronized with list view
- Click to select and view details
- Responsive zoom and pan controls

### Search & Filters
- Location-based search with real London areas
- Date/time range selection
- Price range filter
- Feature filters (EV Charging, CCTV, 24/7, Covered, etc.)
- Real-time results update

### Accessibility
- Built with React Aria Components for WCAG compliance
- Keyboard navigation support
- Screen reader friendly
- Focus management
- ARIA labels and semantic HTML

## ⏱️ Time Investment

This project was completed within the 4-hour challenge timeframe:
- ✅ Core functionality: Map, list, search, filters
- ✅ Mock API with realistic data
- ✅ Interactive map/list synchronization
- ✅ TypeScript setup and type safety

### Areas for Future Enhancement


## 📝 Assumptions & Trade-offs

1. **Mock Data**: Used realistic London locations but addresses may not be actual parking facilities
2. **Styling**: Focused on functionality over pixel-perfect design
3. **Error Handling**: Basic error states, would expand in production
4. **Browser Support**: Modern browsers only (ES6+)
5. **Responsive Design**: Desktop-first approach, mobile would need refinement

## 🚢 Building for Production

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

The Mirage JS mock server is automatically disabled in production builds.

## 👥 Developed By

**Frontend Technical Challenge Submission**
- GitHub: dmgale
- Email: mrdavidmgale@gmail.com

## 📄 License

This project is a technical challenge submission for JustPark.

---

## 🙏 Acknowledgments

- JustPark UI team @thomaswelton and @bennyc for the interesting technical challenge
- React Aria team for accessible components
- DeckGL team for amazing geospatial tools
- Mirage JS for seamless API mocking

**Thank you for reviewing my submission!** 🚗✨