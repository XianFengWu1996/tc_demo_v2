import { InputBase, styled, Typography } from '@mui/material';

export const AuthInputLabel = styled(Typography)(() => ({
  fontSize: 14,
  fontWeight: 600,
  textTransform: 'capitalize',
}));

export const AuthInputContainer = styled(InputBase)(() => ({
  backgroundColor: '#f59c9e47',
  padding: '10px 15px',
  marginBottom: '15px',
  borderRadius: '5px',
}));
