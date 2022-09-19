import { Box, Button, Typography } from '@mui/material';
import { BsArrowLeft } from 'react-icons/bs';
import { AppBarNav } from '../../component/appbar/appbar';
import { backToLogin } from '../../functions/auth';
import { CheckIconWithRoundBorders } from './forgot_password';

export default function ResetSuccess() {
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
        <CheckIconWithRoundBorders />

        <Typography sx={{ fontSize: 25, textAlign: 'center', my: 1 }}>
          Password Reset
        </Typography>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 14, textAlign: 'center', mb: 2 }}>
            Your password has been successfully reset, click the button to
            return to login page
          </Typography>
        </div>

        <Button onClick={backToLogin}>
          <BsArrowLeft size={16} style={{ marginRight: '7px' }} />
          Back to Login
        </Button>
      </Box>
    </>
  );
}
