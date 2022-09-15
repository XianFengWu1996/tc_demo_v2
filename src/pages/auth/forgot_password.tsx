import { Box, Button, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { TbKey } from 'react-icons/tb';
import isEmail from 'validator/lib/isEmail';
import { AppBarNav } from '../../component/appbar/appbar';
import { EmailInput } from '../../component/input/authInput';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const onSendResetLink = () => {
    setEmailError('');

    if (isEmpty(email) || !isEmail(email)) {
      setEmailError('Please enter a valid email');
    }
  };

  const backToLogin = () => {
    Router.push('/auth/signin');
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
          Forgot Password?
        </Typography>
        <Typography sx={{ my: 1, fontSize: 12, textAlign: 'center' }}>
          No worries, we will send you reset instruction
        </Typography>

        <EmailInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          error={emailError}
        />
        <Button variant="contained" sx={{ my: 1 }} onClick={onSendResetLink}>
          Send Link
        </Button>

        <Button onClick={backToLogin}>
          <BsArrowLeft size={16} style={{ marginRight: '7px' }} />
          Back to Login
        </Button>
      </Box>
    </>
  );
}
export const KeyIconWithRoundBorders = () => {
  return (
    <Box
      sx={{
        height: '60px',
        width: '60px',
        bgcolor: 'rgba(243,132,134, 0.18)',
        p: '5px',
        borderRadius: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        marginTop: '50px',
        marginBottom: '20px',
      }}
    >
      <Box
        sx={{
          height: '45px',
          width: '45px',
          bgcolor: 'rgba(243,132,134, 0.21)',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TbKey size={25} />
      </Box>
    </Box>
  );
};
