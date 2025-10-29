import React from 'react';
import { X, Loader2, CheckCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from './Button';
import { ParkingSpaceCard } from './search/ParkingSpaceCard';
import { useParkingContext } from '../context/ParkingContext';
import type { ParkingSpace } from './types/search.types';

interface SelectedFeaturePopupProps {
  feature: any;
  icon: string;
  onClose: () => void;
  getStreetViewUrl: (feature: any) => string | null;
}

const SelectedFeaturePopup: React.FC<SelectedFeaturePopupProps> = ({
  feature,
  icon,
  onClose,
  getStreetViewUrl,
}) => {
  const { addReservation, addSavedSearch, isReserved, isSaved } = useParkingContext();
  const [isReserving, setIsReserving] = React.useState(false);

  if (!feature) return null;

  // Transform feature data to match ParkingSpace type
  const parkingSpace: ParkingSpace = {
    id: feature.properties?.ID || Math.random().toString(),
    name: feature.properties?.NAME || 'Unknown Location',
    address: feature.properties?.ADDRESS || 'No address provided',
    price: feature.properties?.PRICE || 0,
    lat: feature.geometry?.coordinates?.[1] || 0,
    lng: feature.geometry?.coordinates?.[0] || 0,
    rating: feature.properties?.RATING,
    distance: feature.properties?.DISTANCE,
    availability: feature.properties?.AVAILABILITY,
    features: feature.properties?.FEATURES_ARRAY || [],
  };

  const reserved = isReserved(parkingSpace.id);
  const saved = isSaved(parkingSpace.id);

  const handleReserve = async () => {
    if (reserved) {
      console.log('Already reserved:', parkingSpace.name);
      return;
    }

    setIsReserving(true);
    console.log('Reserving:', parkingSpace.name);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addReservation(parkingSpace);
    setIsReserving(false);
    
    // Close popup after successful reservation
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSave = () => {
    if (saved) {
      console.log('Already saved:', parkingSpace.name);
      return;
    }
    
    addSavedSearch(parkingSpace);
    
    // Close popup after saving
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 9999,
        }}
        onClick={onClose}
      />
      
      {/* Centered popup */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          zIndex: 10000,
          minWidth: '320px',
          maxWidth: '420px',
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {/* Close button */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10001,
          }}
        >
          <Button
            onPress={onClose}
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={18} />
          </Button>
        </div>

        {/* Street View Image (if available or using my API key) */}
        {getStreetViewUrl(feature) && (
          <img
            src={getStreetViewUrl(feature)!}
            alt="Street View"
            style={{
              width: '100%',
              height: '160px',
              objectFit: 'cover',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
            }}
          />
        )}

        {/* Parking Space Card */}
        <div style={{ padding: '16px' }}>
          <ParkingSpaceCard 
            space={parkingSpace}
            onClick={() => {
              console.log('Card clicked:', parkingSpace);
            }}
            hideActions={true}
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            padding: '16px',
            paddingTop: '0',
            display: 'flex',
            gap: '8px',
            flexDirection: 'column',
          }}
        >
          <Button
            onPress={handleReserve}
            isDisabled={isReserving || reserved}
            variant='primary'
            style={{
              backgroundColor: reserved ? '#f59e0b' : '#22c55e',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              cursor: reserved ? 'default' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              opacity: reserved ? 0.8 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isReserving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Reserving...
              </>
            ) : reserved ? (
              <>
                <CheckCircle size={16} />
                Already Reserved
              </>
            ) : (
              'Reserve'
            )}
          </Button>
          
          <Button
            onPress={handleSave}
            variant='secondary'
            isDisabled={saved}
            style={{
              backgroundColor: '#fff',
              color: saved ? '#16a34a' : '#22c55e',
              border: `1px solid ${saved ? '#16a34a' : '#22c55e'}`,
              borderRadius: '8px',
              padding: '12px 16px',
              cursor: saved ? 'default' : 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              opacity: saved ? 0.8 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {saved ? (
              <>
                <BookmarkCheck size={16} />
                Saved
              </>
            ) : (
              <>
                <Bookmark size={16} />
                Save
              </>
            )}
          </Button>

          <Button
            onPress={onClose}
            variant='secondary'
            style={{
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
};

export default SelectedFeaturePopup;