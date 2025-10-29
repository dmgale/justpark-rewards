import { useEffect, useState, useMemo, useImperativeHandle, forwardRef } from 'react'
import DeckGL, { IconLayer, TextLayer, type LayersList, type MapViewState } from 'deck.gl'
import SelectedFeaturePopup from './SelectFeature'
import { Map } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'
import Search from './search/Search'
import { spacesData } from '../mirage/data/geoParkingSpaces'
import { MapPin } from 'lucide-react'
import { lucideToDataURL } from '../util/lucideToDataUrl'
import type { ParkingSpace } from './types/search.types'

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -0.1151,
  latitude: 51.5301,
  zoom: 14,
  bearing: 10,
  pitch: 40,
}

const MAP_STYLE =
  'https://api.maptiler.com/maps/streets-v2/style.json?key=XsPBXxJn70lu8lGWhqxs'

const GOOGLE_STREET_VIEW_API_KEY = 'AIzaSyD25YmJ-gbkPJTf_2JiHifm9RYj25yy4kQ'

const spaceIcon = lucideToDataURL(MapPin, '#22c55e', 32, 2, true)

interface SearchResults {
  spaces?: ParkingSpace[];
}

const MapLayer = forwardRef((_props, ref) => {
  const [layers, setLayers] = useState<LayersList>([])
  const [showAllSpaces, setShowAllSpaces] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState<any>(null)
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE)
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null)

  // Expose flyToLocation method to parent components
  useImperativeHandle(ref, () => ({
    flyToLocation: (longitude: number, latitude: number) => {
      setViewState({
        ...viewState,
        longitude,
        latitude,
        zoom: 16,
        pitch: 45,
        bearing: 10,
        transitionDuration: 1500,
      })
    }
  }))

  // Memoize displayData to prevent recreation on every render
  const displayData = useMemo(() => {
    // Prepare search results in the correct format
    const searchResultsData = searchResults?.spaces && searchResults.spaces.length > 0
      ? searchResults.spaces.map(space => ({
          geometry: { coordinates: [space.lng, space.lat] },
          properties: {
            NAME: space.name,
            ADDRESS: space.address,
            PRICE: space.price,
            FEATURES_ARRAY: space.features,
            IS_SEARCH_RESULT: true, // Mark as search result
            ID: space.id,
            ...space
          }
        }))
      : [];

    if (showAllSpaces) {
      // When toggle is ON: Show ALL spaces + search results
      if (searchResultsData.length > 0 && searchResults?.spaces) {
        // Combine all spaces with search results, avoiding duplicates
        const searchResultIds = new Set(searchResults.spaces.map(s => s.id));
        const allSpacesNotInSearch = spacesData.features.filter(
          feature => !searchResultIds.has(feature.properties.ID)
        );
        return [...searchResultsData, ...allSpacesNotInSearch];
      }
      // No search results, just show all spaces
      return spacesData.features;
    } else {
      // When toggle is OFF: Show only search results
      return searchResultsData;
    }
  }, [searchResults, showAllSpaces])

  useEffect(() => {
    const layers: LayersList = []

    if (displayData && displayData.length > 0) {
      layers.push(
        new IconLayer({
          id: 'parking-spaces-layer',
          data: displayData,
          pickable: true,
          onClick: ({ object }) => setSelectedFeature(object),
         getIcon: () => ({
  url: spaceIcon,
  width: 32,
  height: 32,
  anchorY: 32,
  anchorX: 16,
}),
sizeScale: 7,
getSize: () => 5,
          pointType: 'icon',
          getPosition: (d) => d.geometry.coordinates,
          parameters: {
            depthTest: false,
          },
        })
      )

      // Text layer for prices
      layers.push(
        new TextLayer({
          id: 'parking-prices-labels',
          data: displayData,
          getPosition: (d) => {
            const coords = d.geometry.coordinates
            return [coords[0], coords[1] + 0.00015] // Offset above icon
          },
          getText: (d) => `£${d.properties.PRICE.toFixed(2)}`,
          getSize: 14,
          getColor: [34, 197, 94],
          getTextAnchor: 'middle',
          getAlignmentBaseline: 'bottom',
          fontFamily: 'Arial, sans-serif',
          fontWeight: 'bold',
          characterSet: 'auto',
          background: true,
          getBackgroundColor: [255, 255, 255, 255], // White background
          backgroundPadding: [6, 3, 6, 3], // [left, top, right, bottom] padding
          getBorderColor: [249, 250, 251], // Optional light grey border
          getBorderWidth: 1,
          parameters: {
            depthTest: false,
          },
        })
      )
    }
    setLayers([layers])
  }, [displayData]) // Only depend on displayData, which is now memoized

  // Handle search results from Search component
  const handleSearchResults = (results: SearchResults | null) => {
    // If results are empty/cleared, reset search state
    if (!results || !results.spaces || results.spaces.length === 0) {
      setSearchResults(null);
      return;
    }
    
    setSearchResults(results);
    
    // If we have results, fly to the first result
    if (results.spaces.length > 0) {
      const firstSpace = results.spaces[0]
      setViewState({
        ...viewState,
        longitude: firstSpace.lng,
        latitude: firstSpace.lat,
        zoom: 14,
        transitionDuration: 1000,
      })
    }
  }

  // Handle clicking on a search result
  const handleResultClick = (space: ParkingSpace) => {
    // Fly to the clicked parking space
    setViewState({
      ...viewState,
      longitude: space.lng,
      latitude: space.lat,
      zoom: 16,
      pitch: 45,
      transitionDuration: 1000,
    })
  }

  // Add google street view
