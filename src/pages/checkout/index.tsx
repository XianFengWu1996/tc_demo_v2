import { onAuthStateChanged } from '@firebase/auth';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputBase,
  Radio,
  Typography,
} from '@mui/material';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineExclamationCircle } from 'react-icons/ai';
import { BsCreditCard } from 'react-icons/bs';
import { RiAlipayLine, RiWechatPayLine } from 'react-icons/ri';
import { SiApplepay } from 'react-icons/si';
import { MoonLoader } from 'react-spinners';
import blackLogo from '../../../public/assets/images/blacklogo.png';
import whiteLogo from '../../../public/assets/images/whitelogo.png';

import { CheckoutNavigationButton } from '../../component/button/checkoutButton';
import { Address } from '../../component/checkout/address';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogTitle,
} from '../../component/dialog/styles';
import { CreditCardIcon } from '../../component/icon/creditCard';
import { ImageWithQuantity } from '../../component/image/imageWithQuantity';
import { auth } from '../../config/firebaseConfig';
import { getStripeClientSecret, getUserData } from '../../functions/checkout';
import { handleCatchError } from '../../functions/error';
import { getCurrentTime, timeToStringFormat } from '../../functions/time';
import { useAppSelector } from '../../store/hook';

export default function CheckoutPage() {
  const stripePromise = useMemo(
    () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
    []
  );
  const [clientSecret, setClientSecret] = useState('');
  const [state, setState] = useState<CheckoutState>({
    deliveryOption: 'delivery',
    timeFrame: {
      type: 'asap',
      selected: null,
    },
    additional: {
      delivery_notes: '',
      dropoff_option: 'leave_at_door',
      utensilOption: 'do not include',
      kitchenNotes: '',
    },
    contact: {
      name: '',
      phone: '',
    },
    reward: {
      points: 0,
      transactions: [],
    },
  });

  // get client secret
  useEffect(() => {
    try {
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

      onAuthStateChanged(auth, async (fbUser) => {
        const token = await fbUser?.getIdToken();
        // get the user information
        const user = (await (
          await getUserData(token)
        ).data.user) as IUserResult;

        setState({
          ...state,
          address: user.address,
          contact: {
            name: user.name,
            phone: user.phone,
          },
          reward: user.reward,
        });
      });
    } catch (error) {
      handleCatchError(error);
    }
  }, []);

  const { today } = useAppSelector((state) => state.store);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMsg, setErrMsg] = useState<string>('');

  // to check if in operating hour
  useEffect(() => {
    if (today) {
      if (!today.isOpenForBusiness) {
        setIsOpen(false);
        setErrMsg(`Store is currently not operating on ${today.dayOfWeek}`);
        return;
      }

      const currentTime = getCurrentTime();

      // check if the store is in operating hour
      const operating = today.hours.operating;
      if (currentTime < operating.open || currentTime > operating.close) {
        setIsOpen(false);
        setErrMsg(
          `The store operating hours are ${timeToStringFormat(
            operating.open
          )} -${timeToStringFormat(operating.close)}`
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        return;
      }

      setIsOpen(true);
    }
  }, [today]);

  return (
    <>
      {!isOpen ? (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '15px 30px',
              position: 'absolute',
              top: '20px',
              left: '20px',
            }}
          >
            <Image
              src={blackLogo.src}
              alt="taipei cuisine logo"
              width={45}
              height={35}
            />
          </div>

          <div>
            <MoonLoader loading={loading} speedMultiplier={0.7} color="red" />
          </div>

          {!loading && (
            <Box
              sx={{
                p: 4,
                border: '1px solid rgba(0,0,0,0.2)',
                borderRadius: '15px',
              }}
            >
              <AiOutlineExclamationCircle size={23} color="red" />
              <Typography sx={{ textTransform: 'uppercase', my: 1 }}>
                {errMsg}
              </Typography>
              <Button variant="contained" sx={{ marginTop: '5px' }}>
                <AiOutlineArrowLeft style={{ marginRight: '5px' }} />
                Return to main menu
              </Button>
            </Box>
          )}
        </div>
      ) : (
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            sx={{ bgcolor: '#242843', minHeight: '100vh' }}
            //   sx={{ bgcolor: 'rgba(243,132,134, 0.3)', minHeight: '100vh' }}
          >
            <div style={{ padding: '15px 30px' }}>
              <Image
                src={whiteLogo.src}
                alt="taipei cuisine logo"
                width={45}
                height={35}
              />
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: '450px' }}>
                <Typography sx={{ color: '#fff', mb: 1.5 }}>
                  Your order
                </Typography>

                <Box
                  sx={{
                    border: '1px solid rgba(256,256,256,0.2)',
                    width: '450px',
                    height: '350px',
                    borderRadius: '10px',
                    overflowY: 'auto',
                  }}
                >
                  {/* testing  */}
                  <Box
                    sx={{
                      minHeight: '100px',
                      width: '100%',
                      borderBottom: '1px solid rgba(256,256,256,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: '#3e4053',
                    }}
                  >
                    <ImageWithQuantity />

                    <Box
                      sx={{
                        mx: 2,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 2,
                      }}
                    >
                      <Box
                        sx={{
                          color: '#fff ',
                          display: 'flex',
                          flexDirection: 'column',
                          mr: 1,
                        }}
                      >
                        <Box marginLeft={0}>
                          <Typography
                            noWrap
                            maxWidth={'225px'}
                            sx={{
                              fontSize: 12,
                              textOverflow: 'ellipsis',
                            }}
                          >
                            A1.Chilled Jelly Fish changeChilled A1.Chilled Jelly
                            Fish changeChilled
                          </Typography>

                          <Typography sx={{ fontSize: 12 }}>
                            凉拌海蜇皮
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: 'red' }}>
                            Notes: Please no spicy Notes: Please no spicy Notes:
                            Please no spicy Notes: Please no spicy Notes: Please
                            no spicy Notes: Please no spicy Notes: Please no
                            spicy Notes: Please no spicy Notes: Please no spicy
                            Notes: Please no spicy Notes: Please no spicy Notes:
                            Please no spicy Notes: Please no spicy Notes: Please
                            no spicy
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ color: '#fff' }}>
                        <Typography sx={{ fontSize: 12 }}>$10.99</Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      minHeight: '100px',
                      width: '100%',
                      borderBottom: '1px solid rgba(256,256,256,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: '#3e4053',
                    }}
                  >
                    <ImageWithQuantity />

                    <Box
                      sx={{
                        mx: 2,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 2,
                      }}
                    >
                      <Box
                        sx={{
                          color: '#fff ',
                          display: 'flex',
                          flexDirection: 'column',
                          mr: 1,
                        }}
                      >
                        <Box>
                          <Typography
                            noWrap
                            maxWidth={'225px'}
                            sx={{
                              fontSize: 12,
                              textOverflow: 'ellipsis',
                            }}
                          >
                            A1.Chilled Jelly Fish changeChilled A1.Chilled Jelly
                            Fish changeChilled
                          </Typography>

                          <Typography sx={{ fontSize: 12 }}>
                            凉拌海蜇皮
                          </Typography>

                          <Box>
                            <Typography fontSize={10}>
                              Choose a flavor 选择口味
                            </Typography>
                            <Typography fontSize={10} ml={2}>
                              - Original 原味 +$0.00
                            </Typography>

                            <Typography fontSize={10}>
                              Choose a topping 选择额外{' '}
                            </Typography>
                            <Typography fontSize={10} ml={2}>
                              - Chicken 鸡肉 +$2.00
                            </Typography>
                          </Box>

                          <Typography sx={{ fontSize: 12, color: 'red' }}>
                            Notes: Please no spicy Notes: Please no spicy Notes:
                            Please no spicy Notes: Please no spicy Notes: Please
                            no spicy Notes: Please no spicy Notes: Please no
                            spicy Notes: Please no spicy Notes: Please no spicy
                            Notes: Please no spicy Notes: Please no spicy Notes:
                            Please no spicy Notes: Please no spicy Notes: Please
                            no spicy
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ color: '#fff' }}>
                        <Typography sx={{ fontSize: 12 }}>$10.99</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Typography sx={{ color: '#fff', mt: 1.5 }}>
                  Discount Code
                </Typography>
                <Box
                  sx={{
                    color: '#fff',
                    display: 'flex',
                    border: '1px solid #fff',
                    borderRadius: '5px',
                    width: 'inherit',
                    justifyContent: 'space-between',
                    px: 2,
                  }}
                >
                  <InputBase sx={{ color: '#fff' }} />
                  <Typography>Apply</Typography>
                </Box>

                <hr
                  style={{
                    border: 'none',
                    borderTop: '0.7px solid rgba(256,256,256,0.5)',
                    marginTop: '15px',
                    marginBottom: '15px',
                  }}
                />

                <Box sx={{ color: '#fff', width: '100%' }}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Subtotal: </Typography>
                    <Typography>$50.53</Typography>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    {' '}
                    <Typography>Tax: </Typography>
                    <Typography>$6.99</Typography>
                  </div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography>Tip: </Typography>
                    <Typography>$0.00</Typography>
                  </div>
                </Box>

                <hr
                  style={{
                    border: 'none',
                    borderTop: '0.7px solid rgba(256,256,256,0.5)',
                    marginTop: '15px',
                    marginBottom: '15px',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#fff',
                  }}
                >
                  <Typography>Total: </Typography>
                  <Typography>$60.99</Typography>
                </div>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            sx={{
              bgcolor: 'rgba(200,200,200, 0.1)',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Box mt={5} width={'70%'}>
              <Address state={state} setState={setState} />

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
          </Grid>
        </Grid>
      )}
    </>
  );
}

export const Payment = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '30px',
        p: 4,
        mt: 5,
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
        Payment
      </Typography>

      <CheckoutNavigationButton
        onClick={handleOpen}
        title="Pay with credit card"
        icon={<BsCreditCard size={22} />}
      />

      <CheckoutNavigationButton
        title="Apple pay"
        icon={<SiApplepay size={22} />}
      />

      <CheckoutNavigationButton
        title="Alipay"
        icon={<RiAlipayLine size={22} color="#0e9dec" />}
      />

      <CheckoutNavigationButton
        title="Wechat Pay"
        icon={<RiWechatPayLine size={22} color="#7BB32E" />}
      />

      <CreditCardDialog open={open} handleClose={handleClose} />
    </Box>
  );
};

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
