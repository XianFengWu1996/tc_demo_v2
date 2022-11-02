import { Button } from '@mui/material';
import { PaymentElement } from '@stripe/react-stripe-js';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogTitle,
} from './styles';

export const NewCardDialog = (props: Dialog) => {
  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
      <CustomDialogContent>
        <CustomeDialogTitle>Pay with credit/debit card</CustomeDialogTitle>

        <PaymentElement />

        <Button variant="contained" fullWidth sx={{ mt: 2, mb: 0.5 }}>
          Place Order
        </Button>
        <Button fullWidth>Cancel</Button>
      </CustomDialogContent>
    </CustomDialog>
  );
};
