import AppBar, { AppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

// css to jss: ALT + X
const CustomAppBar = styled(AppBar)<AppBarProps>(() => ({
  // backgroundColor: '#ffffff',
  // background: `linear-gradient(270deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%);`,
  // 'linear-gradient(270deg, rgba(199, 236, 233, 1) 0%, rgba(154, 132, 230, 1) 100%);',
  // backgroundImage: 'linear-gradient(90deg, rgba(255, 241, 0, 0.4) 21.12%, rgba(255, 241, 0, 0.2) 51.77%, #64E8DE 130.8%);',
  boxShadow: 'none',
  height: 72,
  // color: '#000000',
  '& .MuiToolbar-root': {
    height: '100%',
  },
}));

export default CustomAppBar;
