import React from 'react'

interface ControlPanelProps {
  children?: React.ReactNode
}

const ControlPanel: React.FC<ControlPanelProps> = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        minWidth: '200px',
        maxWidth: '400px',
        background: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        borderRadius: '5px',
        padding: '12px 24px',
        margin: '20px',
        fontSize: '13px',
        lineHeight: 2,
        color: '#6b6b76',
        textTransform: 'uppercase',
        outline: 'none',
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  )
}

export default ControlPanel
