import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import BgGrdImg from '../../../public/assets/images/dumplings.jpg';
import { AppBarNav } from '../../component/appbar/appbar';
import { AuthPageImage } from '../../component/auth/authImage';
import { MoreOptions } from '../../component/auth/moreOptions';
import { SocialLogin } from '../../component/auth/socialLogin';
import { ViaEmailDivider } from '../../component/auth/viaEmailDivider';
import { EmailInput, PasswordInput } from '../../component/input/authInput';
import { AuthLink } from '../../component/link/authLink';

export default function SignIn() {
  return (
    <>
      <AppBarNav />

      <Grid container>
        <Grid item xs={12} sm={12} md={7} lg={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 10,
            }}
          >
            <SocialLogin />

            <ViaEmailDivider>or login with email</ViaEmailDivider>

            <Box
              component={'form'}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', width: '425px' }}
            >
              <EmailInput autoComplete="new-password" />

              <PasswordInput
                placeholder="password"
                autoComplete="new-password"
              />

              <MoreOptions />

              <Button variant="contained" sx={{ my: 2 }}>
                Login
              </Button>

              <AuthLink
                linkTo="auth/signup"
                text={"Don't have an account yet?"}
              />

              <Credit />
            </Box>
          </Box>
        </Grid>
        <AuthPageImage src={BgGrdImg.src} />
      </Grid>
    </>
  );
}

const Credit = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Link target="_blank" href="https://icons8.com/icon/17949/google">
        <Typography sx={{ fontSize: 9, cursor: 'pointer' }}>
          Credit: Google icon by Icons8,
        </Typography>
      </Link>
      <Typography sx={{ fontSize: 9, ml: 0.5 }}>
        Photo by{' '}
        <a href="https://unsplash.com/@sjcbrn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          SJ 📸
        </a>{' '}
        on{' '}
        <a href="https://unsplash.com/s/photos/chinese-food?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </Typography>
    </Box>
  );
};
