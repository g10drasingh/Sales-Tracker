import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
    palette: {
        primary: {
            main: '#6750A4',
        },
        secondary: {
            main: '#E8DEF8',
        },
        background: {
            default: '#FFFBFE',
            paper: '#FFFBFE',
        },
        text: {
            primary: '#1C1B1F',
            secondary: '#49454F',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 700,
        },
        body1: {
            fontSize: '1rem',
        },
    },
});
