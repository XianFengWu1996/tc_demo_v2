import { Box, styled } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import { useEffect, useMemo, useState } from 'react';
import { getStripeClientSecret } from '../../functions/checkout';
import { Address } from './address';
import { Payment } from './payment/payment';
import { CheckoutGrid } from './styles';

const CartContentContainer = styled(Box)(({ theme }) => ({
  width: '70%',
  marginTop: '40px',

  [theme.breakpoints.down('md')]: {
    marginTop: '60px',
    marginBottom: '40px',
    width: '85%',
  },
  [theme.breakpoints.down('sm')]: {
    marginTop: '30px',
    marginBottom: '60px',
    width: '95%',
  },
}));

export const CartContent = () => {
  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );
  const [clientSecret, setClientSecret] = useState('');

  const [showAddress, setShowAddress] = useState<boolean>(true);
  const [showPayment, setShowPayment] = useState<boolean>(false);

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

  const backToAddress = () => {
    setShowAddress(true);
    setShowPayment(false);
  };

  const proceedToPayment = () => {
    setShowAddress(false);
    setShowPayment(true);
  };

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
      <CartContentContainer>
        <Address
          showAddress={showAddress}
          handleProceed={proceedToPayment}
          backToAddress={backToAddress}
        />

        {clientSecret && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <Payment
              showPayment={showPayment}
              setShowPayment={setShowPayment}
            />
          </Elements>
        )}
      </CartContentContainer>
    </CheckoutGrid>
  );
};
