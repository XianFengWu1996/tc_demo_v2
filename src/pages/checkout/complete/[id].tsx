import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AppBarNav } from '../../../component/appbar/appbar';

export default function CheckoutComplete() {
  const router = useRouter();

  return (
    <>
      <AppBarNav />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '90vh',
          width: '100vw',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={'https://img.icons8.com/clouds/100/null/dumplings.png'}
            height={150}
            width={150}
            alt="Picture of dumpling"
          />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            Thank you for your order
          </Typography>

          <Typography sx={{ fontSize: 16 }}>
            We have receive your order, and you will receive an email with order
            detail.
          </Typography>

          <Button
            variant="contained"
            sx={{ my: 1.5 }}
            onClick={() => {
              router.push('/menu');
            }}
          >
            Back to Home
          </Button>

          <Link href="/simulate/order">Check simulated orders for store</Link>
        </Box>
      </Box>
    </>
  );
}
