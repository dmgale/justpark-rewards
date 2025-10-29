import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { ParkingSpace } from '../components/types/search.types';

interface ParkingContextType {
  reservations: ParkingSpace[];
  savedSearches: ParkingSpace[];
  addReservation: (space: ParkingSpace) => void;
  removeReservation: (spaceId: string) => void;
  addSavedSearch: (space: ParkingSpace) => void;
  removeSavedSearch: (spaceId: string) => void;
  isReserved: (spaceId: string) => boolean;
  isSaved: (spaceId: string) => boolean;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const useParkingContext = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParkingContext must be used within a ParkingProvider');
  }
  return context;
};

interface ParkingProviderProps {
  children: ReactNode;
}

export const ParkingProvider: React.FC<ParkingProviderProps> = ({ children }) => {
  const [reservations, setReservations] = useState<ParkingSpace[]>([]);
  const [savedSearches, setSavedSearches] = useState<ParkingSpace[]>([]);

  const addReservation = (space: ParkingSpace) => {
    setReservations((prev) => {
      // Check if already reserved
      if (prev.some((s) => s.id === space.id)) {
        console.log('Space already reserved:', space.name);
        return prev;
      }
      console.log('Added reservation:', space.name);
      return [...prev, space];
    });
  };

  const removeReservation = (spaceId: string) => {
    setReservations((prev) => {
      const filtered = prev.filter((s) => s.id !== spaceId);
      console.log('Removed reservation:', spaceId);
      return filtered;
    });
  };

  const addSavedSearch = (space: ParkingSpace) => {
    setSavedSearches((prev) => {
      // Check if already saved
      if (prev.some((s) => s.id === space.id)) {
        console.log('Space already saved:', space.name);
        return prev;
      }
      console.log('Added saved search:', space.name);
      return [...prev, space];
    });
  };

  const removeSavedSearch = (spaceId: string) => {
    setSavedSearches((prev) => {
      const filtered = prev.filter((s) => s.id !== spaceId);
      console.log('Removed saved search:', spaceId);
      return filtered;
    });
  };

  const isReserved = (spaceId: string) => {
    return reservations.some((s) => s.id === spaceId);
  };

  const isSaved = (spaceId: string) => {
    return savedSearches.some((s) => s.id === spaceId);
  };

  const value: ParkingContextType = {
    reservations,
    savedSearches,
    addReservation,
    removeReservation,
    addSavedSearch,
    removeSavedSearch,
    isReserved,
    isSaved,
  };

  return (
    <ParkingContext.Provider value={value}>
      {children}
    </ParkingContext.Provider>
  );
};