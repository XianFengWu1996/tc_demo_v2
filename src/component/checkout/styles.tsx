import { Grid, Paper, styled } from '@mui/material';

export const CheckoutGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100vh',

  [theme.breakpoints.down('md')]: {
    minHeight: 0,
  },
}));

export const AddressPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '15px',
  marginTop: '40px',

  [theme.breakpoints.down('md')]: {
    marginTop: '0px',
  },
}));

export const PaymentPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '15px',
  marginTop: '40px',

  [theme.breakpoints.down('md')]: {
    minHeight: 0,
  },
}));
