import type { AppProps } from 'next/app';
import { lightTheme } from '../functions/theme';
import '../styles/globals.css';
// import { darkTheme, lightTheme } from '../functions/theme';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from '../store/store';
// import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // const [isDark, setIsDark] = useState(false);
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        {/* <ThemeProvider theme={isDark ? darkTheme : lightTheme}> */}
        {/* <Button onClick={() => setIsDark(!isDark)}>Toggle</Button> */}
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
