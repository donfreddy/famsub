<script setup lang="ts">
import type {MiddlewareKey} from '#build/types/middleware'
import type {PaginatedMeta} from '~/types/auth'
import {definePageMeta} from '#imports'
import {useToast} from '~/components/ui/toast/use-toast'
import {columns} from '~/components/users/components/columns'
import DataTable from '~/components/users/components/DataTable.vue'
import {useUsers} from '~/components/users/composable/useUsers'

definePageMeta({
  middleware: 'auth' as MiddlewareKey,
})

const {toast} = useToast()

// Pagination State
const currentPage = ref(1)
const pageSize = ref(10)

const {data, isLoading, refetch, isRefetching} = useUsers(currentPage, pageSize)

onMounted(() => {
  // Ceci s'exécute seulement côté client
  console.log('Client only:', data.value)

  // Tu peux aussi refetch ici si besoin
  if (!data.value) {
    refetch()
  }
})

const users = computed(() => data.value?.data?.items || [])
const paginatedMeta = computed(() => data.value?.data?.meta as PaginatedMeta)

// Update page and refetch
function updatePage(newPage: number) {
  currentPage.value = newPage
  refetch()
}

// Update page size and reset to first page
function updatePageSize(newSize: number) {
  pageSize.value = newSize
  currentPage.value = 1
  refetch()
}

function exportUsersToCSV() {
  exportToCSV(users.value, 'users.csv')
}
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-4">
    <div class="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Users
        </h2>
        <p class="text-muted-foreground">
          Here&apos;s a list of all the users in your system!
        </p>
      </div>
      <!--      <DateRangePicker /> -->
    </div>
      <DataTable
          :data="users"
          :meta="paginatedMeta"
          :columns="columns"
          :is-loading="isLoading || isRefetching"
          :update-page="updatePage"
          :update-page-size="updatePageSize"
          :export-to-csv="exportUsersToCSV"
          :add-new-user="
        () => {
          toast({
            title: 'Add new user clicked',
          });
        }
      " :on-delete="
        () => {
          toast({
            title: 'Delete clicked',
          });
        }"
      />
  </div>
</template>

<style scoped>

</style>
