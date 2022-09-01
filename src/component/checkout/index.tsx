import { Box, Button, Divider, Grid } from '@mui/material';
import Router from 'next/router';
import { AddressContact, CustomerContact } from './contact';
import { DeliveryNotes } from './deliveryNote';
import { DeliveryOption } from './deliveryOption';
import { PaymentOptions } from './paymentOptions';
import { Redemption } from './redemption';
import { Schedule } from './schedule';

export const CheckoutContent = () => {
  return (
    <Box sx={{ flex: 2.5, mx: 5, my: 3 }}>
      <DeliveryOption />

      <Grid container spacing={2} direction="row" alignItems={'stretch'}>
        <CustomerContact />
        <AddressContact />
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2} direction="row" alignItems={'stretch'}>
        <Schedule />
        <Redemption />
      </Grid>

      <Divider sx={{ my: 2 }} />

      <DeliveryNotes />

      <PaymentOptions />

      <Button
        variant="contained"
        fullWidth
        onClick={() => Router.push('/payment')}
      >
        Continue to payment
      </Button>
    </Box>
  );
};
