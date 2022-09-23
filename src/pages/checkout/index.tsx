import { Box, Button, Grid, InputBase, Typography } from '@mui/material';
import Image from 'next/image';
import { MouseEventHandler, useState } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { RiAlipayLine, RiWechatPayLine } from 'react-icons/ri';
import { SiApplepay } from 'react-icons/si';
import whiteLogo from '../../../public/assets/images/whitelogo.png';
import { CheckoutNavigationButton } from '../../component/button/checkoutButton';
import { Address } from '../../component/checkout/address';
import { ImageWithQuantity } from '../../component/image/imageWithQuantity';

export default function CheckoutPage() {
  const [deliveryOption, setDeliveryOption] =
    useState<IDeliveryOption>('delivery');

  return (
    <>
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
                          no spicy Notes: Please no spicy Notes: Please no spicy
                          Notes: Please no spicy Notes: Please no spicy Notes:
                          Please no spicy Notes: Please no spicy Notes: Please
                          no spicy Notes: Please no spicy Notes: Please no spicy
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
                          no spicy Notes: Please no spicy Notes: Please no spicy
                          Notes: Please no spicy Notes: Please no spicy Notes:
                          Please no spicy Notes: Please no spicy Notes: Please
                          no spicy Notes: Please no spicy Notes: Please no spicy
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
          <Box
            sx={{
              width: '70%',
              mt: 5,
            }}
          >
            <Address
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
            />

            <Payment />
          </Box>

          <Button variant="contained" sx={{ my: 3 }}>
            Place Order
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

interface IDeliveryOptionButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  type: IDeliveryOption;
}

export const DeliveryButton = (props: IDeliveryOptionButtonProps) => {
  return (
    <Button
      sx={{
        flex: 1,
        bgcolor: props.type === 'delivery' ? '#000' : '#fff',
        color: props.type === 'delivery' ? '#fff' : '#000',
        marginRight: props.type === 'delivery' ? '-30px' : 0,
        zIndex: props.type === 'delivery' ? 999 : 0,
        borderRadius: '30px',
        '&:hover': {
          bgcolor: props.type === 'delivery' ? 'rgba(0,0,0,0.7)' : '',
        },
      }}
      onClick={props.onClick}
    >
      Delivery
    </Button>
  );
};

export const PickupButton = (props: IDeliveryOptionButtonProps) => {
  return (
    <Button
      sx={{
        flex: 1,
        bgcolor: props.type === 'pickup' ? '#000' : '#fff',
        color: props.type === 'pickup' ? '#fff' : '#000',
        marginLeft: props.type === 'pickup' ? '-30px' : 0,
        zIndex: props.type === 'pickup' ? 999 : 0,
        borderRadius: '30px',
        '&:hover': {
          bgcolor: props.type === 'pickup' ? 'rgba(0,0,0,0.7)' : '',
        },
      }}
      onClick={props.onClick}
    >
      Pickup
    </Button>
  );
};

export const Payment = () => {
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
    </Box>
  );
};
