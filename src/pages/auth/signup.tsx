import {
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FaApple, FaFacebook } from 'react-icons/fa';
import BgGrdImg from '../../../public/assets/images/noodle.jpg';
import { AppBarNav } from '../../component/appbar/appbar';

export default function SignUp() {
  return (
    <>
      <AppBarNav />

      <Grid container>
        <Grid item lg={6} height={'calc(100vh - 63px)'} sx={{ bgcolor: 'red' }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              src={BgGrdImg.src}
              alt={'picture'}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Grid>
        <Grid item lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
            }}
          >
            <Typography sx={{ fontSize: 25 }}>
              Sign in to Taipei Cuisine
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '200px',
                my: 3,
              }}
            >
              <Box
                sx={{
                  borderRadius: '3px',
                  width: '50px',
                  height: '50px',
                  bgcolor: '#f59c9e47',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* <FaGoogle className="fa-google" /> */}
                <Image
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  height={25}
                  width={25}
                  alt="google icons from icons 8"
                />
              </Box>

              <Box
                sx={{
                  borderRadius: '3px',
                  width: '50px',
                  height: '50px',
                  bgcolor: '#f59c9e47',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FaApple size={25} />
              </Box>

              <Box
                sx={{
                  borderRadius: '3px',
                  width: '50px',
                  height: '50px',
                  bgcolor: '#f59c9e47',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FaFacebook size={25} color="#4267B2" />
              </Box>
            </Box>

            <Divider
              sx={{
                my: 1,
                width: '90%',
                fontSize: 13,
                color: 'rgba(0, 0, 0, 0.40)',
              }}
            >
              or signup with email
            </Divider>

            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '425px' }}
            >
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Email
              </Typography>
              <InputBase
                placeholder="example@email.com"
                sx={{ bgcolor: '#f59c9e47', py: 1, px: 1.5, mb: 2 }}
                inputProps={{
                  sx: {
                    '&::placeholder': {
                      fontSize: 12,
                    },
                  },
                }}
              />

              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Password
              </Typography>
              <InputBase
                placeholder="Password"
                sx={{ bgcolor: '#f59c9e47', py: 1, px: 1.5, mb: 2 }}
                inputProps={{
                  sx: {
                    '&::placeholder': {
                      fontSize: 12,
                    },
                  },
                }}
              />

              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                Confirm Password
              </Typography>
              <InputBase
                placeholder="confirm password"
                sx={{ bgcolor: '#f59c9e47', py: 1, px: 1.5, mb: 2 }}
                inputProps={{
                  sx: {
                    '&::placeholder': {
                      fontSize: 12,
                    },
                  },
                }}
              />
              <Button variant="contained" sx={{ my: 2 }}>
                Sign Up
              </Button>

              <Link href={'/auth/signin'}>
                <Typography sx={{ mb: 3, fontSize: 14, cursor: 'pointer' }}>
                  Already have an account?
                </Typography>
              </Link>

              <Link target="_blank" href="https://icons8.com/icon/17949/google">
                <Typography sx={{ fontSize: 9, cursor: 'pointer' }}>
                  Credit: Google icon by Icons8
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
