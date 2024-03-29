import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import BgGrdImg from '../../../public/assets/images/noodle.jpg';
import { AppBarNav } from '../../component/appbar/appbar';
import { AuthForm } from '../../component/auth/authForm';
import { AuthPageImage } from '../../component/auth/authImage';
import { SocialLogin } from '../../component/auth/socialLogin';
import { AuthContentContainer } from '../../component/auth/styles';
import { ViaEmailDivider } from '../../component/auth/viaEmailDivider';
import { LoadingButton } from '../../component/button/loadingButton';
import { EmailInput, PasswordInput } from '../../component/input/authInput';
import { AuthLink } from '../../component/link/authLink';
import { emailSignupWithFirebase } from '../../functions/auth';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  useEffect(() => {
    return () => {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLoading(false);
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
    };
  }, []);

  return (
    <>
      <AppBarNav />

      <Grid container>
        <AuthPageImage src={BgGrdImg.src} />
        <Grid item xs={12} sm={12} md={7} lg={6}>
          <AuthContentContainer>
            <SocialLogin />

            <ViaEmailDivider>or signup with email</ViaEmailDivider>

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
                strengthCheck
              />

              <PasswordInput
                placeholder="Confirm Password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                error={confirmPasswordError}
              />

              <LoadingButton
                fullWidth
                loading={loading}
                text="sign up"
                onClick={() => {
                  emailSignupWithFirebase(
                    email,
                    password,
                    confirmPassword,
                    setLoading,
                    setEmailError,
                    setPasswordError,
                    setConfirmPasswordError
                  );
                }}
              />

              <AuthLink linkTo="signin" text={'Already have an account?'} />
            </AuthForm>
          </AuthContentContainer>
        </Grid>
      </Grid>
    </>
  );
}
