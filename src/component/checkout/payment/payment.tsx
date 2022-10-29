import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { BsCreditCard } from 'react-icons/bs';
import { RiAlipayLine, RiWechatPayLine } from 'react-icons/ri';
import { SiApplepay } from 'react-icons/si';
import { CheckoutNavigationButton } from '../../button/checkoutButton';
import { CreditCardDialog } from '../../dialog/creditCardDialog.tsx/creditCardDialog';

export const Payment = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '30px',
        p: 4,
        mt: 5,
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 600, mb: 2 }}>
        Payment
      </Typography>

      <CheckoutNavigationButton
        onClick={handleOpen}
        title="Pay with credit card"
        icon={<BsCreditCard size={22} />}
      />

      <CheckoutNavigationButton
        title="Apple pay"
        icon={<SiApplepay size={22} />}
      />

      <CheckoutNavigationButton
        title="Alipay"
        icon={<RiAlipayLine size={22} color="#0e9dec" />}
      />

      <CheckoutNavigationButton
        title="Wechat Pay"
        icon={<RiWechatPayLine size={22} color="#7BB32E" />}
      />

      <CreditCardDialog open={open} handleClose={handleClose} />
    </Box>
  );
};
