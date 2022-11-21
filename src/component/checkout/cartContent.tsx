import { Box, styled } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useMemo, useState } from 'react';
import snackbar from '../../functions/utilities/snackbar';
import { useAppSelector } from '../../store/hook';
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
    () =>
      loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
        betas: ['address_element_beta_1'],
      }),
    []
  );
  const { contact, address, clientSecret } = useAppSelector(
    (state) => state.checkout
  );
  const { deliveryOption } = useAppSelector((state) => state.cart);

  const [showAddress, setShowAddress] = useState<boolean>(true);
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const backToAddress = () => {
    setShowAddress(true);
    setShowPayment(false);
  };

  const proceedToPayment = () => {
    if (!contact.name) {
      return snackbar.error('Please provide name for the order');
    }

    if (!contact.phone) {
      return snackbar.error('Please provide phone for the order');
    }

    if (deliveryOption === 'delivery') {
      if (!address.details || !address.formattedAddress) {
        return snackbar.error('Please provide address for the order');
      }
    }

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
