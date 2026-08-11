// polyfills.ts - ES5 compatibility

// Polyfill for Object.assign
if (typeof Object.assign !== 'function') {
  Object.assign = function(target: any, ...sources: any[]) {
    if (target === null || target === undefined) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 0; index < sources.length; index++) {
      var source = sources[index];
      if (source !== null && source !== undefined) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            to[key] = source[key];
          }
        }
      }
    }
    return to;
  };
}

// Polyfill for Array.from
if (!Array.from) {
  Array.from = function(arrayLike: any, mapFn?: any, thisArg?: any) {
    if (arrayLike == null) {
      throw new TypeError('Array.from requires an array-like object');
    }
    var items = Object(arrayLike);
    var length = items.length >>> 0;
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
      var value = items[i];
      result[i] = mapFn ? mapFn.call(thisArg, value, i) : value;
    }
    return result;
  };
}

// Polyfill for Array.prototype.find
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate: any, thisArg?: any) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    for (var i = 0; i < length; i++) {
      var value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

// Polyfill for Array.prototype.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement: any, fromIndex?: number) {
    if (this === null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    if (length === 0) {
      return false;
    }
    var n = fromIndex || 0;
    var k = Math.max(n >= 0 ? n : length - Math.abs(n), 0);
    while (k < length) {
      if (list[k] === searchElement) {
        return true;
      }
      k++;
    }
    return false;
  };
}

// Polyfill for String.prototype.startsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString: string, position?: number) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

// Polyfill for String.prototype.includes
if (!String.prototype.includes) {
  String.prototype.includes = function(searchString: string, position?: number) {
    return this.indexOf(searchString, position || 0) !== -1;
  };
}

// Export empty for module compatibility
export {};


/*// Import core-js for comprehensive ES5+ polyfills
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
}*/

