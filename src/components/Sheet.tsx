import { useEffect } from 'react';

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
    // Check if document exists (SSR safety)
    if (typeof document === 'undefined') {
      return '#ffffff'; // Default light theme color
    }
    
    // Check if dark class is present on html element
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    
    return isDark ? '#1f2937' : '#ffffff'; // gray-800 for dark, white for light
  };

  // Simple show/hide without complex transitions for ES5 compatibility
  if (!isOpen) {
    return null;
  }

  // Basic positioning styles with theme-aware background
  const getSheetStyle = () => {
    const themeBgColor = getThemeBackgroundColor();
    const textColor = themeBgColor === '#1f2937' ? '#f9fafb' : '#111827'; // Light text for dark bg, dark text for light bg
    
    const baseStyle = {
      position: 'fixed' as const,
      zIndex: 50,
      backgroundColor: themeBgColor,
      color: textColor,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
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
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
        };
      case 'right':
        return {
          ...baseStyle,
          right: 0,
          top: 0,
          height: '100%',
          width: '320px',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
        };
      case 'top':
        return {
          ...baseStyle,
          top: 0,
          left: 0,
          right: 0,
          height: 'auto',
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)'
        };
      case 'bottom':
        return {
          ...baseStyle,
          bottom: 0,
          left: 0,
          right: 0,
          height: 'auto',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)'
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 40
  };

  return (
    <>
      <div 
        style={backdropStyle}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose();
          }
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