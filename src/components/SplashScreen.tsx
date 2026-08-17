const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div className="splash-spinner">
        <div className="spinner w-12 h-12 border-4 border-current/30 border-t-current rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export default SplashScreen
