import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sheet from './Sheet'
import ThemeToggle from './ThemeToggle'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  let currentPath = '/';
  try {
    const location = useLocation();
    currentPath = location.pathname;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    currentPath = window.location.pathname;
  }
  
  const isActive = (path: string) => {
    return currentPath === path;
  }
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ]
  
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-[#252526]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#3c3c3c] shadow-md dark:shadow-black/40 safe-area transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Mobile Navigation Button */}
            <div className="flex md:hidden items-center">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-[#8b8b8b] dark:hover:text-[#cccccc] mr-4 transition-colors"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center w-full">
              {navItems.map(item => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`relative py-2 font-medium transition-colors mx-4 ${
                    isActive(item.path) 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-600 dark:text-[#8b8b8b] hover:text-primary-600 dark:hover:text-[#cccccc]'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400"></span>
                  )}
                </Link>
              ))}
            </div>
            
            {/* Theme Toggle */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* 
        SHEET IS OUTSIDE THE NAV 
        This prevents the backdrop-blur from breaking its fixed positioning
      */}
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} position="left">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">Menu</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-[#8b8b8b] dark:hover:bg-[#3c3c3c] transition-colors"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`py-2 font-medium text-lg transition-colors ${
                  isActive(item.path) 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-600 dark:text-[#8b8b8b] hover:text-primary-600 dark:hover:text-[#cccccc]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Sheet>
    </>
  )
}

export default Navigation