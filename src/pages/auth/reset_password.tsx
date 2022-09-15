import { Box, Button, Typography } from '@mui/material';
import Router from 'next/router';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { AppBarNav } from '../../component/appbar/appbar';
import { PasswordInput } from '../../component/input/authInput';
import { KeyIconWithRoundBorders } from './forgot_password';

export default function ResetPassword() {
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [confirmError, setConfirmError] = useState<string>('');

  const backToLogin = () => {
    Router.push('/auth/signin');
  };

  const onResetPassword = () => {
    if (password !== confirm) {
      setPasswordError('The password does not match');
      setConfirmError('The password does not match');
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
        {/* <Typography sx={{ my: 1, fontSize: 12, textAlign: 'center' }}>
          No worries, we will send you reset instruction
        </Typography> */}

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
        <Button variant="contained" sx={{ my: 1 }} onClick={onResetPassword}>
          Reset Password
        </Button>

        <Button onClick={backToLogin}>
          <BsArrowLeft size={16} style={{ marginRight: '7px' }} />
          Back to Login
        </Button>
      </Box>
    </>
  );
}
