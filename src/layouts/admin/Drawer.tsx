import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

// css to jss: ALT + X
const CustomDrawer = styled(Drawer)<DrawerProps>(() => ({
  width: 255,
  top: 72,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    top: 72,
    width: 255,
    border: 'none',
  },
}));

export default CustomDrawer;
