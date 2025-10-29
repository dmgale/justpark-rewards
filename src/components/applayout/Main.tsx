import classNames from 'classnames';
import { type ReactNode } from 'react';

type MainProps = {
  isRightSidebarCollapsed: boolean;
  screenWidth: number;
  children: ReactNode;
};

const Main = ({ 
  isRightSidebarCollapsed,
  screenWidth,
  children,
}: MainProps) => {
  const classes = classNames({
    body: true,
    'body-right-trimmed': !isRightSidebarCollapsed && screenWidth > 768,
  });
  
  // Calculate margin adjustment only for right sidebar
  const style: React.CSSProperties = {
    marginRight: !isRightSidebarCollapsed && screenWidth > 768 ? '400px' : '5rem',
    transition: 'margin 0.5s ease',
    height: '100vh',
    overflow: 'hidden',
    width: '100%',
  };
  
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default Main;