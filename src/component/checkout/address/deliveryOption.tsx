import { Box } from '@mui/material';
import { DeliveryButton, PickupButton } from '../../button/checkoutButton';

interface IDeliveryOptionProps {
  deliveryOption: DeliveryOptionType;
  updateDeliveryOption: (arg: DeliveryOptionType) => void;
}

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
          onClick={() => props.updateDeliveryOption('delivery')}
          type={props.deliveryOption}
        />

        <PickupButton
          onClick={() => props.updateDeliveryOption('pickup')}
          type={props.deliveryOption}
        />
      </Box>
    </Box>
  );
};
