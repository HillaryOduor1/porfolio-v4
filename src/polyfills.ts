// Import core-js for comprehensive ES5+ polyfills
import 'core-js/stable';

// Import regenerator-runtime for async/await
import 'regenerator-runtime/runtime';

// Simple browser detection for extremely old browsers
if (typeof window !== 'undefined') {
  // Create a global namespace for feature detection
  (window as any).__LEGACY_BROWSER__ = 
    typeof Promise === 'undefined' || 
    typeof Object.assign === 'undefined' ||
    typeof Symbol === 'undefined';
}
/*// Simplified polyfills - let Vite and legacy plugin handle everything
// Only import regenerator-runtime for async/await support
import 'regenerator-runtime/runtime';

// Add any additional browser detection if needed
if (typeof window !== 'undefined') {
  // Check for missing features and log them
  if (typeof Promise === 'undefined') {
    console.warn('Promise is not supported in this browser');
  }
  
  if (typeof Object.assign !== 'function') {
    console.warn('Object.assign is not supported in this browser');
  }
  
  if (typeof window.fetch === 'undefined') {
    console.warn('fetch is not supported in this browser');
  }
}*/