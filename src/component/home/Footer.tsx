import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { FooterContainer } from './styles/styles';

export const Footer = () => {
  const date = new Date();
  return (
    <FooterContainer>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Link href={'/contact'}>Contact us</Link>
          <Typography>617-328-4188</Typography>
          <Typography>617-328-4288</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 5 }}>
          <Typography>Legal</Typography>
          <Link href={'/legal/privacy_policy'}>Privacy Policy</Link>
          <Link href={'/legal/terms_and_conditions'}>Terms and Conditions</Link>
        </Box>
      </Box>
      <Typography>
        Copyright © {date.getFullYear()} by Taipei Cuisine. All rights reserved.
      </Typography>
    </FooterContainer>
  );
};
