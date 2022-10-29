import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { setDeliveryOption } from '../../../store/slicer/cartSlicer';
import { DeliveryButton, PickupButton } from '../../button/checkoutButton';

export const DeliveryOption = () => {
  const dispatch = useAppDispatch();
  const { delivery_option } = useAppSelector((state) => state.cart);
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
          }}
          type={delivery_option}
        />

        <PickupButton
          onClick={() => {
            dispatch(setDeliveryOption('pickup'));
          }}
          type={delivery_option}
        />
      </Box>
    </Box>
  );
};
