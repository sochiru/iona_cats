import React from 'react';
import { GlobalProvider } from 'context/GlobalProvider';
import MyRoutes from './MyRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <GlobalProvider>
    <MyRoutes />
  </GlobalProvider>
);

export default App;
