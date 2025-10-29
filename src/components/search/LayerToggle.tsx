import React from 'react'

interface LayerToggleProps {
  label: string
  checked: boolean
  onChange: () => void
  selectorColor: string
  iconDataURL: string
}

const LayerToggle: React.FC<LayerToggleProps> = ({
  label,
  checked,
  onChange,
  selectorColor = '#4caf50',
  iconDataURL,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginBottom: '12px',
    }}
  >
    {/* Label on top */}
    <span style={{ fontSize: '14px' }}>{label}</span>
    
    {/* Toggle and icon row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {iconDataURL && (
        <img
          src={iconDataURL}
          alt={label}
          style={{ width: '18px', height: '18px', objectFit: 'contain' }}
        />
      )}
      <div
        onClick={onChange}
        style={{
          cursor: 'pointer',
          width: '40px',
          height: '20px',
          background: checked ? selectorColor : '#ccc',
          borderRadius: '20px',
          position: 'relative',
          transition: 'background 0.3s ease',
        }}
      >
        <div
          style={{
            width: '18px',
            height: '18px',
            background: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '1px',
            left: checked ? '20px' : '2px',
            transition: 'left 0.3s ease',
          }}
        />
      </div>
    </div>
  </div>
)

export default LayerToggle