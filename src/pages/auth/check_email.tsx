import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { BsArrowLeft } from 'react-icons/bs';
import { AppBarNav } from '../../component/appbar/appbar';
import { CountDownButton } from '../../component/button/countDownButton';
import { backToLogin, sendResetPasswordLink } from '../../functions/auth';
import snackbar from '../../functions/utilities/snackbar';
import { KeyIconWithRoundBorders } from './forgot_password';

export default function CheckEmail() {
  const router = useRouter();
  const { email } = router.query;

  const onResendResetLink = async () => {
    await sendResetPasswordLink(email as string);
    snackbar.success('Email has been sent.');
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
              text="Resend"
              onClick={onResendResetLink}
              sx={{ color: 'secondary.main', fontSize: 10 }}
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
