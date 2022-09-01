import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { AppBarNav } from '../../modules/appbar/appbar';
import FallBackImage from '../../../public/assets/images/fallback.jpeg';
import Image from 'next/image';
import { BsHouse } from 'react-icons/bs';
import { GiPresent } from 'react-icons/gi';

export default function ConfirmationPage() {
  return (
    <>
      <AppBarNav />

      <Box sx={{ px: 20, py: 5 }}>
        <Button variant="contained" sx={{ my: 2 }}>
          <BsHouse size={20} />
          <Typography sx={{ mx: 2 }}>Go to Home</Typography>
        </Button>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <GiPresent color="green" size={50} />
          <Typography
            sx={{
              fontSize: 35,
              fontWeight: 600,
            }}
          >
            {' '}
            Order Confirmation
          </Typography>
        </div>

        <Box sx={{ my: 2 }}>
          <Typography>Hi Xian, </Typography>
          <Typography>
            Thank you for placing order with us today. The order summary are
            shown below, if you have any question please contact us at
            example_email@gmail.com
          </Typography>
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          <Box>
            <Typography>Order ID: TCP923812312</Typography>
            <Typography>Date: 04/02/2022 17:23</Typography>
          </Box>

          <Box>
            <Typography>Address: 49 Harvard St, Quincy MA 02171</Typography>
          </Box>
        </div>

        <Box>
          <Card sx={{ my: 2 }} elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                  <Image
                    src={FallBackImage.src}
                    height={60}
                    width={60}
                    alt={'Image of food'}
                  />

                  <Box sx={{ ml: 3 }}>
                    <Typography>A1. Lorem ipsum dolor 辣子鸡</Typography>
                    <Typography>Qty: 3</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography>$12.95</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ my: 2 }} elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                  <Image
                    src={FallBackImage.src}
                    height={60}
                    width={60}
                    alt={'Image of food'}
                  />

                  <Box sx={{ ml: 3 }}>
                    <Typography>A2. Lorem ipsum dolor 辣子鸡</Typography>
                    <Typography>Qty: 1</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography>$12.95</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ my: 2 }} elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                  <Image
                    src={FallBackImage.src}
                    height={60}
                    width={60}
                    alt={'Image of food'}
                  />

                  <Box sx={{ ml: 3 }}>
                    <Typography>A3. Lorem ipsum dolor 辣子鸡</Typography>
                    <Typography>Qty: 2</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography>$12.95</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Box>
            <Typography>
              Delivery Notes: this is some delivery notes for the order
            </Typography>
          </Box>

          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}
          >
            <div style={{ width: '120px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Typography>Subtotal: </Typography>
                <Typography>$30.95</Typography>
              </div>
            </div>

            <Typography>Tax: $2.50</Typography>
            <Typography>Tip: $3.00</Typography>
            <Typography>Total: $41.95</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
