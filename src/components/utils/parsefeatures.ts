// Utility to parse features from the spacesData format
// Converts "CCTV, Well Lit" → ["CCTV", "Well Lit"]

export function parseFeatures(featuresString: string | undefined): string[] {
  if (!featuresString) return [];
  
  return featuresString
    .split(',')
    .map(feature => feature.trim())
    .filter(Boolean);
}

// Transform spacesData to include parsed features array
export function transformSpaceData(space: any): any {
  return {
    ...space,
    features: parseFeatures(space.properties?.FEATURES || space.FEATURES)
  };
}