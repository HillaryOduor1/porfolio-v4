import { useState, useEffect } from 'react'

const SplashScreen = () => {
  const [show, setShow] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 5000)
    
    return () => clearTimeout(timer)
  }, [])
  
  if (!show) return null
  
  return (
    <div className="splash-screen fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700">
      <div className="splash-logo w-24 h-24 rounded-full bg-white flex items-center justify-center font-bold text-2xl mb-8 animate-pulse">
        HO
      </div>
      <h2 className="text-white text-2xl font-bold mb-4">Hillary Oduor</h2>
      <div className="progress-bar w-48 h-1 bg-white/30 rounded-full overflow-hidden">
        <div className="progress-fill"></div>
      </div>
    </div>
  )
}

export default SplashScreen