const getStreetViewUrl = (feature: any): string | null => {
  const coords = feature?.geometry?.coordinates;
  if (!coords) return null;
  
  const lat = coords[1];
  const lng = coords[0];
  
  return `https://maps.googleapis.com/maps/api/streetview?size=400x300&location=${lat},${lng}&fov=90&heading=235&pitch=10&key=${GOOGLE_STREET_VIEW_API_KEY}`;
};

  return (
    <>
      {selectedFeature && (
        <SelectedFeaturePopup
          feature={selectedFeature}
          icon={spaceIcon}
          onClose={() => setSelectedFeature(null)}
          getStreetViewUrl={getStreetViewUrl}
        />
      )}
      <DeckGL
        viewState={viewState}
        onViewStateChange={({ viewState }) =>
          setViewState(viewState as MapViewState)
        }
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller={{
          keyboard: false,
          dragPan: true,
          dragRotate: true,
          scrollZoom: true,
          touchZoom: true,
          touchRotate: true,
          doubleClickZoom: true,
        }}
        getTooltip={({ object }) =>
          object
            ? {
              html: `<b>${
                object.properties?.NAME ||
                object.properties?.STORENAME ||
                object.properties?.station_name ||
                'Unknown'
              }</b><br/>${
                object.properties?.ADDRESS ||
                object.properties?.street_address ||
                ''
              }`,
              style: {
                backgroundColor: '#000',
                color: '#fff',
                fontSize: '0.75em',
                padding: '5px',
                borderRadius: '5px',
              },
            }
            : null
        }
        getCursor={({ isHovering, isDragging }) => {
          if (isDragging) return 'grabbing'
          if (isHovering) return 'pointer'
          return 'default'
        }}
      >
        <Map reuseMaps mapStyle={MAP_STYLE} mapLib={maplibregl} />
        <Search 
          showAllSpaces={showAllSpaces}
          onToggleAllSpaces={() => setShowAllSpaces((prev) => !prev)}
          onSearchResults={handleSearchResults}
          onResultClick={handleResultClick}
        />
      </DeckGL>
    </>
  )
})

MapLayer.displayName = 'MapLayer'

export default MapLayer