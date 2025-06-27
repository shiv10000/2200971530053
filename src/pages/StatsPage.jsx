import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import StatsTable from '../components/StatsTable';
import logger from '../utils/logger';
import { getStats } from '../utils/api';

const StatsPage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const statsData = getStats();
    setStats(statsData);
    logger.log('Statistics page loaded', { 
      urlCount: Object.keys(statsData).length 
    });
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        View detailed analytics for your shortened URLs
      </Typography>
      
      <StatsTable stats={stats} />
    </Container>
  );
};

export default StatsPage;