import { createTheme, ThemeOptions } from "@mui/material/styles";

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
            main: '#f38486',
            contrastText: '#fff'
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
            default: '#e3d8cd'
        },
        text: {
            primary: '#000',
        },
        primary: {
            main: '#e3d8cd', 
            contrastText: '#000'
        },
        secondary: {
            main: '#262626',
            contrastText: '#fff'
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
