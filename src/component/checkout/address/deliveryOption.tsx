import { Box } from '@mui/material';
import { DeliveryButton, PickupButton } from '../../../pages/checkout';

export const DeliveryOption = (props: IDeliveryOptionProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          border: '1px solid #bbb',
          display: 'flex',
          width: '300px',
          borderRadius: '30px',
        }}
      >
        <DeliveryButton
          onClick={() => props.setDeliveryOption('delivery')}
          type={props.deliveryOption}
        />

        <PickupButton
          onClick={() => props.setDeliveryOption('pickup')}
          type={props.deliveryOption}
        />
      </Box>
    </Box>
  );
};
