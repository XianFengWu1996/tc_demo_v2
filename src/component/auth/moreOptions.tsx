import { Box, Typography } from '@mui/material';
import Link from 'next/link';

export const MoreOptions = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
      }}
    >
      <Link href={'/auth/forgot_password'}>
        <Typography sx={{ fontSize: 13, color: 'blue', cursor: 'pointer' }}>
          Forgot Password?
        </Typography>
      </Link>
    </Box>
  );
};
