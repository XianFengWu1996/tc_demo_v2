import { Box } from '@mui/material';
import { AppBarNav } from '../../modules/appbar/appbar';
import { CheckoutContent } from '../../modules/checkout';
import { CartDisplay } from '../../modules/checkout/cart';

export default function CheckoutPage() {
  return (
    <>
      <AppBarNav />

      <Box sx={{ display: 'flex' }}>
        <CheckoutContent />

        <CartDisplay />
      </Box>
    </>
  );
}
