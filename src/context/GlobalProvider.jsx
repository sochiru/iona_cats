import React, { createContext, useMemo, useState } from 'react';

/**
 * create global context
 */
export const GlobalContext = createContext({});

/**
 * Global store provider
 */
export const GlobalProvider = ({ children }) => {
  const [store, setStore] = useState({
    search: {
      error: false,
      loading: false,
      data: []
    },
    breeds: {
      error: false,
      loading: false,
      data: []
    },
    detail: {
      error: false,
      loading: false,
      data: null
    },
  });

  const memoedStore = useMemo(
    () => ({ store, setStore }),
    [store]
  );

  return (
    <GlobalContext.Provider value={memoedStore}>
      {children}
    </GlobalContext.Provider>
  );
};
