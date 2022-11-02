import { Box, Typography } from '@mui/material';

interface DeliveryAdditionalInfoProps {
  label: string;
  value: string;
}
export const DeliveryAdditionalInfo = (props: DeliveryAdditionalInfoProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography fontSize={12} fontWeight={600} textTransform={'capitalize'}>
        {props.label}
      </Typography>

      <Typography fontSize={12} fontWeight={600} textTransform={'capitalize'}>
        {props.value}
      </Typography>
    </Box>
  );
};
