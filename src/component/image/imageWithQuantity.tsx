import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export const ImageWithQuantity = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        mx: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -5,
          right: -8,
          backgroundColor: '#fff',
          border: '1px solid #000',
          zIndex: 99,
          height: '17px',
          width: '17px',
          borderRadius: '1000px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography fontSize={10}>2</Typography>
      </Box>
      <Image
        src={
          'https://firebasestorage.googleapis.com/v0/b/taipeicuisine_menu/o/01d51550-05ff-4be9-808a-e36c4ac1b5a3.jpg?alt=media&token=f9da534b-18a6-4469-88fa-8aad359aa2c1'
        }
        alt={'Picture of the dish'}
        height={90}
        width={90}
        style={{
          borderRadius: '10px',
          backgroundColor: '#fff',
        }}
      />
    </Box>
  );
};
