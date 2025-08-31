import type { NavMenu } from '~/types/nav'

export const navMenu: NavMenu[] = [
  {
    heading: 'General',
    items: [
      {
        title: 'Home',
        icon: 'i-lucide-home',
        link: '/',
      },
      /* {
        title: 'Email',
        icon: 'i-lucide-mail',
        link: '/email',
      }, */
      {
        title: 'Users',
        icon: 'i-lucide-user',
        link: '/users',
      },
      {
        title: 'Services',
        icon: 'i-lucide-cog',
        link: '/services',
        new: true,
      },
      /* {
        title: 'Transactions',
        icon: 'i-lucide-credit-card',
        link: '/transactions',
        new: true,
      }, */
      /* {
        title: 'Tasks',
        icon: 'i-lucide-calendar-check-2',
        link: '/tasks',
        new: true,
      }, */
    ],
  },
  {
    heading: 'Other',
    items: [
      {
        title: 'Settings',
        icon: 'i-lucide-settings',
        children: [
          {
            title: 'Profile',
            icon: 'i-lucide-circle',
            link: '/settings/profile',
          },
          {
            title: 'Account',
            icon: 'i-lucide-circle',
            link: '/settings/account',
          },
          {
            title: 'Appearance',
            icon: 'i-lucide-circle',
            link: '/settings/appearance',
          },
          {
            title: 'Notifications',
            icon: 'i-lucide-circle',
            link: '/settings/notifications',
          },
          {
            title: 'Display',
            icon: 'i-lucide-circle',
            link: '/settings/display',
          },
        ],
      },
      {
        title: 'Help & Support',
        icon: 'i-lucide-circle-help',
        link: '/support',
      },
      {
        title: 'Feedback',
        icon: 'i-lucide-send',
        link: '/feedback',
      },
    ],
  },
]
