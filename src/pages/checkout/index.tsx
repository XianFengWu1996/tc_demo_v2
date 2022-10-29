import { onAuthStateChanged } from '@firebase/auth';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { CartContent } from '../../component/checkout/cartContent';
import { LoadingScreen } from '../../component/checkout/loadingScreen';
import { CheckoutLogoDisplay } from '../../component/checkout/logoDisplay';
import { CartSummary } from '../../component/checkout/summary/cartSummary';
import { auth } from '../../config/firebaseConfig';
import { getUserData } from '../../functions/checkout';
import { handleCatchError } from '../../functions/error';
import { useAppDispatch } from '../../store/hook';
import {
  setDeliveryOption,
  updateDeliveryFee,
} from '../../store/slicer/cartSlicer';
import { setCheckout } from '../../store/slicer/checkoutSlicer';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // get customer info
  useEffect(() => {
    try {
      onAuthStateChanged(auth, async (fbUser) => {
        const token = await fbUser?.getIdToken();
        // get the user information
        const user = (await (await getUserData(token)).data.user) as UserResult;

        dispatch(setCheckout(user));
        dispatch(updateDeliveryFee(user.address.details?.delivery_fee));
        dispatch(setDeliveryOption('delivery'));
      });
    } catch (error) {
      handleCatchError(error);
    }
  }, []);

  return (
    <>
      <CheckoutLogoDisplay />
      {isOpen ? (
        <LoadingScreen setIsOpen={setIsOpen} />
      ) : (
        <Grid container>
          <CartContent />

          <CartSummary />
        </Grid>
      )}
    </>
  );
}
