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
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MaterialUISwitch from '@/components/MaterialUISwitch';
import AppBar from './Appbar';

const BaseLayout: React.FunctionComponent<IRoute> = (props) => {
  const { children } = props;

  const theme = useTheme();
  const isUpMd = useMediaQuery(theme.breakpoints.up('md'));

  const [open, setOpen] = React.useState(false);

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
            <Typography variant="h5">选色工具demo</Typography>
          </Box>

          <MaterialUISwitch />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default BaseLayout;
