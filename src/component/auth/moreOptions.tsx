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
      <Link href={'#'}>
        <Typography sx={{ fontSize: 13, color: 'blue' }}>
          Forgot Password?
        </Typography>
      </Link>
    </Box>
  );
};
