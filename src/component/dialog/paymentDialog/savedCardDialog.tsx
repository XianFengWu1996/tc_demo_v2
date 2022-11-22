import { Button, Grid } from '@mui/material';
import Router from 'next/router';
import { useState } from 'react';
import { saveCardPayment } from '../../../functions/checkout';
import { handleCatchError } from '../../../functions/error';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { completeCartCheckout } from '../../../store/slicer/cartSlicer';
import { completeCheckout } from '../../../store/slicer/checkoutSlicer';
import { LoadingButton } from '../../button/loadingButton';
import { PaymentChoice } from '../../checkout/payment/payment';
import { PaymentIconType } from '../../icon/creditCard';
import {
  CustomDialog,
  CustomDialogContent,
  CustomeDialogSubTitle,
  CustomeDialogTitle,
} from '../styles';
import { TipSelection } from './tipSelection';

export const SaveCardDialog = (props: Dialog) => {
  const checkout = useAppSelector((state) => state.checkout);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [select, setSelect] = useState<Card | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCardChange = (val: string | undefined) => {
    if (!val) return;

    const selectedCard = checkout.cards.find((card) => {
      return card.id === val;
    });

    if (!selectedCard) return;

    setSelect(selectedCard);
  };

  const handleSubmit = async () => {
    try {
      if (!select) return;
      setLoading(true);

      const result = await saveCardPayment(cart, checkout, select);

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
        <CustomeDialogTitle>Saved Cards</CustomeDialogTitle>

        <CustomeDialogSubTitle>Select card for payment</CustomeDialogSubTitle>
        <Grid
          container
          spacing={2}
          sx={{ maxHeight: '400px', overflow: 'auto', my: 0.5 }}
        >
          {checkout.cards.map((data) => {
            const card = data.card;
            return (
              <Grid key={data.id} item xs={12} sm={6} md={6} lg={6}>
                <PaymentChoice
                  value={data.id}
                  type={card.brand as PaymentIconType}
                  selected={select?.id === data.id}
                  text={`${
                    card.brand === 'amex' ? '•••• •••••• •' : '•••• •••• ••••'
                  } ${card.last4}`}
                  subText={`exp: ${card.expMonth}/${card.expYear}`}
                  onClick={handleCardChange}
                />
              </Grid>
            );
          })}
        </Grid>

        <TipSelection />

        <LoadingButton
          disabled={loading}
          loading={loading}
          fullWidth
          onClick={handleSubmit}
          text={`Place Order | $${cart.summary.total.toFixed(2)}`}
        />
        <Button fullWidth onClick={props.handleClose}>
          Cancel
        </Button>
      </CustomDialogContent>
    </CustomDialog>
  );
};
