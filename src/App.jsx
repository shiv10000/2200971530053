import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import logger from './utils/logger';
import { trackClick } from './utils/api';
import { Container, Typography, Button, AppBar, Toolbar } from '@mui/material';

// Redirection component
const RedirectHandler = () => {
  const navigate = useNavigate();
  const path = window.location.pathname.substring(1); // Remove leading '/'

  useEffect(() => {
    if (path) {
      const urls = JSON.parse(localStorage.getItem('shortenedUrls') || '{}');
      const urlData = urls[path];
      
      if (urlData && new Date(urlData.expiry) > new Date()) {
        // Track the click
        trackClick(path, 'direct', 'Unknown');
        
        // Update stats
        const stats = JSON.parse(localStorage.getItem('urlStats') || '{}');
        if (stats[path]) {
          stats[path].clicks += 1;
          stats[path].clickData.push({
            timestamp: new Date().toISOString(),
            source: 'direct',
            location: 'Unknown'
          });
          localStorage.setItem('urlStats', JSON.stringify(stats));
        }
        
        // Redirect to original URL
        window.location.href = urlData.longUrl;
      } else {
        navigate('/');
      }
    }
  }, [path, navigate]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" href="/">Shortener</Button>
          <Button color="inherit" href="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<RedirectHandler />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;