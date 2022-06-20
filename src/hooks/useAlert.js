import { GlobalContext } from 'context/GlobalProvider';
import {
  useContext,
} from 'react';

const useAlert = () => {
  const { store, setStore } = useContext(GlobalContext);

  const isError = (key) => store[key].error;

  const setError = (key, value) => {
    setStore((prev) => ({ ...prev, [key]: { ...prev[key], error: value } }));
  };

  return {
    isError,
    setError
  };
};

export default useAlert;
