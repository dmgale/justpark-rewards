/**
 * Converts simple spaces data format to GeoJSON FeatureCollection
 * @param {Object} spacesData - Object with 'spaces' array
 * @param {string} collectionName - Optional name for the FeatureCollection
 * @returns {Object} GeoJSON FeatureCollection
 */
export function convertToGeoJSON(spacesData: any, collectionName = "Parking_Spaces") {
  // Validate input
  if (!spacesData || !spacesData.spaces || !Array.isArray(spacesData.spaces)) {
    throw new Error("Invalid input: expected object with 'spaces' array");
  }

  return {
    type: "FeatureCollection",
    name: collectionName,
    features: spacesData.spaces.map((space: any) => ({
      type: "Feature",
      properties: {
        ID: space.id,
        NAME: space.name,
        ADDRESS: space.address,
        PRICE: space.price,
        FEATURES: Array.isArray(space.features) 
          ? space.features.join(", ") 
          : space.features,
        FEATURES_ARRAY: space.features, // Keep array version for easy access
        LATITUDE: space.lat,
        LONGITUDE: space.lng,
        // Include any additional properties
        ...Object.keys(space)
          .filter(key => !['id', 'name', 'address', 'lat', 'lng', 'price', 'features'].includes(key))
          .reduce((acc, key) => ({ ...acc, [key.toUpperCase()]: space[key] }), {})
      },
      geometry: {
        type: "Point",
        coordinates: [space.lng, space.lat] // GeoJSON uses [lng, lat] order
      }
    }))
  };
}

/**
 * Reverse conversion: GeoJSON to simple spaces format
 * @param {Object} geoJSON - GeoJSON FeatureCollection
 * @returns {Object} Simple spaces data format
 */
export function convertFromGeoJSON(geoJSON: any) {
  if (!geoJSON || geoJSON.type !== "FeatureCollection" || !Array.isArray(geoJSON.features)) {
    throw new Error("Invalid GeoJSON: expected FeatureCollection");
  }

  return {
    spaces: geoJSON.features.map((feature: any) => ({
      id: feature.properties.ID || feature.properties.id,
      name: feature.properties.NAME || feature.properties.name,
      address: feature.properties.ADDRESS || feature.properties.address,
      lat: feature.geometry.coordinates[1], // GeoJSON is [lng, lat]
      lng: feature.geometry.coordinates[0],
      price: feature.properties.PRICE || feature.properties.price,
      features: feature.properties.FEATURES_ARRAY || 
        (typeof feature.properties.FEATURES === 'string'
          ? feature.properties.FEATURES.split(", ")
          : feature.properties.FEATURES || [])
    }))
  };
}