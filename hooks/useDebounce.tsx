"use client";

import { useState, useEffect } from 'react'

export default function useDebounce<T> (value: T, delay: number = 500): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    
    const timer = setTimeout(() =>{
      setDebounceValue(value)
    }, delay);
  
    return () => {
      window.clearTimeout(timer)
    }

  }, [value, delay])

  return debounceValue;
  
};
