import { Button } from '@mui/material';
import Router from 'next/router';
import { useState } from 'react';
import { InPersonPayment } from '../../../functions/checkout';
import { handleCatchError } from '../../../functions/error';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { completeCartCheckout } from '../../../store/slicer/cartSlicer';
import { completeCheckout } from '../../../store/slicer/checkoutSlicer';
import { LoadingButton } from '../../button/loadingButton';
import { PaymentChoice } from '../../checkout/payment/payment';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogSubTitle,
  CustomeDialogTitle,
} from '../styles';

export const InPersonDialog = (props: Dialog) => {
  const cart = useAppSelector((state) => state.cart);
  const checkout = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmitOrder = async () => {
    try {
      setLoading(true);
      const result = await InPersonPayment(cart, checkout);

      if (result.status === 200) {
        Router.replace(`/checkout/complete/${result.data.orderId}`);

        dispatch(completeCheckout());
        dispatch(completeCartCheckout());
      }
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomDialog open={props.open} onClose={props.handleClose}>
      <CustomDialogContent>
        <CustomeDialogTitle>In Person</CustomeDialogTitle>

        <CustomeDialogSubTitle>Select choice</CustomeDialogSubTitle>
        <PaymentChoice
          type="cash"
          selected={true}
          text={`${
            cart.deliveryOption === 'delivery'
              ? 'Pay cash to driver'
              : 'Pay at store'
          }`}
        />

        <LoadingButton
          fullWidth
          text="Place Order"
          loading={loading}
          onClick={handleSubmitOrder}
        />

        <Button fullWidth onClick={props.handleClose}>
          Cancel
        </Button>
      </CustomDialogContent>
    </CustomDialog>
  );
};
