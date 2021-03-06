export default [
  // {
  //   path: '/login',
  //   component: '@/layouts/login',
  //   wrappers: [
  //     '@/wrappers/material-ui',
  //     '@/wrappers/apollo-provider',
  //     // '@/wrappers/auth',
  //   ],
  //   routes: [
  //     {
  //       path: '/login',
  //       component: '@/pages/login',
  //       title: 'Login',
  //       exact: true,
  //     },
  //     {
  //       path: '/login/oauth',
  //       component: '@/pages/login/oauth',
  //       title: 'oauth',
  //       exact: true,
  //     },
  //     {
  //       path: '/login/register',
  //       component: '@/pages/login/register',
  //       title: 'register',
  //       exact: true,
  //     },
  //   ],
  // },

  {
    path: '/',
    component: '@/layouts/base',
    wrappers: ['@/wrappers/material-ui'],
    routes: [
      {
        path: '/',
        wrappers: ['@/layouts/keyboard'],
        component: '@/pages/keyboard/select-color',
        title: 'Home',
        exact: true,
      },
    ],
  },
];
