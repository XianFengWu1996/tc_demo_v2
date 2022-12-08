import { Button, Checkbox, FormControlLabel } from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import Router from 'next/router';
import { ChangeEvent, useState } from 'react';
import { auth } from '../../../config/firebaseConfig';
import { newCardPayment, updateIntent } from '../../../functions/checkout';
import { handleCatchError } from '../../../functions/error';
import { checkStoreHours } from '../../../functions/payment';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import {
  completeCartCheckout,
  updateTip,
} from '../../../store/slicer/cartSlicer';
import { completeCheckout } from '../../../store/slicer/checkoutSlicer';
import { LoadingButton } from '../../button/loadingButton';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogTitle,
} from '../styles';
import { TipSelection } from './tipSelection';

export const NewCardDialog = (props: Dialog) => {
  const cart = useAppSelector((state) => state.cart);
  const store = useAppSelector((state) => state.store);
  const checkout = useAppSelector((state) => state.checkout);
  const dispatch = useAppDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSaveChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSave(e.target.checked);
  };

  const onSubmit = async () => {
    try {
      if (!stripe || !elements) return;

      if (!checkout.clientSecret) return;

      setLoading(true);
      // first, update the intent

      checkStoreHours(store.today);

      const intent = await stripe.retrievePaymentIntent(checkout.clientSecret);

      if (
        intent.paymentIntent?.status === 'requires_confirmation' ||
        intent.paymentIntent?.status === 'requires_payment_method'
      ) {
        await updateIntent(cart.summary.total, checkout.clientSecret, save);

        // second, confirm the payment
        const { error } = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
        });

        if (error) {
          if (
            error.type === 'card_error' ||
            error.type === 'validation_error'
          ) {
            return setMessage(error.message ?? 'An unexpected error occurred');
          } else {
            return setMessage('An unexpected error occurred.');
          }
        }
      }

      const result = await newCardPayment(cart, checkout);

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
    <CustomDialog
      open={props.open}
      onClose={() => {
        dispatch(updateTip(''));
        props.handleClose();
      }}
    >
      <CustomDialogContent>
        <CustomeDialogTitle>Pay with credit/debit card</CustomeDialogTitle>
        <PaymentElement
          options={{
            defaultValues: {
              billingDetails: {
                email: auth.currentUser?.email ? auth.currentUser.email : '',
                name: checkout.contact.name,
                phone: checkout.contact.phone,
              },
            },
          }}
        />

        <TipSelection />

        <FormControlLabel
          control={<Checkbox checked={save} onChange={handleSaveChange} />}
          label="Save for future use"
        />

        {message && <div id="payment-message">{message}</div>}

        <LoadingButton
          disabled={loading || !stripe || !elements}
          loading={loading}
          fullWidth
          onClick={onSubmit}
          text={`Place Order | $${cart.summary.total.toFixed(2)}`}
        />

        <Button fullWidth onClick={props.handleClose}>
          Cancel
        </Button>
      </CustomDialogContent>
    </CustomDialog>
  );
};
