import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setDeliveryOption } from '../../../store/slicer/cartSlicer';
import { resetTimeFrame } from '../../../store/slicer/checkoutSlicer';
import { DeliveryButton, PickupButton } from '../../button/checkoutButton';

export const DeliveryOption = () => {
  const dispatch = useAppDispatch();
  const { deliveryOption } = useAppSelector((state) => state.cart);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          border: '1px solid #bbb',
          display: 'flex',
          width: '300px',
          borderRadius: '30px',
          marginTop: '10px',
        }}
      >
        <DeliveryButton
          onClick={() => {
            dispatch(setDeliveryOption('delivery'));
            dispatch(resetTimeFrame());
          }}
          type={deliveryOption}
        />

        <PickupButton
          onClick={() => {
            dispatch(setDeliveryOption('pickup'));
            dispatch(resetTimeFrame());
          }}
          type={deliveryOption}
        />
      </Box>
    </Box>
  );
};
