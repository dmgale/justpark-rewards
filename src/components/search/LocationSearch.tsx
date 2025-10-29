import React from 'react';
import { ComboBox, Input, Group, Popover, ListBox, ListBoxItem } from 'react-aria-components';
import { Search, MapPin } from 'lucide-react';
import type { Location } from '../types/search.types';

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
  locations: Location[];
  showValidation?: boolean;
}

export function LocationSearch({ value, onChange, locations, showValidation = false }: LocationSearchProps) {
  return (
    <div style={styles.field} className="location-search-field">
      <ComboBox
      aria-label="Search for space"
        onSelectionChange={(key) => {
          const selected = locations.find(l => l.id === Number(key));
          if (selected) onChange(selected.name);
        }}
        onInputChange={onChange}
        isInvalid={showValidation}
      >
        <Group style={{
          ...styles.inputGroup,
          ...(showValidation && styles.inputGroupError)
        }}>
          <Input 
            placeholder={showValidation ? "Please enter a location to search" : "Enter a place or postcode"} 
            value={value}
          />
          <Search size={18} style={styles.icon} />
        </Group>
        <Popover>
          <ListBox items={locations}>
            {(item) => (
              <ListBoxItem id={item.id} textValue={item.name}>
                <div style={styles.locationItem}>
                  <MapPin size={16} style={styles.locationIcon} />
                  {item.name}
                </div>
              </ListBoxItem>
            )}
          </ListBox>
        </Popover>
      </ComboBox>
    </div>
  );
}

const styles = {
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    position: 'relative' as const,
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    transition: 'all 0.2s',
    height: '40px',
  },
  inputGroupError: {
    borderColor: '#ef4444',
    background: '#fff',
  },
  inputGroupFocus: {
    borderColor: '#22c55e',
    background: '#fff',
  },
  icon: {
    color: '#9ca3af',
    flexShrink: 0,
    position: 'absolute' as const,
    right: '16px',
    pointerEvents: 'none' as const,
  },
  locationItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  locationIcon: {
    color: '#9ca3af',
    flexShrink: 0,
  },
};