import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, 
  Accordion, AccordionSummary, AccordionDetails,
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StatsTable = ({ stats }) => {
  if (Object.keys(stats).length === 0) {
    return (
      <Typography variant="body1" sx={{ mt: 2 }}>
        No statistics available yet.
      </Typography>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div>
      {Object.entries(stats).map(([shortcode, data]) => (
        <Accordion key={shortcode} sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {data.shortUrl}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Clicks: {data.clicks}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.clickData.map((click, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(click.timestamp)}</TableCell>
                      <TableCell>{click.source}</TableCell>
                      <TableCell>
                        <Chip label={click.location} variant="outlined" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default StatsTable;