import { useState } from "react";

export default function useLocalStorage (key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key); 
      return value ? JSON.parse(value) : (initialValue && undefined); 
    } catch (err) {
      console.error(err);
    }
  });
  function setValue (newValue)  {
    try { 
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue)
  }
  return [storedValue, setValue]
}