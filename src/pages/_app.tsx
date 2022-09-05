import type { AppProps } from 'next/app';
import { lightTheme } from '../functions/theme';
import '../styles/globals.css';
// import { darkTheme, lightTheme } from '../functions/theme';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { SnackbarUtilsConfigurator } from '../functions/utilities/snackbar';
import { store } from '../store/store';
// import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // const [isDark, setIsDark] = useState(false);
  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          {/* <ThemeProvider theme={isDark ? darkTheme : lightTheme}> */}
          {/* <Button onClick={() => setIsDark(!isDark)}>Toggle</Button> */}
          <SnackbarUtilsConfigurator />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  );
}

export default MyApp;
