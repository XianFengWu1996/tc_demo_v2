import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { TbMailbox } from 'react-icons/tb';
import BgGrdImg from '../../../public/assets/images/dumplings.jpg';
import { AppBarNav } from '../../component/appbar/appbar';
import { AuthForm } from '../../component/auth/authForm';
import { AuthPageImage } from '../../component/auth/authImage';
import { MoreOptions } from '../../component/auth/moreOptions';
import { SocialLogin } from '../../component/auth/socialLogin';
import { AuthContentContainer } from '../../component/auth/styles';
import { ViaEmailDivider } from '../../component/auth/viaEmailDivider';
import { EmailInput, PasswordInput } from '../../component/input/authInput';
import { AuthLink } from '../../component/link/authLink';

import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { emailLoginWithFirebase } from '../../functions/auth';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();
  const { from, status } = router.query;

  const [showSuccess, setShowSucess] = useState<boolean>(false);

  useEffect(() => {
    if (from === 'signup' && status === 'success') {
      setShowSucess(true);
    }

    return () => {
      setShowSucess(false);
    };
  }, [from, status]);

  return (
    <>
      <AppBarNav />

      <Grid container>
        <Grid item xs={12} sm={12} md={7} lg={6}>
          <AuthContentContainer>
            {showSuccess && (
              <Card
                sx={{
                  mb: 2,
                  py: 1.5,
                  px: 2.5,
                  bgcolor: '#67c287',
                  mt: -7,
                  maxWidth: '80%',
                }}
                elevation={0}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <TbMailbox size={25} color={'#fff'} />
                  <Typography sx={{ color: '#fff', ml: 3 }}>
                    Success, please check verification link in your inbox.
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    p: 0,
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setShowSucess(false); // dismiss the notification
                      Router.replace('/auth/signin'); // replace the url query
                    }}
                    sx={{ borderColor: '#fff', color: '#fff' }}
                  >
                    Dismiss
                  </Button>
                </CardActions>
              </Card>
            )}

            <SocialLogin />

            <ViaEmailDivider>or login with email</ViaEmailDivider>

            <AuthForm>
              <EmailInput
                autoComplete="new-password"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <PasswordInput
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <MoreOptions />

              <Button
                variant="contained"
                sx={{ my: 2 }}
                onClick={() => {
                  emailLoginWithFirebase(email, password);
                }}
              >
                Login
              </Button>

              <AuthLink linkTo="signup" text={"Don't have an account yet?"} />

              <Credit />
            </AuthForm>
          </AuthContentContainer>
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
