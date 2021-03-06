import { GlobalContext } from 'context/GlobalProvider';
import {
  useContext,
} from 'react';

/**
 * Custom hook for getting/setting loading states.
 */
const useLoading = () => {
  const { store, setStore } = useContext(GlobalContext);

  const isLoading = (key) => store[key].loading;

  const setLoading = (key, value) => {
    setStore((prev) => ({ ...prev, [key]: { ...prev[key], loading: value } }));
  };

  return {
    isLoading,
    setLoading
  };
};

export default useLoading;
