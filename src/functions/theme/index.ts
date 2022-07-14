import { createTheme, ThemeOptions } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";

export const lightTheme:ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        background: {
            paper: '#ecf2ff',
            default: '#fcfcfc'
        },
        primary: {
            main: '#262626',
        },
        secondary: {
            main: '#EA464D',
            contrastText: '#262626'
        }, 
    },
    typography: {
        fontFamily: [
            'Montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    }
});

export const darkTheme:ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: '#262626',
            default: '#fff'
        },
        primary: {
            main: '#262626', 
        },
        secondary: {
            main: '#f1b8b4',
        },
        text: {
            primary: '#fff',
        }
    },
    typography: {
        fontFamily: [
            'Montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
    }
});
