import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import BgGrdImg from '../../../public/assets/images/noodle.jpg';
import { AppBarNav } from '../../component/appbar/appbar';
import { AuthForm } from '../../component/auth/authForm';
import { AuthPageImage } from '../../component/auth/authImage';
import { SocialLogin } from '../../component/auth/socialLogin';
import { AuthContentContainer } from '../../component/auth/styles';
import { ViaEmailDivider } from '../../component/auth/viaEmailDivider';
import { EmailInput, PasswordInput } from '../../component/input/authInput';
import { AuthLink } from '../../component/link/authLink';

export default function SignUp() {
  return (
    <>
      <AppBarNav />

      <Grid container>
        <AuthPageImage src={BgGrdImg.src} />
        <Grid item lg={6}>
          <AuthContentContainer>
            <SocialLogin />

            <ViaEmailDivider>or signup with email</ViaEmailDivider>

            <AuthForm>
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

              <AuthLink linkTo="signin" text={'Already have an account?'} />

              <Credit />
            </AuthForm>
          </AuthContentContainer>
        </Grid>
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
  );
};
