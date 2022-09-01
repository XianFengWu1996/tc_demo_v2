import { Button } from '@mui/material';
import Router from 'next/router';

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { clearCart } from '../../../store/slicer/cartSlicer';
// import { PulseLoader } from "react-spinners";
// import { clearCart } from "../../../store/slice/cartSlice";
// import { useAppDispatch, useAppSelector } from "../../../store/store";

export const CartDrawerActions = () => {
  // const [loading, setLoading] = useState<boolean>(false);

  const cartState = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //     return () => {
  //         setLoading(false);
  //     }
  // }, [])

  return (
    <div
      style={{
        width: 'inherit',
        backgroundColor: '#fcfcfc',
        borderTop: '1px solid #00000015',
        height: '80px',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Button
        variant="contained"
        sx={{ minWidth: '170px' }}
        onClick={() => {
          Router.push('/checkout');
        }}
      >
        Checkout | ${cartState.cartSummary.subtotal.toFixed(2)}
      </Button>

      <Button
        variant="outlined"
        sx={{ minWidth: '170px', mx: 1 }}
        onClick={() => {
          dispatch(clearCart());
        }}
      >
        Clear Cart
      </Button>
    </div>
  );
};
