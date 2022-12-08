import { Grid } from '@mui/material';
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
import { ChangeEvent, useEffect, useState } from 'react';
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
  const { from, status, redirect } = router.query;

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

  const handleOnEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const handleOnPasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    emailLoginWithFirebase(
      email,
      password,
      setLoading,
      setEmailError,
      setPasswordError,
      redirect as string
    );
  };

  const handleEmailDismiss = () => {
    setEmailVerify(false); // dismiss the notification
    Router.replace(`/auth/signin?redirect=/menu`); // replace the url query
  };

  return (
    <>
      <AppBarNav />

      <Grid container>
        <Grid item xs={12} sm={12} md={7} lg={6}>
          <AuthContentContainer>
            {emailVerify && (
              <EmailVerificationNotification onDismiss={handleEmailDismiss} />
            )}

            <SocialLogin />

            <ViaEmailDivider>or login with email</ViaEmailDivider>

            <AuthForm>
              <EmailInput
                autoComplete="new-password"
                value={email}
                onChange={handleOnEmailChange}
                error={emailError}
              />

              <PasswordInput
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={handleOnPasswordChange}
                error={passwordError}
              />

              <MoreOptions />

              <LoadingButton
                fullWidth
                loading={loading}
                text="login"
                onClick={handleSignIn}
              />

              <AuthLink linkTo="signup" text={"Don't have an account yet?"} />
            </AuthForm>
          </AuthContentContainer>
        </Grid>
        <AuthPageImage src={BgGrdImg.src} />
      </Grid>
    </>
  );
}
