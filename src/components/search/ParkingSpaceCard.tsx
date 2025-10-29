import React from 'react';
import { Button } from 'react-aria-components';
import { Star, MapPin, Clock, Check, Bookmark, ChevronRight, Loader2 } from 'lucide-react';
import type { ParkingSpace } from '../types/search.types';
import { useParkingContext } from '../../context/ParkingContext';

interface ParkingSpaceCardProps {
  space: ParkingSpace;
  onClick?: () => void;
  hideActions?: boolean;
  onViewOnMap?: (space: ParkingSpace) => void;
}

export function ParkingSpaceCard({ space, onClick, hideActions = false, onViewOnMap }: ParkingSpaceCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [viewHovered, setViewHovered] = React.useState(false);
  const [isReserving, setIsReserving] = React.useState(false);
  
  const { addReservation, isReserved, addSavedSearch, isSaved } = useParkingContext();
  const reserved = isReserved(space.id);
  const saved = isSaved(space.id);

  const handleReserve = async () => {
    if (reserved) {
      console.log('Already reserved:', space.name);
      return;
    }

    setIsReserving(true);
    console.log('Reserving:', space.name);
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addReservation(space);
    setIsReserving(false);
    console.log('Reserved:', space.name);
  };

  const handleViewOnMap = () => {
    console.log('View on map:', space.name);
    if (onViewOnMap) {
      onViewOnMap(space);
    }
  };

  return (
    <div 
      style={{
        ...styles.card,
        ...(isHovered ? styles.cardHover : {})
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h3 style={styles.name}>{space.name}</h3>
          <p style={styles.address}>{space.address}</p>
        </div>
        <div style={styles.priceContainer}>
          <span style={styles.price}>£{space.price.toFixed(2)}</span>
          <span style={styles.priceLabel}>total</span>
        </div>
      </div>

      {/* Details */}
      <div style={styles.details}>
        {space.rating && (
          <div style={styles.detailItem}>
            <Star size={16} fill="#fbbf24" stroke="#fbbf24" />
            <span>{space.rating.toFixed(1)}</span>
          </div>
        )}
        {space.distance && (
          <div style={styles.detailItem}>
            <MapPin size={16} />
            <span>{space.distance}</span>
          </div>
        )}
        {space.availability && (
          <div style={styles.detailItem}>
            <Clock size={16} />
            <span>{space.availability}</span>
          </div>
        )}
      </div>

      {/* Feature Tags */}
      {space.features && space.features.length > 0 && (
        <div style={styles.featureTags}>
          {space.features.map((feature, index) => (
            <span key={index} style={styles.featureTag}>
              {feature}
            </span>
          ))}
        </div>
      )}

      {/* Status badges */}
      {(reserved || saved) && (
        <div style={styles.statusBadges}>
          {reserved && (
            <span style={styles.reservedBadge}>
              <Check size={14} />
              Reserved
            </span>
          )}
          {saved && (
            <span style={styles.savedBadge}>
              <Bookmark size={14} fill="currentColor" />
              Saved
            </span>
          )}
        </div>
      )}

      {/* Action buttons - Only show if hideActions is false */}
      {!hideActions && (
        <div 
          style={styles.buttonContainer}
          onClick={(e) => e.stopPropagation()} // Stop propagation at the container level
        >
          <Button 
            onPress={handleReserve}
            isDisabled={isReserving || reserved}
            style={{
              ...styles.reserveButton,
              ...(reserved ? styles.reserveButtonReserved : {}),
            }}
          >
            {isReserving ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Reserving...
              </>
            ) : reserved ? (
              <>
                <Check size={16} />
                Reserved
              </>
            ) : (
              'Reserve'
            )}
          </Button>
          <Button 
            onPress={handleViewOnMap}
            style={{
              ...styles.viewButton,
              ...(viewHovered ? styles.viewButtonHover : {})
            }}
            onMouseEnter={() => setViewHovered(true)}
            onMouseLeave={() => setViewHovered(false)}
          >
            View on Map
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    border: '1px solid #e5e7eb',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as React.CSSProperties,
  cardHover: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: '1px solid #22c55e',
    transform: 'translateY(-2px)',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  name: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '4px',
  },
  address: {
    margin: 0,
    fontSize: '13px',
    color: '#6b7280',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-end',
  },
  price: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#22c55e',
  },
  priceLabel: {
    fontSize: '11px',
    color: '#9ca3af',
  },
  details: {
    display: 'flex',
    gap: '16px',
    marginBottom: '12px',
    flexWrap: 'wrap' as const,
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#6b7280',
  },
  featureTags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '6px',
    marginBottom: '12px',
  },
  featureTag: {
    fontSize: '11px',
    padding: '4px 10px',
    background: '#f0fdf4',
    color: '#166534',
    borderRadius: '12px',
    border: '1px solid #bbf7d0',
    fontWeight: '500',
  },
  statusBadges: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  reservedBadge: {
    fontSize: '11px',
    padding: '4px 10px',
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    color: '#92400e',
    borderRadius: '12px',
    border: '1px solid #fcd34d',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  savedBadge: {
    fontSize: '11px',
    padding: '4px 10px',
    background: '#22c55e',
    color: '#166534',
    borderRadius: '12px',
    border: '1px solid #22c55e',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '8px',
  },
  reserveButton: {
    flex: 1,
    padding: '10px 16px',
    background: '#22c55e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  reserveButtonReserved: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    cursor: 'default',
    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
  },
  viewButton: {
    flex: 1,
    padding: '10px 16px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s ease',
  },
  viewButtonHover: {
    background: '#f3f4f6',
    border: '1px solid #22c55e',
  },
};