import React from 'react';
import { Button as AriaButton } from 'react-aria-components';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Button({
  children,
  onPress,
  isDisabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  style,
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const buttonStyle = {
    ...getBaseStyles(),
    ...getVariantStyles(variant, isHovered, isDisabled),
    ...getSizeStyles(size),
    ...(fullWidth && { width: '100%' }),
    ...style,
  };

  return (
    <AriaButton 
      onPress={onPress} 
      isDisabled={isDisabled} 
      style={buttonStyle}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {icon && <span style={styles.icon}>{icon}</span>}
      {children}
    </AriaButton>
  );
}

function getBaseStyles(): React.CSSProperties {
  return {
    border: 'none',
    borderRadius: '12px',
    fontWeight: '600' as const,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };
}

function getVariantStyles(
  variant: 'primary' | 'secondary' | 'outline',
  isHovered: boolean,
  isDisabled: boolean
): React.CSSProperties {
  const variants: Record<'primary' | 'secondary' | 'outline', {
    base: React.CSSProperties;
    hover: React.CSSProperties;
    disabled: React.CSSProperties;
  }> = {
    primary: {
      base: {
        background: '#22c55e',
        color: 'white',
      },
      hover: {
        background: '#16a34a',
      },
      disabled: {
        background: '#d1d5db',
        cursor: 'not-allowed',
      },
    },
    secondary: {
      base: {
        background: '#f9fafb',
        color: '#6b7280',
      },
      hover: {
        background: '#f3f4f6',
      },
      disabled: {
        background: '#ffffff',
        color: '#d1d5db',
        cursor: 'not-allowed',
      },
    },
    outline: {
      base: {
        background: 'transparent',
        color: '#22c55e',
        border: '2px solid #22c55e',
      },
      hover: {
        background: '#f0fdf4',
      },
      disabled: {
        borderColor: '#d1d5db',
        color: '#9ca3af',
        cursor: 'not-allowed',
        background: 'transparent',
      },
    },
  };

  const variantStyles = variants[variant];

  if (isDisabled) {
    return { ...variantStyles.base, ...variantStyles.disabled };
  }

  if (isHovered) {
    return { ...variantStyles.base, ...variantStyles.hover };
  }

  return variantStyles.base;
}

function getSizeStyles(size: 'sm' | 'md' | 'lg'): React.CSSProperties {
  const sizes: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
    sm: {
      padding: '10px 20px',
      fontSize: '14px',
    },
    md: {
      padding: '14px 28px',
      fontSize: '16px',
    },
    lg: {
      padding: '18px 32px',
      fontSize: '18px',
    },
  };

  return sizes[size];
}

const styles = {
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as React.CSSProperties,
};