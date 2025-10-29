import React from 'react';
import { Calendar, Bookmark, User, Menu, X, Mail, Phone, MapPin as LocationPin } from 'lucide-react';
import { Button } from 'react-aria-components';
import { ParkingSpaceCard } from '../search/ParkingSpaceCard';
import { useParkingContext } from '../../context/ParkingContext';
import logo from '../../assets/Justpark-gold-logo.png';
import type { ParkingSpace } from '../types/search.types';
import { MembershipTiers } from '../profile/MembershipTiers';

type RightSidebarProps = {
  isRightSidebarCollapsed: boolean;
  changeIsRightSidebarCollapsed: (isRightSidebarCollapsed: boolean) => void;
  logoSrc?: string;
  onSpaceClick?: (space: ParkingSpace) => void;
  onViewOnMap?: (space: ParkingSpace) => void;
};

const RightSidebar = ({
  isRightSidebarCollapsed,
  changeIsRightSidebarCollapsed,
  logoSrc,
  onSpaceClick,
  onViewOnMap,
}: RightSidebarProps) => {
  const [activeTab, setActiveTab] = React.useState<'reservations' | 'saved' | 'profile'>('reservations');
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);
  
  const { reservations, savedSearches } = useParkingContext();

  // Mock user data - replace with actual user data 
  const currentUser = {
    name: 'David Gale',
        email: 'mrdavidmgale@gmail.com',
        phone: '+44 7727 664517',
        memberSince: 'Oct 2025',
    currentTier: 'gold' as const,
  };

  const handleUpgradeTier = (tier: 'gold' | 'silver' | 'entry') => {
    console.log('Upgrading to:', tier);
  };

  const items = [
    {
      id: 'reservations' as const,
      icon: Calendar,
      label: 'Reservations',
      count: reservations.length,
    },
    {
      id: 'saved' as const,
      icon: Bookmark,
      label: 'Saved Searches',
      count: savedSearches.length,
    },
    {
      id: 'profile' as const,
      icon: User,
      label: 'Profile',
    },
  ];

  const handleTabClick = (tabId: typeof activeTab) => {
    if (isRightSidebarCollapsed) {
      changeIsRightSidebarCollapsed(false);
    }
    setActiveTab(tabId);
  };

  const activeItem = items.find(item => item.id === activeTab);

  return (
    <nav 
      style={{
        ...styles.sidenav,
        ...(isRightSidebarCollapsed ? styles.sidenavCollapsed : {}),
      }}
      aria-label="Right sidebar navigation"
    >
      {/* Icon Bar */}
      <div style={styles.iconBar}>
        <Button 
          onPress={() => changeIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
          style={styles.toggleButton}
          aria-label={isRightSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isRightSidebarCollapsed ? (
            <Menu size={24} color="#22c55e" strokeWidth={2} />
          ) : (
            <X size={24} color="#22c55e" strokeWidth={2} />
          )}
        </Button>
        
        <ul style={styles.sidenavNav} role="list">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            const isHovered = hoveredItem === item.label;
            const IconComponent = item.icon;
            
            return (
              <li key={item.label} style={styles.sidenavNavItem}>
                <Button
                  onPress={() => handleTabClick(item.id)}
                  style={{
                    ...styles.sidenavNavLink,
                    ...(isActive ? styles.sidenavNavLinkActive : {}),
                    ...(isHovered && !isActive ? styles.sidenavNavLinkHover : {}),
                  }}
                  onHoverStart={() => setHoveredItem(item.label)}
                  onHoverEnd={() => setHoveredItem(null)}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div style={{ position: 'relative' }}>
                    <IconComponent 
                      size={22}
                      color={isActive ? '#22c55e' : '#6b7280'}
                      strokeWidth={2}
                    />
                    {item.count !== undefined && item.count > 0 && (
                      <span style={styles.badge}>{item.count}</span>
                    )}
                  </div>
                  {!isRightSidebarCollapsed}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Content Panel */}
      {!isRightSidebarCollapsed && (
        <div style={styles.contentPanel}>
          <div style={styles.contentHeader}>
            <h2 style={styles.contentTitle}>
              {activeItem?.label}
              {activeItem?.count !== undefined && activeItem.count > 0 && (
                <span style={styles.countBadge}>{activeItem.count}</span>
              )}
            </h2>
            <div style={styles.headerRight}>
              <img 
                src={logoSrc || logo}
                alt="JustPark Logo" 
                style={styles.logo}
              />
            </div>
          </div>

          <div style={styles.contentBody}>
            {/* Reservations Tab */}
            {activeTab === 'reservations' && (
              <div style={styles.tabContent}>
                {reservations.length > 0 ? (
                  <div style={styles.cardList}>
                    {reservations.map((reservation) => (
                      <ParkingSpaceCard
                        key={reservation.id}
                        space={reservation}
                        onClick={() => onSpaceClick?.(reservation)}
                        onViewOnMap={onViewOnMap}
                        hideActions={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={styles.emptyState}>
                    <Calendar size={48} color="#d1d5db" strokeWidth={1.5} />
                    <p style={styles.emptyText}>No reservations yet</p>
                    <p style={styles.emptySubtext}>Your parking reservations will appear here</p>
                  </div>
                )}
              </div>
            )}

            {/* Saved Searches Tab */}
            {activeTab === 'saved' && (
              <div style={styles.tabContent}>
                {savedSearches.length > 0 ? (
                  <div style={styles.cardList}>
                    {savedSearches.map((space) => (
                      <ParkingSpaceCard
                        key={space.id}
                        space={space}
                        onClick={() => onSpaceClick?.(space)}
                        onViewOnMap={onViewOnMap}
                        hideActions={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={styles.emptyState}>
                    <Bookmark size={48} color="#d1d5db" strokeWidth={1.5} />
                    <p style={styles.emptyText}>No saved searches</p>
                    <p style={styles.emptySubtext}>Save your favorite parking spots here</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div style={styles.tabContent}>
                <div style={styles.profileSection}>
                  {/* Profile Header */}
                  <div style={styles.profileHeader}>
                    <div style={styles.profileAvatar}>
                      <User size={40} color="#ffffff" strokeWidth={2} />
                    </div>
                    <div style={styles.profileInfo}>
                      <h3 style={styles.profileName}>{currentUser.name}</h3>
                      <div style={styles.profileDetail}>
                        <Mail size={14} />
                        <span>{currentUser.email}</span>
                      </div>
                      {currentUser.phone && (
                        <div style={styles.profileDetail}>
                          <Phone size={14} />
                          <span>{currentUser.phone}</span>
                        </div>
                      )}
                      {currentUser.memberSince && (
                        <div style={styles.profileDetail}>
                          <Calendar size={14} />
                          <span>Member since {currentUser.memberSince}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={styles.divider} />

                  <MembershipTiers 
                    currentTier={currentUser.currentTier}
                    onUpgrade={handleUpgradeTier}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default RightSidebar;

const styles = {
  sidenav: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.5s ease',
    position: 'fixed' as const,
    zIndex: 1000,
    top: 0,
    right: 0,
    width: '400px',
    height: '100vh',
    boxShadow: '-0.063rem 0 1.25rem 0 rgba(0, 0, 0, 0.15)',
    display: 'flex',
  },
  sidenavCollapsed: {
    width: '5rem',
  },
  iconBar: {
    width: '5rem',
    background: 'rgb(243, 244, 246)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '0.938rem',
  },
  toggleButton: {
    background: 'transparent',
    textAlign: 'center' as const,
    width: '3rem',
    minWidth: '3rem',
    height: '3rem',
    borderRadius: '0.313rem',
    padding: '0.313rem',
    cursor: 'pointer',
    border: '2px solid #22c55e',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  sidenavNav: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: '100%',
    gap: '0.5rem',
  },
  sidenavNavItem: {
    width: '100%',
  },
  sidenavNavLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '3rem',
    width: '100%',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '0.625rem',
    transition: 'all 0.3s ease',
    background: 'transparent',
    border: 'none',
    padding: '0.75rem',
    gap: '0.75rem',
    cursor: 'pointer',
  },
  sidenavNavLinkActive: {
    backgroundColor: '#dcfce7',
    color: '#22c55e',
  },
  sidenavNavLinkHover: {
    backgroundColor: '#f3f4f6',
  },
  sidenavLinkText: {
    fontSize: '14px',
    fontWeight: '500' as const,
    whiteSpace: 'nowrap' as const,
  },
  badge: {
    position: 'absolute' as const,
    top: '-6px',
    right: '-6px',
    backgroundColor: '#ef4444',
    color: '#fff',
    fontSize: '10px',
    fontWeight: '700',
    borderRadius: '10px',
    minWidth: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 5px',
  },
  contentPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem 1.5rem 1rem 1.5rem',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
  },
  contentTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  countBadge: {
    backgroundColor: '#22c55e',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '12px',
    padding: '2px 8px',
    minWidth: '24px',
    textAlign: 'center' as const,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  logo: {
    height: '28px',
    width: 'auto',
    display: 'block',
  },
  contentBody: {
    flex: 1,
    overflow: 'auto',
  },
  tabContent: {
    height: '100%',
  },
  cardList: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 2rem',
    textAlign: 'center' as const,
    height: '100%',
  },
  emptyText: {
    margin: '0 0 0.5rem 0',
    fontSize: '16px',
    fontWeight: '600',
    color: '#6b7280',
  },
  emptySubtext: {
    margin: 0,
    fontSize: '14px',
    color: '#9ca3af',
  },
  profileSection: {
    padding: '1.5rem',
  },
  profileHeader: {
    display: 'flex',
    gap: '16px',
    marginBottom: '20px',
  },
  profileAvatar: {
    width: '64px',
    height: '64px',
    borderRadius: '12px',
    background: '#22c55e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
    flex: 1,
  },
  profileName: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
  },
  profileDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#6b7280',
  },
  divider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    marginBottom: '20px',
  },
};