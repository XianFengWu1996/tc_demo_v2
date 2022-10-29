import { Box, Button } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';
import { getStripeClientSecret } from '../../functions/checkout';
import { Address } from './address';
import { Payment } from './payment/payment';
import { CheckoutGrid } from './styles';

export const CartContent = () => {
  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const getClientSecret = async () => {
      // get the client secret from cookie
      const clientSecret = Cookies.get('stripe_client');
      if (clientSecret) {
        setClientSecret(clientSecret);
      } else {
        const secret_result = await (await getStripeClientSecret()).data;
        Cookies.set('stripe_client', secret_result.clientSecret, {
          domain: 'localhost',
          expires: 7,
        });
        setClientSecret(secret_result.clientSecret);
      }
    };
    getClientSecret();

    return () => {
      setClientSecret('');
    };
  }, []);

  return (
    <CheckoutGrid
      item
      xs={12}
      sm={12}
      md={8}
      sx={{
        bgcolor: 'rgba(200,200,200, 0.1)',
      }}
    >
      <Box mt={5} width={'70%'}>
        <Address />

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <Payment />
          </Elements>
        )}
      </Box>

      <Button variant="contained" sx={{ my: 3 }}>
        Place Order
      </Button>
    </CheckoutGrid>
  );
};
