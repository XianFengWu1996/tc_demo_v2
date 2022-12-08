import { Box, Card, IconButton, Typography } from '@mui/material';
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

export const SocialLoginIconContainer = styled(IconButton)(() => ({
  borderRadius: '15px',
  width: '50px',
  height: '50px',
  bgcolor: '#f59c9e47',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const AuthContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 75,
}));

// ========================================
//        NOTIFICATION CARD
// ========================================

export const EmailVerifyCard = styled(Card)(() => ({
  marginBottom: 20,
  marginTop: -50,
  padding: '10px',
  backgroundColor: '#50d07d',
}));
