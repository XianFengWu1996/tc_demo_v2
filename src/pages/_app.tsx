import 'nprogress/nprogress.css';
import '../styles/globals.css';
import '../styles/nprogress.css';
import '../styles/stripes.css';

import type { AppProps } from 'next/app';
import { lightTheme } from '../functions/theme';

// import { darkTheme, lightTheme } from '../functions/theme';
import { Alert, AlertTitle, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { SnackbarUtilsConfigurator } from '../functions/utilities/snackbar';
import { persistor, store } from '../store/store';

import NProgressSetUp from '../functions/utilities/nprogress';

import { Settings } from 'luxon';
import { useCallback, useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Footer } from '../component/home/Footer';
import { handleCatchError } from '../functions/error';
import { RequestStoreData } from '../functions/menu';
import { getCurrentTime } from '../functions/time';
import { useAppDispatch } from '../store/hook';
import { removeLunchDiscount } from '../store/slicer/cartSlicer';
import {
  disableLunch,
  retrieveStoreRelatedData,
} from '../store/slicer/storeSlicer';

NProgressSetUp();

// set the default zone for luxon
Settings.defaultZone = 'America/New_York';

function MyApp(props: AppProps) {
  // const [isDark, setIsDark] = useState(false);
  return (
    <SnackbarProvider
      maxSnack={3}
      style={{
        fontFamily: 'Montserrat',
        fontWeight: 600,
      }}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={lightTheme}>
            <App {...props} />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SnackbarProvider>
  );
}

export default MyApp;

const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();
  const getStoreData = useCallback(async () => {
    const storeResult = await RequestStoreData();
    dispatch(retrieveStoreRelatedData(storeResult.data as StoreAxiosResult));
  }, [dispatch]);

  useEffect(() => {
    getStoreData().catch((e) => {
      handleCatchError(e);
    });
  }, [getStoreData]);

  useEffect(() => {
    const interval = setInterval(() => {
      // if the currentTime is greater than the close time, remove the lunch discount
      if (Number(process.env.NEXT_PUBLIC_LUNCH_END) < getCurrentTime()) {
        dispatch(removeLunchDiscount());
        dispatch(disableLunch(true));
      } else {
        dispatch(disableLunch(false));
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <>
      <Alert severity="info">
        <AlertTitle>IMPORTANT</AlertTitle>
        This is a demo page, for testing purpose only
      </Alert>
      <SnackbarUtilsConfigurator />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};
