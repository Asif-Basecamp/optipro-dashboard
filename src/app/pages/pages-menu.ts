import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Demo Links',
    icon: 'nb-shuffle',
    children: [
      {
        title: 'Link 1',
        link: '',
      },
      {
        title: 'Link 2',
        link: '',
      },
      {
        title: 'Link 3',
        link: '',
      },
      {
        title: 'Link 4',
        // link: '/auth/reset-password',
        link: '',
      },
    ],
  },
];
