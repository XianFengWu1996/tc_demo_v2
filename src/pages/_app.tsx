import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { darkTheme, lightTheme } from '../functions/theme'
import { ThemeProvider } from '@mui/material'

function MyApp({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={darkTheme}>
    <Component {...pageProps} />
  </ThemeProvider>
}

export default MyApp
