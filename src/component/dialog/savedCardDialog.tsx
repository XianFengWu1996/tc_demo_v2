import { Button, Grid } from '@mui/material';
import { PaymentChoice } from '../checkout/payment/payment';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogSubTitle,
  CustomeDialogTitle,
} from './styles';

export const SaveCardDialog = (props: Dialog) => {
  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
      <CustomDialogContent>
        <CustomeDialogTitle>Saved Cards</CustomeDialogTitle>

        <CustomeDialogSubTitle>Select card for payment</CustomeDialogSubTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <PaymentChoice
              value={'inperson'}
              type="amex"
              selected={true}
              text={`•••• •••• •••• 3152`}
              subText={'exp: 11/25'}
              onClick={() => console.log('object')}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={6}>
            <PaymentChoice
              value={'inperson'}
              type="amex"
              selected={false}
              text={`•••• •••• •••• 3152`}
              subText={'exp: 11/25'}
              onClick={() => console.log('object')}
            />
          </Grid>
        </Grid>

        <Button variant="contained" fullWidth sx={{ mt: 2, mb: 0.5 }}>
          Place Order
        </Button>
        <Button fullWidth>Cancel</Button>
      </CustomDialogContent>
    </CustomDialog>
  );
};
