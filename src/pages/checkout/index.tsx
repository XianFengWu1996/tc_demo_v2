import { onAuthStateChanged } from '@firebase/auth';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
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

  const [isOpen, setIsOpen] = useState<boolean>(false); // check for store hours

  const isMediumScreen = useMediaQuery('(max-width:899px)');

  // check for data loading status
  const [loading, setLoading] = useState(false);
  const [dataError, setDataError] = useState(false);

  const refreshPage = () => {
    Router.reload();
  };

  // get customer info
  useEffect(() => {
    onAuthStateChanged(auth, async (fbUser) => {
      try {
        setLoading(true);

        if (!fbUser) {
          return Router.push(`/auth/signin?redirect=/checkout`);
        }

        const token = await fbUser?.getIdToken();
        // get the user information
        const result = (await (
          await getUserData(token)
        ).data) as CheckoutResult;

        dispatch(setCheckout(result));
        dispatch(
          updateDeliveryFee(result.user.address?.details?.deliveryFee ?? 0)
        );
        dispatch(setDeliveryOption('delivery'));
        setLoading(false);
      } catch (error) {
        handleCatchError(error);
        setDataError(true);
        setLoading(false);
      }
    });
  }, [dispatch]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
      }}
    >
      <CheckoutLogoDisplay />
      {!isOpen ? (
        <LoadingScreen setIsOpen={setIsOpen} />
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          {loading && <MoonLoader />}
          {dataError && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography>
                Error has occurred, please refresh the page
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={refreshPage}>
                Refresh
              </Button>
            </div>
          )}
          {!loading && !dataError && (
            <Grid container>
              {isMediumScreen && <CartSummary />}

              <CartContent />

              {!isMediumScreen && <CartSummary />}
            </Grid>
          )}
        </div>
      )}
    </Box>
  );
}
