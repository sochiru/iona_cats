import React from 'react';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import CatDetail from 'views/detail/CatDetail';
import Home from 'views/home/Home';

/**
 * Renders the routes
 */
const MyRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:catId" element={<CatDetail />} />
    </Routes>
  </BrowserRouter>
);

export default MyRoutes;
