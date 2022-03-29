import { useCallback, useEffect, useState } from "react";

const useStorage = (key, initialValue, storageObject) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = storageObject.getItem(key);
    if (item != null) return JSON.parse(initialValue);

    if (typeof initialValue === "function") return initialValue();
    else return initialValue;
  });

  useEffect(() => {
    if (storedValue === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(storedValue));
  }, [key, initialValue, storageObject]);

  const remove = useCallback(() => {
    setStoredValue(undefined);
  }, []);

  return [storedValue, setStoredValue, remove];
};

export const useLocalStorage = (key, initialValue) => {
  return useStorage(key, initialValue, localStorage);
};

export const useSessionStorage = (key, initialValue) => {
  return useStorage(key, initialValue, sessionStorage);
};
