import React, { createContext, useMemo, useState } from 'react';

export const GlobalContext = createContext({});

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
