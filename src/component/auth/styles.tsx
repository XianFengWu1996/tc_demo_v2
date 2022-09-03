import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// ========================================
//         SOCIAL LOGIN
// ========================================
export const SocialLoginTitle = styled(Typography)(() => ({
  fontSize: 25,
}));

export const SocialLoginIconGroup = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '200px',
  my: 3,
}));

export const SocialLoginIconContainer = styled(Box)(() => ({
  borderRadius: '3px',
  width: '50px',
  height: '50px',
  bgcolor: '#f59c9e47',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
