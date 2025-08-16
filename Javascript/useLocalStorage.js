import { useCallback } from 'react';

export function useLocalStorage() {
  const setItem = useCallback((
    key,
    value
  ) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const serializedValue = JSON.stringify(value);
        window.localStorage.setItem(key, serializedValue);
      }
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  }, []);

  const getItem = useCallback((key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return undefined;
    }
  }, []);

  const removeItem = useCallback((key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }, []);

  const itemExists = useCallback((key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key) !== null;
      }
      return false;
    } catch (error) {
      console.error('Error checking localStorage item:', error);
      return false;
    }
  }, []);

  const clear = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }, []);

  const getAllKeys = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const keys = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i);
          if (key) keys.push(key);
        }
        return keys;
      }
      return [];
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }, []);

  const getSize = useCallback(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.length;
      }
      return 0;
    } catch (error) {
      console.error('Error getting localStorage size:', error);
      return 0;
    }
  }, []);

  return {
    setItem,
    getItem,
    removeItem,
    itemExists,
    clear,
    getAllKeys,
    getSize
  };
}
