import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import logger from '../utils/logger';
import { getStats } from '../utils/api';

const MAX_URLS = 5;

const ShortenerPage = () => {
  const [urls, setUrls] = useState({});
  const [stats, setStats] = useState({});

  useEffect(() => {
    const savedUrls = JSON.parse(localStorage.getItem('shortenedUrls') || '{}');
    setUrls(savedUrls);
    setStats(getStats());
    logger.log('Shortener page loaded', { urlCount: Object.keys(savedUrls).length });
  }, []);

  const handleUrlCreated = (newUrl) => {
    const updatedUrls = { ...urls, [newUrl.shortcode]: newUrl };
    
    if (Object.keys(updatedUrls).length > MAX_URLS) {
      // Remove the oldest URL
      const oldestKey = Object.keys(updatedUrls).sort((a, b) => 
        new Date(updatedUrls[a].createdAt) - new Date(updatedUrls[b].createdAt)
      )[0];
      delete updatedUrls[oldestKey];
    }
    
    setUrls(updatedUrls);
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
  };

  const handleDelete = (shortcode) => {
    const updatedUrls = { ...urls };
    delete updatedUrls[shortcode];
    setUrls(updatedUrls);
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    logger.log('URL deleted', { shortcode });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      
      <UrlForm onUrlCreated={handleUrlCreated} />
      
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Your Shortened URLs
      </Typography>
      <UrlList urls={urls} onDelete={handleDelete} />
    </Container>
  );
};

export default ShortenerPage;