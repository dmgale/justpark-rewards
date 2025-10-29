# JustPark Rewards 🏆

A parking space search application with an innovative tiered loyalty program concept for JustPark.

## 🎯 Project Overview

**JustPark Rewards** is a frontend technical challenge submission that reimagines JustPark's parking search experience with a loyalty tiered approach. This application demonstrates a modern, accessible parking search interface with interactive geospatial visualization.

## ✨ Demo
To support review, this has also been deployed via Vercel to: https://justpark-rewards.vercel.app/ 

## ✨ Features

### Core Requirements (Challenge Completion plus extra)
- ✅ Search parking by location and date/time (see assumptions)
- ✅ Interactive map with parking space markers (DeckGL)
- ✅ Side-by-side list view of available spaces
- ✅ Filter by price and features (EV Charging, CCTV, etc.)
- ✅ Interactive map/list synchronization, with google streetview - hover to highlight markers
- ✅ Mock API implementation using Mirage JS
- ✅ Full TypeScript support
- ✅ React Router 7 for navigation
### Extra
- ✅ Reserve or Save a searched parking space
- ✅ Side Navigation to view Reserved, Saved
- ✅ View all Parking Spaces in area, shortlist by Recommended, Cheapest, Closest
- ✅ New concept - Membership Profile/Tier (Loyalty System)

### Technical Highlights
- **React Aria Components** - Accessible, production-ready UI components
- **DeckGL** - High-performance geospatial visualization
- **Mirage JS** - Mock API with 20 real London parking locations
- **TypeScript** - Full type safety throughout the application
- **Vite** - Fast development and optimized builds
- **State Management** - Context and component hooks (useState)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- GOOGLE_STREET_VIEW_API_KEY (provided as .env file, for demo purposes only.  Do not distribute.)

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

## 🎨 Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router 7
- **UI Components**: React Aria Components (Adobe)
- **Maps**: DeckGL for geospatial visualization
- **Mock API**: Mirage JS
- **Styling**: Tailwind CSS

---

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
---

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

This project was completed within the challenge timeframe.  
- ✅ Core functionality: Map, list, search, filters
- ✅ Mock API with realistic data
- ✅ Interactive map/list synchronization
- ✅ TypeScript setup and type safety
TypeScript setup and type safety
- ✅ Cleanup, styling and clear commenting in code

Note: Extra items listed above may have fallen outside of this timeframe but timeboxed. 

## 📝 Assumptions & Trade-offs

1. **Mock Data**: Used realistic London locations for demonstration purposes, though addresses may not represent actual parking facilities.

2. **Styling Approach**: Prioritized functionality over pixel-perfect design. Mixed styling patterns (inline styles, CSS files, React Aria components) would benefit from standardization via a theme file with design tokens.

3. **Error Handling**: Implemented basic error states. Production deployment would require comprehensive error handling and user feedback mechanisms.

4. **Browser Support**: Targets modern browsers with ES6+ support only.

5. **Responsive Design**: Desktop-first approach implemented. Mobile experience needs refinement, particularly:
   - SearchForm layout (currently fixed at 500px width)
   - Consider toggle button to show/hide search on mobile
   - Potential integration with RightSidebar for better mobile UX
   - Design consultation recommended for optimal solution

6. **State Management**: Leveraged Context API and useState hooks for this POC to reduce complexity. Sufficient for managing reserved spaces, saved spaces, and search results without introducing Redux.

7. **Time Block Availability**: Assumes backend service handles availability logic (startTime/endTime filtering). Frontend validates user input via calendar controls (prevents selecting past dates/times in the "Until" field).

8. **Design Freedom**: Without provided designs, exercised creative interpretation for UI/UX decisions and icon selection. Used Lucide React icon set (licensing considerations needed for production vs inline SVG alternatives).

---

## 🚀 Future Enhancements

### High Priority

**State Management Evolution**
- Introduce Redux or similar state management solution for scalability
- Current Context API + useState approach suitable for POC but may not scale with feature expansion (similar to full JustPark site functionality)

**Clear/Remove Functionality**
- Add ability to delete reserved and saved space bookings
- Currently out of scope, but essential for production
- Would require new DELETE endpoint and state update logic

**Mobile Responsiveness**
- Comprehensive mobile optimization pass
- SearchForm responsive redesign
- Touch interaction improvements
- Bottom sheet pattern for mobile filters/search

### Medium Priority

**Testing Suite**
- Unit tests for components and utilities
- Integration tests for user flows
- E2E tests for critical paths
- Mock API testing strategies

**Validation Enhancement**
- Comprehensive form validation
- Consider Zod for schema definition and runtime validation
- Leverage TypeScript + Zod for type-safe data handling throughout application

