import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, 
  Button, Link, Chip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logger from '../utils/logger';

const UrlList = ({ urls, onDelete }) => {
  if (urls.length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        No URLs shortened yet.
      </Typography>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    logger.log('URL copied to clipboard', { url });
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Original URL</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expires</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(urls).map((url) => (
            <TableRow key={url.shortcode}>
              <TableCell>
                <Link 
                  href={url.longUrl} 
                  target="_blank" 
                  rel="noopener"
                >
                  {url.longUrl.slice(0, 40)}...
                </Link>
              </TableCell>
              <TableCell>
                <Link 
                  component={RouterLink} 
                  to={`/${url.shortcode}`}
                  target="_blank"
                >
                  {url.shortUrl}
                </Link>
              </TableCell>
              <TableCell>{formatDate(url.createdAt)}</TableCell>
              <TableCell>
                <Chip 
                  label={formatDate(url.expiry)} 
                  color={new Date(url.expiry) > new Date() ? 'success' : 'error'}
                />
              </TableCell>
              <TableCell>{url.clicks}</TableCell>
              <TableCell>
                <Button 
                  size="small" 
                  onClick={() => handleCopy(url.shortUrl)}
                  sx={{ mr: 1 }}
                >
                  Copy
                </Button>
                <Button 
                  size="small" 
                  color="error"
                  onClick={() => onDelete(url.shortcode)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrlList;