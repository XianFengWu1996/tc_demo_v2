import { Box, Button, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import { useState } from 'react';
import { BsArrowLeft, BsCheck2Circle } from 'react-icons/bs';
import { TbKey } from 'react-icons/tb';
import isEmail from 'validator/lib/isEmail';
import { AppBarNav } from '../../component/appbar/appbar';
import { LoadingButton } from '../../component/button/loadingButton';
import { EmailInput } from '../../component/input/authInput';
import { backToLogin, sendResetPasswordLink } from '../../functions/auth';
import { handleCatchError } from '../../functions/error';

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const onSendResetLink = async () => {
    setEmailError('');

    if (isEmpty(email) || !isEmail(email)) {
      return setEmailError('Please enter a valid email');
    }

    try {
      setLoading(true);
      const result = await sendResetPasswordLink(email);

      if (result.status === 200) {
        Router.push(`/auth/check_email?email=${email}`);
      }
    } catch (error) {
      setLoading(false);
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

        <LoadingButton
          fullWidth
          onClick={onSendResetLink}
          loading={loading}
          text="Send Link"
        />

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

export const CheckIconWithRoundBorders = () => {
  return (
    <Box
      sx={{
        height: '60px',
        width: '60px',
        bgcolor: 'rgba(76, 209, 71, 0.15)',
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
          bgcolor: 'rgba(76, 209, 71, 0.17)',
          borderRadius: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BsCheck2Circle size={25} color={'rgba(76, 209, 71, 0.7)'} />
      </Box>
    </Box>
  );
};
