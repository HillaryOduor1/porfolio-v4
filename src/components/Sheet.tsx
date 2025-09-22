import { type ReactNode, useEffect } from 'react';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  position?: 'right' | 'left' | 'top' | 'bottom';
  children: ReactNode;
}

const Sheet = ({ isOpen, onClose, position = 'right', children }: SheetProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const positionClasses = {
    right: 'right-0 top-0 h-full',
    left: 'left-0 top-0 h-full',
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0'
  };

  const transformClasses = {
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full'
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div 
        className={`fixed z-50 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${positionClasses[position]} ${transformClasses[position]} w-80`}
      >
        {children}
      </div>
    </>
  );
};

export default Sheet;