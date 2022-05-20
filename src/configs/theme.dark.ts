import { createTheme } from '@mui/material/styles';
// import common from './theme.common';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1f1f1f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: '#000',
    },
    mode: 'dark',
    background: {
      // default: 'hsl(225deg 9.5238095238% 8.2352941176%)',
      // paper: 'hsl(222.8571428571deg 13.7254901961% 20%)',
    },
    grey: {
      '500': 'rgba(255,255,255,0.5)',
    },
    autoColor: {
      '100': 'rgba(255,255,255,0.1)',
      '200': 'rgba(255,255,255,0.2)',
      '300': 'rgba(255,255,255,0.3)',
      '400': 'rgba(255,255,255,0.4)',
      '500': 'rgba(255,255,255,0.5)',
      '600': 'rgba(255,255,255,0.6)',
      '700': 'rgba(255,255,255,0.7)',
      '800': 'rgba(255,255,255,0.8)',
      '900': 'rgba(255,255,255,0.9)',
      '000': 'rgba(255,255,255,1)',
    },
  },
  shape: {
    borderRadius: 10,
  },
});

const nextTheme = createTheme(theme, {
  components: {
    MuiPaper: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            border: '1px solid #1e4976',
            '&[href]': {
              textDecorationLine: 'none',
            },
          },
        },
      ],
    },

    MuiTypography: {
      defaultProps: {
        color: 'inherit',
      },
    },

    MuiIconButton: {
      variants: [
        {
          props: { variant: 'secondary' },
          style: {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.light,
            borderRadius: '10px',
          },
        },
      ],
    },
  },
});

export default nextTheme;
