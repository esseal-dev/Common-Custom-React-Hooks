import { useRef, useCallback } from 'react';

export function useDebounce() {
  const timeoutRef = useRef(null);

  // Usage example:
  // const debouncedSearch = debounce(yourFunction, 300);
  // debouncedSearch(query); // Will only execute after 300ms of no new calls
  const debounce = useCallback((
    callback,
    delay
  ) => {
    return (...args) => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set new timeout
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    };
  }, []);

  // Usage example:
  // debouncedCallback(handleSearch, 500, searchTerm);
  const debouncedCallback = useCallback((
    callback,
    delay,
    ...args
  ) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, []);

  // Usage example:
  // cancel(); Self explanatory but cancels any pending debounced execution
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Use example:
  // flush(yourFunction, dataForTheFunction); // Cancels the debounce and executes immediately
  const flush = useCallback((
    callback,
    ...args
  ) => {
    cancel();
    callback(...args);
  }, [cancel]);

  // Usage example:
  // const isWaiting = isPending(); // Let's you check if the function has executed yet or not
  const isPending = useCallback(() => {
    return timeoutRef.current !== null;
  }, []);

  return {
    debounce,
    debouncedCallback,
    cancel,
    flush,
    isPending
  };
}
