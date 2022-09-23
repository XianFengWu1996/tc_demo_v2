import { Box, styled, Typography } from '@mui/material';

export const Title = styled(Typography)(() => ({
  fontSize: 20,
  fontWeight: 600,
  marginBottom: '16px',
}));

export const AddressContainer = styled(Box)(() => ({
  backgroundColor: '#fff',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '30px',
  padding: '32px',
}));

export const TimeFrameContainer = styled(Box)<TimeFrameContainerStyledProps>(
  ({ isSelected }) => ({
    border: `2.5px solid ${isSelected ? 'green' : '#000'}`,
    color: isSelected ? 'green' : '#000',
    display: 'inline-block',
    borderRadius: '15px',
    padding: '16px 20px',
    height: '75px',
    '&:first-child': {
      marginRight: '16px',
      marginLeft: '50px',
    },
  })
);

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
