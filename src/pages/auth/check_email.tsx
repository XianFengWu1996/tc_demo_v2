import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { AppBarNav } from '../../component/appbar/appbar';
import { CountDownButton } from '../../component/button/countDownButton';
import { backToLogin, sendResetPasswordLink } from '../../functions/auth';
import { handleCatchError } from '../../functions/error';
import snackbar from '../../functions/utilities/snackbar';
import { KeyIconWithRoundBorders } from './forgot_password';

export default function CheckEmail() {
  const router = useRouter();
  const { email } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  const onResendResetLink = async () => {
    try {
      setLoading(true); // start loading

      await sendResetPasswordLink(email as string);

      snackbar.success('Email has been sent.');
      setLoading(false);
      // if successful, start the timer
      setStartTimer(true);
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
          Check your email
        </Typography>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 14 }}>
            We sent a password reset link to
          </Typography>
          <Typography sx={{ fontSize: 13 }}>{email}</Typography>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginTop: '5px',
            }}
          >
            <Typography sx={{ fontSize: 11 }}>
              Didnt receive the email?
            </Typography>

            <CountDownButton
              startTimer={startTimer}
              setStartTimer={setStartTimer}
              text="Resend"
              onClick={onResendResetLink}
              sx={{ color: 'secondary.main', fontSize: 10 }}
              loading={loading}
            />
          </div>
        </div>

        <Button onClick={backToLogin}>
          <BsArrowLeft size={16} style={{ marginRight: '7px' }} />
          Back to Login
        </Button>
      </Box>
    </>
  );
}
