import { useButton } from 'react-aria';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

type LeftSidebarProps = {
  isLeftSidebarCollapsed: boolean;
  changeIsLeftSidebarCollapsed: (isLeftSidebarCollapsed: boolean) => void;
};

const LeftSidebar = ({
  isLeftSidebarCollapsed,
  changeIsLeftSidebarCollapsed,
}: LeftSidebarProps) => {
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

  const items = [
    {
      routerLink: '',
      icon: 'fal fa-map',
      label: 'Map',
    },
    {
      routerLink: 'splitView',
      icon: 'fal fa-columns',
      label: 'Split View',
    },
    {
      routerLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings',
    },
  ];

  const { buttonProps: toggleButtonProps } = useButton(
    {
      onPress: () => changeIsLeftSidebarCollapsed(!isLeftSidebarCollapsed),
      'aria-label': isLeftSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
      'aria-expanded': !isLeftSidebarCollapsed,
    },
    toggleRef
  );

  const { buttonProps: closeButtonProps } = useButton(
    {
      onPress: () => changeIsLeftSidebarCollapsed(true),
      'aria-label': 'Close sidebar',
    },
    closeRef
  );

  return (
    <nav 
      style={{
        ...styles.sidenav,
        ...(isLeftSidebarCollapsed ? styles.sidenavCollapsed : {}),
      }}
      aria-label="Main navigation"
    >
      <div style={styles.logoContainer}>
        <button 
          {...toggleButtonProps} 
          ref={toggleRef}
          style={styles.logo}
        >
          <i className="fal fa-bars" aria-hidden="true"></i>
        </button>
        {!isLeftSidebarCollapsed && (
          <>
            <div style={styles.logoText}>Argus</div>
            <button 
              {...closeButtonProps}
              ref={closeRef}
              style={styles.btnClose}
            >
              <i className="fal fa-times" style={styles.icon} aria-hidden="true"></i>
            </button>
          </>
        )}
      </div>
      <ul style={styles.sidenavNav} role="list">
        {items.map((item) => {
          const isActive = location.pathname === `/${item.routerLink}`;
          const isHovered = hoveredItem === item.label;
          
          return (
            <li key={item.label} style={styles.sidenavNavItem}>
              <Link 
                style={{
                  ...styles.sidenavNavLink,
                  ...(isActive || isHovered ? styles.sidenavNavLinkActive : {}),
                }}
                to={item.routerLink}
                aria-current={isActive ? 'page' : undefined}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <i
                  className={classNames('sidenav-link-icon', item.icon)}
                  style={styles.sidenavLinkIcon}
                  aria-hidden="true"
                ></i>
                {!isLeftSidebarCollapsed && (
                  <span style={styles.sidenavLinkText}>{item.label}</span>
                )}
                {isLeftSidebarCollapsed && (
                  <span style={styles.srOnly}>{item.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LeftSidebar;

const styles = {
  sidenav: {
    background: '#005b6e',
    transition: 'all 0.5s ease',
    position: 'fixed' as const,
    zIndex: 1000,
    top: 0,
    left: 0,
    width: '16.5625rem',
    height: '100vh',
    boxShadow: '0.063rem 0 1.25rem 0 rgba(134, 144, 163, 0.3)',
  },
  sidenavCollapsed: {
    width: '5rem',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.938rem 0.938rem 0 0.938rem',
    width: '100%',
  },
  logo: {
    background: '#fff',
    textAlign: 'center' as const,
    width: '3rem',
    minWidth: '3rem',
    borderRadius: '0.313rem',
    padding: '0.313rem',
    fontSize: '24px',
    fontWeight: 700,
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    marginLeft: '1.5rem',
    fontSize: '24px',
    fontWeight: 700,
    color: '#fff',
    fontFamily: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  btnClose: {
    marginLeft: 'auto',
    cursor: 'pointer',
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
  icon: {
    color: '#fff',
    fontSize: '20px',
  },
  sidenavNav: {
    listStyle: 'none',
    padding: '0.938rem',
    margin: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    height: 'calc(100% - 3.65rem)',
    cursor: 'pointer',
  },
  sidenavNavItem: {
    width: '100%',
    marginBottom: '0.625rem',
  },
  sidenavNavLink: {
    display: 'flex',
    alignItems: 'center',
    height: '3rem',
    color: '#f3f3f3',
    textDecoration: 'none',
    borderRadius: '0.625rem',
    transition: 'all 0.3s ease',
    padding: '0',
  },
  sidenavNavLinkActive: {
    backgroundColor: '#fff',
    color: '#005b6e',
  },
  sidenavLinkIcon: {
    fontSize: '22px',
    width: '2rem',
    minWidth: '2rem',
    textAlign: 'center' as const,
    padding: '12px',
  },
  sidenavLinkText: {
    marginLeft: '1.5rem',
    fontSize: '15px',
    fontWeight: '500' as const,
  },
  srOnly: {
    position: 'absolute' as const,
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap' as const,
    borderWidth: 0,
  },
};