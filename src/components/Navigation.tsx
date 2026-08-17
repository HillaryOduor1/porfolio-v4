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
    //{ name: 'Documents', path: '/documents' },
    { name: 'Contact', path: '/contact' }
  ]
  
  return (
    <nav className=" dark:bg-gray-800 shadow-md safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  h-16">
          {/* Mobile Navigation Button - Now on the LEFT */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 mr-4"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{width: '24px', height: '24px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-xl font-bold text-primary-600"></span>
          </div>
          
          {/* Desktop Navigation - Title on left for desktop */}
          <div className="hidden md:flex items-center justify-center w-full">
            <span className="text-xl font-bold text-primary-600 mr-8"></span>
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`relative py-2 font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mx-4 ${
                  isActive(item.path) ? 'text-primary-600 dark:text-primary-400' : ''
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400"></span>
                )}
              </Link>
            ))}
          </div>
          
          {/* Theme Toggle - Always on the RIGHT */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Sheet */}
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} position="left">
        <div style={{padding: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
            <span style={{fontSize: '20px', fontWeight: 'bold', color: '#3b82f6'}}>Menu</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              style={{padding: '8px', borderRadius: '6px', color: '#6b7280'}}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" style={{width: '24px', height: '24px'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{
                  padding: '8px 0',
                  fontWeight: '500',
                  color: isActive(item.path) ? '#3b82f6' : '#6b7280',
                  textDecoration: 'none'
                }}
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