<script setup lang="ts">
import {h, resolveComponent} from 'vue'
import type {TableColumn} from '@nuxt/ui'
import moment from 'moment';

definePageMeta({
  layout: 'account'
});


const UBadge = resolveComponent('UBadge')

type RecentDevice = {
  browser: string
  devices: string
  location: string
  recentActivity: string
}

const data = ref<RecentDevice[]>([
  {
    browser: 'Chrome on windows',
    devices: 'Iphone X',
    location: 'Douala, Cameroon',
    recentActivity: '2024-03-11T15:30:00',
  },
  {
    browser: 'Mozilla Firefox on ios',
    devices: 'Iphone XR',
    location: 'Douala, Cameroon',
    recentActivity: '2024-03-11T15:30:00',
  },
  {
    browser: 'Opera on windows',
    devices: 'Iphone XR',
    location: 'Douala, Cameroon',
    recentActivity: '2024-03-11T15:30:00',
  },
  {
    browser: 'Explorer on windows',
    devices: 'Iphone XR',
    location: 'Douala, Cameroon',
    recentActivity: '2024-02-11T20:30:00',
  },
  {
    browser: 'Safari on MacOS',
    devices: 'Imac',
    location: 'Yaounde, Cameroon',
    recentActivity: '2024-01-11T10:30:00',
  },
])

const columns: TableColumn<RecentDevice>[] = [
  {
    accessorKey: 'browser',
    header: 'Navigateur'
  },
  {
    accessorKey: 'devices',
    header: 'Appareils'
  },
  {
    accessorKey: 'location',
    header: 'Emplacement',
    cell: ({row}) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const
      }[row.getValue('location') as string]

      const isActiveDevice = row.original.devices == 'Iphone X'
      console.log(isActiveDevice)
      console.log(row.getValue('location') as string)

      if (isActiveDevice) {
        return h('div', {class: 'flex items-center gap-2'}, [
          h('div', {class: ''}, row.getValue('location')),
          h(UBadge, {class: '-mt-2', variant: 'outline', color: 'success', size: 'sm'}, () => 'Current')
        ])
      }
      return row.getValue('location')
    }
  },
  {
    accessorKey: 'recentActivity',
    header: 'Activité récente',
    cell: ({row}) => {
      return new Date(row.getValue('recentActivity')).toLocaleString('fr', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    }
  },
]

const passedDate = (value: string) => {
  moment.locale('fr');
  return moment(value, 'YYYYMMDD').fromNow();
};
</script>

<template>
  <div class="min-h-screen">
    <div class="justify-between flex items-center mb-8">
      <div class="">
        <h1 class="text-lg font-semibold">Appareils récents</h1>
        <div class="text-sm">Appareils qui se sont récemment connectés à votre compte</div>
      </div>
      <UButton
        color="error"
        variant="outline"
        icon="i-tabler-logout"
        class="">
        Se déconnecter de tous les appareils
      </UButton>
    </div>
    <UCard :ui="{'body':'p-0 sm:p-0'}">
      <UTable :data="data" :columns="columns" class="flex-1"/>
    </UCard>
  </div>
</template>
