import React, { useEffect } from 'react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'right' | 'left' | 'top' | 'bottom';
  children: React.ReactNode;
}

const Sheet = ({ isOpen, onClose, position = 'right', children }: SheetProps) => {
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    
    return function cleanup() {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Detect current theme for background color
  const getThemeBackgroundColor = (): string => {
    if (typeof document === 'undefined') return '#ffffff';
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    
    // Updated to use the new #252526 dark mode color
    return isDark ? '#252526' : '#ffffff'; 
  };

  // Return null properly unmounts it, fixing the aria-hidden focus bug
  if (!isOpen) {
    return null;
  }

  const themeBgColor = getThemeBackgroundColor();
  const textColor = themeBgColor === '#252526' ? '#cccccc' : '#111827';

  const getSheetStyle = () => {
    const baseStyle = {
      position: 'fixed' as const,
      // INCREASED Z-INDEX: So it sits above the sticky nav (z-50)
      zIndex: 70,
      backgroundColor: themeBgColor,
      color: textColor,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      transition: 'all 0.3s ease-in-out'
    };

    switch (position) {
      case 'left':
        return {
          ...baseStyle,
          left: 0,
          top: 0,
          height: '100%',
          width: '320px',
          transform: 'translateX(0)'
        };
      case 'right':
        return {
          ...baseStyle,
          right: 0,
          top: 0,
          height: '100%',
          width: '320px',
          transform: 'translateX(0)'
        };
      case 'top':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          right: 0,
          height: 'auto',
          transform: 'translateY(0)'
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: 0,
          left: 0,
          right: 0,
          height: 'auto',
          transform: 'translateY(0)'
        };
      default:
        return baseStyle;
    }
  };

  const backdropStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // INCREASED Z-INDEX: So it covers the sticky nav
    zIndex: 60 
  };

  return (
    <>
      <div 
        style={backdropStyle}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        tabIndex={0}
        role="button"
        aria-label="Close menu"
      />
      <div style={getSheetStyle()}>
        {children}
      </div>
    </>
  );
};

export default Sheet;