import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';

// Get the base URL from Vite environment or default to '/'
const BASE_URL = import.meta.env.BASE_URL || '/';

function App() {
  return (
    <BrowserRouter basename={BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/restaurants" element={
          <Layout>
            <Restaurants />
          </Layout>
        } />
        <Route path="/menu" element={
          <Layout>
            <Menu />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;