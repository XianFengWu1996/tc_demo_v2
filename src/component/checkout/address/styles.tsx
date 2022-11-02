import { Box, styled, Typography } from '@mui/material';

export const Title = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 600,
  marginBottom: '20px',
}));

export const SelectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'start',
  },
}));

export const TimeFrameContainer = styled(Box)(({ theme }) => ({
  border: `2.5px solid #000`,
  color: '#000',
  display: 'inline-block',
  borderRadius: '15px',
  padding: '16px 20px',
  height: '75px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: 'rgba(200,200,200,0.3)',
  },
  ':first-of-type': {
    marginRight: '16px',
    marginLeft: '50px',
  },

  [theme.breakpoints.down('sm')]: {
    ':first-of-type': {
      marginLeft: '0px',
    },
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%',
  },
}));

export const TimeFrameCard = styled(Box)(() => ({
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'space-between',
}));

export const TimeFrameCardTitle = styled(Typography)(() => ({
  fontSize: 13,
  fontWeight: 600,
  paddingRight: '40px',
}));

export const TimeFrameCardSubtitle = styled(Typography)(() => ({
  fontSize: 11,
  fontWeight: 500,
}));
