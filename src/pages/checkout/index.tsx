import { Box } from '@mui/material';
import { AppBarNav } from '../../component/appbar/appbar';
import { CheckoutContent } from '../../component/checkout';
import { CartDisplay } from '../../component/checkout/cart';

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
