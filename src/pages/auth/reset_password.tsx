import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { isEmpty, isString } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { AppBarNav } from '../../component/appbar/appbar';
import { PasswordInput } from '../../component/input/authInput';
import { backToForgotPassword, backToLogin } from '../../functions/auth';
import { handleCatchError } from '../../functions/error';
import { KeyIconWithRoundBorders } from './forgot_password';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const [verified, setVerified] = useState<boolean>(false);

  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        const response = await axios({
          method: 'POST',
          url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/auth/verify_reset_token`,
          data: {
            token,
          },
        });

        if (response.status === 200) {
          setVerified(true);
        }
      } catch (error) {
        handleCatchError(error);
      }
    };

    if (router.isReady && isString(token)) {
      verifyToken(token);
    }
  }, [router.isReady, token]);

  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [confirmError, setConfirmError] = useState<string>('');

  const onResetPassword = async () => {
    setPasswordError('');
    setConfirmError('');

    if (isEmpty(password) || isEmpty(confirm)) {
      setPasswordError('New password or confirm password can not be empty');
      setConfirmError('New password or confirm password can not be empty');
      return;
    }

    if (password !== confirm) {
      setPasswordError('New password and confirm password does not match');
      setConfirmError('New password and confirm password does not match');
      return;
    }

    try {
      const result = await axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_CLOUD_FUNC_URL}/v2/auth/confirm_reset_password`,
        data: {
          token,
          password,
          confirmPassword: confirm,
        },
      });

      if (result.status === 200) {
        router.replace('/auth/reset_success');
      }
    } catch (error) {
      handleCatchError(error);
    }
  };

  return (
    <>
      <AppBarNav />

      <Box
        sx={{
          width: '400px',
          height: '400px',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <KeyIconWithRoundBorders />

        <Typography sx={{ fontSize: 25, textAlign: 'center', my: 1 }}>
          Set a new password
        </Typography>
        {verified ? (
          <form>
            {/* to get rid of the warning */}
            <input
              type="text"
              name="email"
              defaultValue="..."
              autoComplete="off"
              style={{ display: 'none' }}
            />
            <PasswordInput
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              error={passwordError}
              strengthCheck
              autoComplete="new-password"
            />

            <PasswordInput
              placeholder="Confirm the new password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
              error={confirmError}
              autoComplete="new-password"
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ my: 1 }}
              onClick={onResetPassword}
            >
              Reset Password
            </Button>
          </form>
        ) : (
          <>
            <Typography sx={{ color: 'red', textAlign: 'center' }}>
              Invalid or expired link, keep in mind that the link is only valid
              for 30 minutes, please request another link
            </Typography>
            <Button
              variant="contained"
              sx={{ my: 2 }}
              onClick={backToForgotPassword}
            >
              Request Link
            </Button>
          </>
        )}

        <Button onClick={backToLogin}>
          <BsArrowLeft size={16} style={{ marginRight: '7px' }} />
          Back to Login
        </Button>
      </Box>
    </>
  );
}
