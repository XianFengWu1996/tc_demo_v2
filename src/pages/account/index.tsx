import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import {
  AiOutlineDollar,
  AiOutlineExclamationCircle,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { IoReceiptOutline, IoWalletOutline } from 'react-icons/io5';
import { MdOutlineDeliveryDining } from 'react-icons/md';
import { AppBarNav } from '../../component/appbar/appbar';

export default function AccountPage() {
  return (
    <>
      <AppBarNav />

      <Grid container>
        <Grid item xs={5} sm={4} md={3} lg={3}>
          <Box
            sx={{
              minHeight: 'calc(100vh - 63px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              py: 5,
              pl: 5,
            }}
          >
            <Link href={'#'}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <AiOutlineUser size={20} />
                <Typography sx={{ ml: 2 }}>Personal Info</Typography>
              </Box>
            </Link>
            <Link href={'#'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  my: 1,
                  p: 1,
                  backgroundColor: 'secondary.light',
                  width: '80%',
                  ml: 1,
                  position: 'relateive',
                }}
              >
                <MdOutlineDeliveryDining size={20} />
                <Typography sx={{ ml: 2 }}>Address</Typography>
              </Box>
            </Link>

            <Link href={'#'}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <IoWalletOutline size={20} />
                <Typography sx={{ ml: 2 }}>Wallet</Typography>
              </Box>
            </Link>

            <Link href={'#'}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <IoReceiptOutline size={20} />
                <Typography sx={{ ml: 2 }}>Order History</Typography>
              </Box>
            </Link>

            <Link href={'#'}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <AiOutlineDollar size={20} />
                <Typography sx={{ ml: 2 }}>Rewards</Typography>
              </Box>
            </Link>

            <Link href={'#'}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <AiOutlineExclamationCircle size={20} />
                <Typography sx={{ ml: 2 }}>Legal</Typography>
              </Box>
            </Link>
            <Link href={'#'}>
              <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                <BsTelephone size={20} />
                <Typography sx={{ ml: 2 }}>Contact Us</Typography>
              </Box>
            </Link>
          </Box>
        </Grid>

        <Grid
          item
          xs={7}
          sm={8}
          md={9}
          lg={9}
          sx={{ borderLeft: '1px solid #D1CFCF' }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 63px)' }}>main content</Box>
        </Grid>
      </Grid>
    </>
  );
}
