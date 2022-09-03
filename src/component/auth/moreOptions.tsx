import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import Link from 'next/link';

export const MoreOptions = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <FormControlLabel
        control={<Checkbox defaultChecked size="small" />}
        label={<Typography sx={{ fontSize: 15 }}>Remember Me</Typography>}
      />

      <Link href={'#'}>
        <Typography sx={{ fontSize: 13, color: 'blue' }}>
          Forgot Password?
        </Typography>
      </Link>
    </Box>
  );
};
