import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import logger from '../utils/logger';
import { shortenUrl } from '../utils/api'; // IMPORT ADDED

const UrlForm = ({ onUrlCreated }) => {
  const [longUrl, setLongUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [customShortcode, setCustomShortcode] = useState('');
  const [error, setError] = useState('');

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!longUrl) {
      setError('URL is required');
      logger.error('Validation Error', 'URL is required');
      return;
    }
    
    if (!validateUrl(longUrl)) {
      setError('Invalid URL format');
      logger.error('Validation Error', 'Invalid URL format');
      return;
    }
    
    if (validity && (isNaN(validity) || validity <= 0)) {
      setError('Validity must be a positive number');
      logger.error('Validation Error', 'Invalid validity');
      return;
    }
    
    try {
      const result = await shortenUrl(
        longUrl, 
        validity ? parseInt(validity) : null, 
        customShortcode
      );
      
      logger.log('URL shortened successfully', {
        longUrl,
        shortcode: result.shortcode
      });
      
      onUrlCreated(result);
      
      // Reset form
      setLongUrl('');
      setValidity('');
      setCustomShortcode('');
    } catch (err) {
      setError(err.message);
      logger.error('Shortening Error', err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Shorten a URL
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Long URL"
              variant="outlined"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Validity (minutes)"
              variant="outlined"
              type="number"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              helperText="Leave blank for default 30 minutes"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Custom Shortcode (optional)"
              variant="outlined"
              value={customShortcode}
              onChange={(e) => setCustomShortcode(e.target.value)}
              inputProps={{ pattern: "[a-zA-Z0-9]+" }}
            />
          </Grid>
          
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          
          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              Shorten URL
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default UrlForm;