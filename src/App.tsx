import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import SplashScreen from './components/SplashScreen';
import ScrollToTop from './components/ScrollToTop';

// Get the base URL from Vite environment or default to '/'
const BASE_URL = import.meta.env.BASE_URL || '/';

// Root component that shows the splash screen
function RootComponent() {
  return <SplashScreen />;
}

// Wrapper component to check if we need to show the splash screen
function AppContent() {
  const [showSplash, setShowSplash] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if this is the initial load or if there's a specific query param
    const isFirstVisit = sessionStorage.getItem('visited') !== 'true';
    const shouldShowSplash = new URLSearchParams(location.search).get('splash') === 'true';
    
    if (isFirstVisit || shouldShowSplash) {
      setShowSplash(true);
      sessionStorage.setItem('visited', 'true');
    }
  }, [location]);
  
  if (showSplash) {
    return <SplashScreen redirectTo={location.pathname + location.search.replace('splash=true', '').replace('?&', '?').replace('&&', '&').replace(/[?&]$/, '')} />;
  }
  
  return (
    <Routes>
      <Route path="/" element={<RootComponent />} />
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
  );
}

export default function App() {
  return (
    <Router basename={BASE_URL}>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}