**Map Interaction Improvements**
- Resolve scroll conflict between SearchResults panel and Map
  - Currently keyboard scrolling works, but mouse scroll prioritizes Map despite z-index layering
  - Evaluate alternative mapping solutions (Google Maps vs DeckGL/MapLibre)
- Optimize MapIcon and TextLayer rendering
  - Fine-tune text and icon layer overlap for better UX
  - Improve icon scaling across zoom levels
  - Consider different mapping technology if DeckGL limitations persist

### Low Priority

**Styling Standardization**
- Create centralized theme file with design tokens
- Standardize styling strategy (CSS modules, Tailwind, styled-components, or inline)
- Build comprehensive Button component variants to handle all React Aria use cases
- Address hover state styling from React Aria components

**Accessibility Audit**
- WCAG compliance review
- Screen reader optimization
- Keyboard navigation improvements
- Focus management refinements

---

## 💡 Technical Debt Notes

- **API Contract Alignment**: Frontend assumes backend provides pre-filtered availability. Important to validate search request/response contracts match specification.
- **Icon Licensing**: Lucide React usage should be verified for production licensing requirements.
- **Browser Polyfills**: May need to add polyfills if older browser support becomes a requirement.

---

## 🎯 JustPark Rewards Loyalty Concept

While completing the technical challenge, I noticed JustPark currently lacks a traditional loyalty program.  Whilst benefits can be gained through longer booking blocks, **JustPark Rewards** introduces a tiered loyalty scheme that could:
- Reward frequent parkers with points on every booking
- Offer exclusive perks like priority spaces and enhanced support
- Provide volume discounts and member-only features
- Increase customer retention and lifetime value
- Falls inline with EV Rewards programme, or could cross collaborate

This concept positions JustPark Gold as a premium membership tier that differentiates from competitors.  This Task Demonstrates 'instant upgrade' possibilities for loyalty, repeat business and repeat revenue subscription model.

### Proposed Tier Structure
- **Gold** - £5/month or £50/year
  - 10% off all bookings
  - Priority customer support
  - Exclusive access to premium spaces
  - Earn 2x points per booking
  
- **Silver** - Free tier
  - 5% off bookings
  - Earn 1x points per booking
  - Standard support

- **Entry** - Standard users
  - Pay-as-you-go pricing (as-is)


---

## 🏗️ Project Structure

```
justpark-rewards/
├── node_modules/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── applayout/
│   │   │   ├── Applayout.tsx
│   │   │   ├── LeftSideBar.tsx
│   │   │   ├── Main.tsx
│   │   │   └── RightSideBar.tsx
│   │   ├── profile/
│   │   │   ├── MembershipTiers.tsx
│   │   │   └── ProfileSection.tsx
│   │   ├── search/
│   │   │   ├── DateTimeField.tsx
│   │   │   ├── LayerToggle.tsx
│   │   │   ├── LocationSearch.tsx
│   │   │   ├── ParkingSpaceCard.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── SearchForm.tsx
│   │   │   └── SearchResults.tsx
│   │   ├── Button.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── MapLayer.tsx
│   │   └── SelectFeature.tsx
│   ├── context/
│   │   └── ParkingContext.tsx
│   ├── mirage/
│   │   ├── data/
│   │   ├── routes/
│   │   └── config.ts
│   ├── types/
│   │   ├── search.types.ts
│   │   └── toggle.types.ts
│   ├── ui/
│   │   ├── search-responsive.css
│   │   └── search-styles.css
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── formatters.ts
│   │   ├── useFeatures.ts
│   │   ├── calcDistance.tsx
│   │   ├── convertToGeoJson.ts
│   │   └── lucideToDataUrl.tsx
│   ├── util/
│   ├── App.tsx
│   ├── index.css
│   └── index.tsx
├── .env
├── .gitignore
├── .eslintrc.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

### Key Directories

**`src/components/`** - React components organized by feature
- `applayout/` - Main application layout components (sidebar, main content area)
- `profile/` - User profile and membership tier components
- `search/` - Parking search functionality (forms, results, cards, map interactions)

**`src/context/`** - React Context API for state management
- `ParkingContext.tsx` - Global state for parking data, reservations, and saved spaces

**`src/mirage/`** - Mock API server configuration
- `data/` - Mock data for development
- `routes/` - API route definitions
- `config.ts` - MirageJS server setup

**`src/types/`** - TypeScript type definitions
- Shared interfaces and types for type-safe development

**`src/utils/`** - Utility functions and custom hooks
- Distance calculations, data formatting, GeoJSON conversion, and feature toggles

**`src/ui/`** - Styling files
- Component-specific CSS for search functionality

---

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

**Thank you for reviewing my submission!** 🚗 # justpark-rewards
