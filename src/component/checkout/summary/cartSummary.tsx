import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../store/hook';
import { CheckoutGrid } from '../styles';
import { BackToMenu } from './backToMenu';
import { CartDisplay } from './cartDisplay';
import { DiscountDisplay } from './discountDisplay';

export const CartSummary = () => {
  const { summary, delivery_option } = useAppSelector((state) => state.cart);

  return (
    <CheckoutGrid
      item
      xs={12}
      sm={12}
      md={4}
      sx={{
        bgcolor: 'rgba(200,200,200, 0.2)',
      }}
    >
      <Box
        sx={{
          width: '85%',
          mt: 5,
        }}
      >
        <BackToMenu />

        <CartDisplay />

        <DiscountDisplay />

        <Box mt={2}>
          {summary.discount.redemption > 0 && (
            <CartSummaryDiscountItem
              label="Point Redemption"
              amount={summary.discount.redemption}
            />
          )}
          {summary.discount.lunch > 0 && (
            <CartSummaryDiscountItem
              label="Lunch Discount"
              amount={summary.discount.lunch}
            />
          )}

          <CartSummaryItem label="subtotal" amount={summary.subtotal} />
          <CartSummaryItem label="tax" amount={summary.tax} />
          <CartSummaryItem label="tip" amount={summary.tip} />
          {delivery_option === 'delivery' && (
            <CartSummaryItem
              label="delivery fee"
              amount={summary.delivery_fee}
            />
          )}
          <CartSummaryItem label="total" amount={summary.total} />
        </Box>
      </Box>
    </CheckoutGrid>
  );
};

interface CartSummaryItem {
  label: string;
  amount: number;
}
const CartSummaryItem = (props: CartSummaryItem) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography
        sx={{ fontWeight: 600, fontSize: 14, textTransform: 'capitalize' }}
      >
        {props.label}:
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
        ${props.amount.toFixed(2)}
      </Typography>
    </Box>
  );
};

const CartSummaryDiscountItem = (props: CartSummaryItem) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography
        sx={{ fontWeight: 600, fontSize: 14, textTransform: 'capitalize' }}
      >
        {props.label}:
      </Typography>
      <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'green' }}>
        (-${props.amount.toFixed(2)})
      </Typography>
    </Box>
  );
};
