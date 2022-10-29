import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CreditCardIcon } from '../../icon/creditCard';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogTitle,
} from '../styles';

export const CreditCardDialog = (props: Dialog) => {
  const [component, setComponent] = useState<'saved_card' | 'new_card'>(
    'saved_card'
  );

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      }
    });
  }, [stripe]);

  const changePaymentType = async () => {
    if (stripe) {
      const clientSecret = Cookies.get('stripe_client');
      if (clientSecret) {
        const intent = await stripe.retrievePaymentIntent(clientSecret);

        console.log(intent);
      }
    }
  };

  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
      <CustomDialogContent
        sx={{
          minHeight: '400px',
        }}
      >
        <CustomeDialogTitle sx={{ mb: 2 }}>
          Pay with Credit Card
        </CustomeDialogTitle>

        {component === 'saved_card' && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2.5px solid #000',
                borderRadius: '17px',
                padding: '10px 20px',
                my: 1.5,
              }}
            >
              <Box display={'flex'}>
                <Radio
                  checked={true}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  value="a"
                  name="radio-buttons"
                />

                <Box ml={2}>
                  <Typography sx={{ fontWeight: 600 }}>Visa</Typography>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      •••• •••• ••••{' '}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      3125
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <CreditCardIcon type="visa" height={50} width={50} />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2.5px solid rgba(0,0,0,0.2)',
                borderRadius: '17px',
                padding: '10px 20px',
                my: 1.5,
              }}
            >
              <Box display={'flex'}>
                <Radio
                  checked={false}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  value="a"
                  name="radio-buttons"
                />

                <Box ml={2} color={'rgba(0,0,0,0.2)'}>
                  <Typography sx={{ fontWeight: 600 }}>
                    American Express
                  </Typography>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      •••• •••••• •
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      3125
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <CreditCardIcon type="amex" height={50} width={50} />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2.5px solid rgba(0,0,0,0.2)',
                borderRadius: '17px',
                padding: '10px 20px',
                my: 1.5,
              }}
            >
              <Box display={'flex'}>
                <Radio
                  checked={false}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  value="a"
                  name="radio-buttons"
                />

                <Box ml={2} color={'rgba(0,0,0,0.2)'}>
                  <Typography sx={{ fontWeight: 600 }}>Mastercard</Typography>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                      •••• •••• ••••
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 600,
                        ml: 1,
                      }}
                    >
                      5231
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box>
                <CreditCardIcon type="mastercard" height={50} width={50} />
              </Box>
            </Box>

            <Button
              onClick={() => {
                setComponent('new_card');
              }}
              fullWidth
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2.5px solid #000',
                borderRadius: '17px',
                padding: '10px 20px',
                my: 1.5,
                height: '79px',
                textTransform: 'capitalize',
                ':hover': {
                  backgroundColor: 'rgba(200,200,200,0.3)',
                  cursor: 'pointer',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Add New Card
              </Typography>

              <CreditCardIcon type="creditcard" height={50} width={50} />
            </Button>
          </>
        )}

        {component === 'new_card' && (
          <>
            <PaymentElement />

            <FormControlLabel
              sx={{ my: 1 }}
              control={<Checkbox defaultChecked />}
              label="Save card for future"
            />

            <Button variant="contained" fullWidth onClick={changePaymentType}>
              Pay $10.55
            </Button>
            <Button
              fullWidth
              onClick={() => {
                setComponent('saved_card');
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                my: 1,
              }}
            >
              <ArrowBackRoundedIcon fontSize="small" />
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  ml: 1,
                }}
              >
                Back To Saved Payment
              </Typography>
            </Button>
          </>
        )}

        {/* <form>{message && <div id="payment-message">{message}</div>}</form> */}
      </CustomDialogContent>
    </CustomDialog>
  );
};
