import { Box, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import BgGrdImg from '../../../public/assets/images/dumplings.jpg';
import { AppBarNav } from '../../component/appbar/appbar';
import { AuthForm } from '../../component/auth/authForm';
import { AuthPageImage } from '../../component/auth/authImage';
import { MoreOptions } from '../../component/auth/moreOptions';
import { SocialLogin } from '../../component/auth/socialLogin';
import { AuthContentContainer } from '../../component/auth/styles';
import { ViaEmailDivider } from '../../component/auth/viaEmailDivider';
import { AuthLink } from '../../component/link/authLink';

import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EmailVerificationNotification } from '../../component/auth/notification';
import { LoadingButton } from '../../component/button/loadingButton';
import { EmailInput, PasswordInput } from '../../component/input/authInput';
import { emailLoginWithFirebase } from '../../functions/auth';

export default function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailVerify, setEmailVerify] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const router = useRouter();
  const { from, status } = router.query;

  useEffect(() => {
    if (from === 'signup' && status === 'success') {
      setEmailVerify(true);
    }

    return () => {
      setEmailVerify(false);
      setEmail('');
      setPassword('');
      setLoading(false);
      setEmailError('');
      setPasswordError('');
    };
  }, [from, status]);

  return (
    <>
      <AppBarNav />

      <Grid container>
        <Grid item xs={12} sm={12} md={7} lg={6}>
          <AuthContentContainer>
            {emailVerify && (
              <EmailVerificationNotification
                onDismiss={() => {
                  setEmailVerify(false); // dismiss the notification
                  Router.replace('/auth/signin'); // replace the url query
                }}
              />
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
                error={emailError}
              />

              <PasswordInput
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={passwordError}
              />

              <MoreOptions />

              <LoadingButton
                fullWidth
                loading={loading}
                text="login"
                onClick={() => {
                  emailLoginWithFirebase(
                    email,
                    password,
                    setLoading,
                    setEmailError,
                    setPasswordError
                  );
                }}
              />

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
