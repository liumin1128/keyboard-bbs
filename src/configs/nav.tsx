import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';

export interface NavItem {
  key: string;
  title: string;
  icon?: React.ReactNode;
  path: string;
  subItems?: NavItem[];
}

const NavItems: NavItem[] = [
  {
    key: 'home',
    icon: <DashboardIcon />,
    // icon: <i className="ezze icon-dashboard" />,
    title: 'Home',
    path: '/',
  },
  // {
  //   key: 'order',
  //   // icon: <i className="ezze icon-file" />,
  //   icon: <DashboardIcon />,
  //   title: 'Orders',
  //   path: '/orders',
  // },
  // {
  //   key: 'live',
  //   // icon: <i className="ezze icon-video" />,
  //   icon: <DashboardIcon />,
  //   title: 'Liveshow',
  //   path: '/live',
  // },
  // {
  //   key: 'product',
  //   // icon: <i className="ezze icon-product" />,
  //   icon: <DashboardIcon />,
  //   title: 'Products',
  //   path: '/products',
  // },
  // {
  //   key: 'audience',
  //   // icon: <i className="ezze icon-user" />,
  //   icon: <DashboardIcon />,
  //   title: 'Audience',
  //   path: '/audience',
  // },
  // {
  //   key: 'commerce',
  //   // icon: <i className="ezze icon-chart" />,
  //   icon: <DashboardIcon />,
  //   title: 'Commerce',
  //   path: '/commerce',
  // },
  // {
  //   key: 'help',
  //   // icon: <i className="ezze icon-info" />,
  //   icon: <DashboardIcon />,
  //   title: 'Help',
  //   path: '/help',
  // },
];

export default NavItems;
