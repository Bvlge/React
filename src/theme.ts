import { createTheme } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A31621',      // Madder
    },
    secondary: {
      main: '#00524B',      // Dark Green
    },
    background: {
      default: '#FCF7F8',   // Snow
    },
    text: {
      primary: '#FCF7F8',   // Snow
      secondary: '#00524B', // Dark Green
    },
  },

  // Tipografia:
  typography: {
    
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      color: '#7b1c3a',     // vermelho Vinho
    },
  },

});

export default theme;
