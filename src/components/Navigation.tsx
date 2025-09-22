import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Sheet from './Sheet'
import ThemeToggle from './ThemeToggle'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Check if we're in a router context before using useLocation
  let currentPath = '/';
  try {
    // This will throw an error if we're not in a Router context
    const location = useLocation();
    currentPath = location.pathname;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Fallback to window location if not in Router context
    currentPath = window.location.pathname;
  }
  
  const isActive = (path: string) => {
    return currentPath === path;
  }
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ]
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Hillary Oduor</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`relative py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                  isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : ''
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400"></span>
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-4"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Sheet */}
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} position="right">
        <div className="p-5">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-primary-600">Menu</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                  isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Sheet>
    </nav>
  )
}

export default Navigation