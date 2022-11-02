import { Button } from '@mui/material';
import { useAppSelector } from '../../store/hook';
import { PaymentChoice } from '../checkout/payment/payment';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogSubTitle,
  CustomeDialogTitle,
} from './styles';

export const InPersonDialog = (props: Dialog) => {
  const { delivery_option } = useAppSelector((state) => state.cart);
  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
      <CustomDialogContent>
        <CustomeDialogTitle>In Person</CustomeDialogTitle>

        <CustomeDialogSubTitle>Select choice</CustomeDialogSubTitle>
        <PaymentChoice
          type="cash"
          selected={true}
          text={`${
            delivery_option === 'delivery'
              ? 'Pay cash to driver'
              : 'Pay at store'
          }`}
        />

        <Button variant="contained" fullWidth sx={{ mt: 2, mb: 0.5 }}>
          Place Order
        </Button>
        <Button fullWidth>Cancel</Button>
      </CustomDialogContent>
    </CustomDialog>
  );
};
