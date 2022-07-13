import { createTheme, ThemeOptions } from "@mui/material/styles";
import { blue, green } from "@mui/material/colors";

export const lightTheme:ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#fcfcfc',
            contrastText: '#fff'
        },
        secondary: {
            main: blue[300],
            contrastText: '#fff'
        }
    },
});

export const darkTheme:ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        background: {
            paper: green[200],
        },
        primary: {
            main: '#ff0000', //red 
            dark: green[200],
            contrastText: '#fff'
        },
        secondary: {
            main: '#D65A31',
            contrastText: '#fff'
        }
    },
});
