import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import { AppBarNav } from '../../modules/appbar/appbar';

import {
  PaymentElement,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { FaCcAmex } from 'react-icons/fa';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentPage() {
  const [c_secret, setClientSecret] = useState('');

  useEffect(() => {
    const clientSecret = Cookie.get('stripe_client');

    if (clientSecret) {
      setClientSecret(clientSecret);
    }

    axios({
      method: 'get',
      url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/payment/initiate_intent`,
    })
      .then((result) => {
        Cookie.set('stripe_client', result.data.clientSecret, {
          // secure: true,
          domain: 'localhost',
          expires: 7,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AppBarNav />
      <Grid container>
        <Grid item xs={12} sm={12} md={5.5} padding={3}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, my: 2, textTransform: 'capitalize' }}
          >
            Pay with Saved card
          </Typography>
          <Alert severity="error" variant="filled">
            The card has expired
          </Alert>
          <Box sx={{ mt: 2 }}>
            <Card sx={{ background: '#fff', border: '1px solid #000' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FaCcAmex size={30} />
                <Typography>AMEX •••• ••••• 9283</Typography>
                <Typography>exp:02/25</Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Card sx={{ background: '#fff', border: '3px solid #00D100' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FaCcAmex size={30} />
                <Typography>AMEX •••• ••••• 9283</Typography>
                <Typography>exp:02/25</Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Card sx={{ background: '#fff', border: '1px solid #000' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <FaCcAmex size={30} />
                <Typography>AMEX •••• ••••• 9283</Typography>
                <Typography>exp:02/25</Typography>
              </CardContent>
            </Card>
          </Box>
          <Button variant="contained" fullWidth sx={{ mt: 2 }}>
            Pay $30.95
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={1}>
          <Divider orientation="vertical">OR</Divider>
        </Grid>

        <Grid item xs={12} sm={12} md={5.5} padding={3}>
          {c_secret && (
            <Elements
              options={{
                clientSecret: c_secret,
                appearance: {
                  theme: 'stripe',
                },
              }}
              stripe={stripePromise}
            >
              <CheckoutForm />
            </Elements>
          )}
        </Grid>
      </Grid>
    </>
  );
}

const CheckoutForm = () => {
  // const stripe = useStripe();
  // const elements = useElements();

  // const [message, setMessage] = React.useState(null);
  // const [isLoading, setIsLoading] = React.useState(false);

  return (
    <form>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, my: 2, textTransform: 'capitalize' }}
      >
        Pay with credit card
      </Typography>
      <Alert severity="error" variant="filled" sx={{ mb: 2 }}>
        The card has expired
      </Alert>
      <PaymentElement />
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Save card for future checkout"
      />
      <Button variant="contained" fullWidth sx={{}}>
        Pay $30.95
      </Button>
    </form>
  );
};
