import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import BgGrdImg from '../../../public/assets/images/noodle.jpg';
import { AppBarNav } from '../../component/appbar/appbar';
import { AuthPageImage } from '../../component/auth/authImage';
import { SocialLogin } from '../../component/auth/socialLogin';
import { EmailInput, PasswordInput } from '../../component/input/authInput';

export default function SignUp() {
  return (
    <>
      <AppBarNav />

      <Grid container>
        <AuthPageImage src={BgGrdImg.src} />
        <Grid item lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
            }}
          >
            <SocialLogin />

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
              component={'form'}
              noValidate
              autoComplete="off"
              sx={{ display: 'flex', flexDirection: 'column', width: '425px' }}
            >
              <EmailInput autoComplete="new-password" />

              <PasswordInput
                placeholder="Password"
                autoComplete="new-password"
              />

              <PasswordInput
                placeholder="Confirm Password"
                autoComplete="new-password"
              />

              <Button variant="contained" sx={{ my: 2 }}>
                Sign Up
              </Button>

              <Link href={'/auth/signin'}>
                <Typography sx={{ mb: 3, fontSize: 14, cursor: 'pointer' }}>
                  Already have an account?
                </Typography>
              </Link>

              <Box sx={{ display: 'flex' }}>
                <Link
                  target="_blank"
                  href="https://icons8.com/icon/17949/google"
                >
                  <Typography sx={{ fontSize: 9, cursor: 'pointer' }}>
                    Credit: Google icon by Icons8,
                  </Typography>
                </Link>
                <Typography sx={{ fontSize: 9, ml: 0.5 }}>
                  Photo by
                  <a
                    href="https://unsplash.com/@debbietakesphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    style={{ textDecoration: 'underline', padding: '0 2px' }}
                  >
                    Debbie Tea
                  </a>
                  on{' '}
                  <a
                    href="https://unsplash.com/s/photos/chinese-food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    style={{ textDecoration: 'underline' }}
                  >
                    Unsplash
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
