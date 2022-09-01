import { Box, Grid, Typography } from '@mui/material';

export const CustomerContact = () => {
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Box
        sx={{
          mt: 2,
          p: 2,
          border: '1.5px solid #000',
          borderRadius: 3,
          minWidth: '300px',
          maxWidth: '500px',
          minHeight: '100px',
        }}
      >
        <Typography>Contact</Typography>
        <Typography>Name: Xian Feng Wu</Typography>
        <Typography>Phone: 917-578-1234</Typography>
      </Box>
    </Grid>
  );
};

export const AddressContact = () => {
  return (
    <Grid item xs={12} sm={12} md={6}>
      <Box
        sx={{
          mt: 2,
          p: 2,
          border: '1.5px solid #000',
          borderRadius: 3,
          minWidth: '300px',
          maxWidth: '500px',
          minHeight: '100px',
        }}
      >
        <Typography>Address</Typography>
        <Typography>69 Harvard St Quincy, MA 02171</Typography>
        <Typography>Business: Taipei Cuisine</Typography>
      </Box>
    </Grid>
  );
};
