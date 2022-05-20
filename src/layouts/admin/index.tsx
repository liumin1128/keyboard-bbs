// import { ReactNode } from 'react';
// import Container from '@mui/material/Container';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Card from '@mui/material/Card';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import AppBar from '@mui/material/AppBar';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import UserInfoCard from '@/container/UserInfo/InfoCard';

import * as React from 'react';
import { IRoute } from 'umi';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import NavItems from '@/configs/nav';
import Drawer from './Drawer';
import ListItem from './ListItem';
import List from './List';
import AppBar from './Appbar';

const BaseLayout: React.FunctionComponent<IRoute> = (props) => {
  const { children, location, history } = props;

  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = React.useState(false);

  function navigateTo(path: string) {
    history.push(path);
    setOpen(false);
  }

  function comparePath(p1: string, p2: string, deep = 1) {
    return p1.split('/')[deep] === p2.split('/')[deep];
  }

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        paddingTop: '77px',
        // backgroundColor: '#F2F2F2',
      }}
    >
      <AppBar position="fixed" sx={{ zIndex: () => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {!isUpMd && (
            <IconButton
              onClick={() => {
                setOpen(!open);
              }}
              sx={{
                color: 'inherit',
              }}
              size="large"
            >
              {open ? <CloseIcon /> : <DehazeIcon />}
            </IconButton>
          )}

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5">hello</Typography>
          </Box>

          <MaterialUISwitch />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isUpMd ? 'permanent' : 'temporary'}
        open={isUpMd ? true : open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <Box py={2}>
          <List>
            {NavItems.map((nav) => (
              <ListItem
                key={nav.key}
                disablePadding
                selected={comparePath(location.pathname, nav.path)}
                onClick={() => navigateTo(nav.path)}
              >
                <ListItemButton>
                  <ListItemIcon>{nav.icon}</ListItemIcon>
                  <ListItemText primary={nav.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ p: 4, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseLayout;
