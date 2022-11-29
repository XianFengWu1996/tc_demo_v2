import { Box } from '@mui/material';
import { MoonLoader } from 'react-spinners';

export const AccLoading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <MoonLoader size={40} />
    </Box>
  );
};
