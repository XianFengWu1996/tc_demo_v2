import {
  Box,
  IconButton,
  styled,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppSelector } from '../../../store/hook';
import { CartDrawerActions } from './checkoutDrawerActions';
import { CartDrawerList } from './checkoutDrawerList';

interface ICartDrawerProps {
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const CartDrawer = (props: ICartDrawerProps) => {
  const { summary } = useAppSelector((state) => state.cart);

  const CartDrawerContainer = styled(Box)(({ theme }) => ({
    width: '500px',
    // height: cartState.cart.length < 4 ? '100%':'auto',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    zIndex: 9999,
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  }));

  const CartDrawerTitle = styled(Typography)(() => ({
    textAlign: 'center',
    margin: '30px 0',
    fontSize: '25px',
    fontWeight: 600,
  }));

  return (
    <SwipeableDrawer
      anchor="right"
      open={props.open}
      onClose={props.handleClose}
      onOpen={props.handleOpen}
    >
      <CartDrawerContainer>
        <CloseButton handleClose={props.handleClose} />

        <CartDrawerTitle>Cart</CartDrawerTitle>

        {summary.discount.lunch > 0 && (
          <Box
            sx={{
              fontSize: 12,
              fontWeight: 600,
              backgroundColor: '#41c0f3',
              margin: '0 15px',
              borderRadius: '5px',
              padding: 2,
              color: '#fff',
            }}
          >
            Lunch discount has been applied
          </Box>
        )}

        <CartDrawerList />

        <CartDrawerActions />
      </CartDrawerContainer>
    </SwipeableDrawer>
  );
};

interface ICloseButton {
  handleClose: () => void;
}

const CloseButton = (props: ICloseButton) => {
  return (
    <IconButton
      sx={{ position: 'absolute', top: 30, left: 10, color: '#000' }}
      onClick={props.handleClose}
    >
      <AiOutlineClose />
    </IconButton>
  );
};
