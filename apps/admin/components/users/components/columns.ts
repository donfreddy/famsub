import type { ColumnDef } from '@tanstack/vue-table'

import type { User, UserStatus } from '../data/schema'
import { Checkbox } from '@/components/ui/checkbox'
import { h } from 'vue'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import DataTableColumnHeader from '~/components/users/components/DataTableColumnHeader.vue'
import DataTableRowActions from '~/components/users/components/DataTableRowActions.vue'
import { callTypes, userTypes } from '~/components/users/data/data'

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'translate-y-0.5',
    }),
    cell: ({ row }) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
      'class': 'translate-y-0.5',
    }),
    enableSorting: false,
    enableHiding: false,
  },
   {
    accessorKey: 'id',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'ID' }),
    cell: ({ row }) => h('div', { class: 'w-20' }, `${row.getValue('id')}`),
    enableSorting: false,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'User' }),
    cell: ({ row }) => {
      const fullName = `${row.original.first_name} ${row.original.last_name}`
      return h('div', { class: 'inline-flex items-center' }, [
        h(Avatar, { class: 'h-7 w-7' }, [
          h(AvatarImage, { src: row.original.avatar, alt: fullName }),
          h(AvatarFallback, null, `${row.original.first_name[0]}${row.original.last_name[0]}`),
        ]),
        h('div', { class: 'ml-2' }, fullName),
      ])
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Username' }),
    cell: ({ row }) => row.getValue('username'),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Email' }),
    cell: ({ row }) => row.getValue('email'),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),

    cell: ({ row }) => {
      const status = row.getValue('status') as UserStatus

      return h(Badge, { class: callTypes.get(status), variant: 'outline' }, () => status)
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Role' }),

    cell: ({ row }) => {
      const userType = userTypes.find(userType => userType.value === row.getValue('role'))

      if (!userType)
        return null

      return h('div', { class: 'flex items-center' }, [
        userType.icon && h(userType.icon, { class: 'mr-2 h-4 w-4 text-muted-foreground' }),
        h('span', {}, userType.label),
      ])
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Join Date' }),
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'))

      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
]
