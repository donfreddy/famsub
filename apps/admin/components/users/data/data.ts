import { Icon } from '#components'
import { h } from 'vue'

type UserStatus = 'active' | 'inactive' | 'deactivated' | 'banned' | 'deleted' | 'suspended'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['disabled', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  ['banned', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  ['Deleted', 'bg-red-200/40 text-red-900 dark:text-red-100 border-red-300'],
  ['suspended', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
])


export const userStatuses = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'Suspended',
    value: 'suspended',
  },
  {
    label: 'deactivated',
    value: 'Deactivated',
  },
  {
    label: 'Banned',
    value: 'banned',
  },
  {
    label: 'Deleted',
    value: 'deleted',
  },
]

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'super_admin',
    icon: h(Icon, { name: 'i-tabler-shield' }),
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: h(Icon, { name: 'i-tabler-user-shield' }),
  },
  {
    label: 'User',
    value: 'user',
    icon: h(Icon, { name: 'i-tabler-user' }),
  },
]
