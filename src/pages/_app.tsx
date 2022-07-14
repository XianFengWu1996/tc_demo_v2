import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { darkTheme, lightTheme } from '../functions/theme'
import { ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from '../store/store'

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
}

export default MyApp
