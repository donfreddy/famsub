<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import type { User } from '../data/schema'
import type { PaginatedMeta } from '~/types/auth'

interface DataTablePaginationProps {
  table: Table<User>
  pagination: PaginatedMeta
  updatePage: (newPage: number) => void
  updatePageSize: (newPageSize: number) => void
}

const props = defineProps<DataTablePaginationProps>()

// Computed properties for enabling/disabling buttons
const canPreviousPage = computed(() => props.pagination.current_page > 1)
const canNextPage = computed(() => props.pagination.current_page < props.pagination.total_pages)

// Handle page change
function goToPage(pageIndex: number) {
  if (pageIndex >= 1 && pageIndex <= props.pagination.total_pages) {
    props.updatePage(pageIndex)
  }
}
</script>

<template>
  <div class="flex items-center justify-between px-2">
    <div class="flex-1 text-sm text-muted-foreground">
      {{ table.getFilteredSelectedRowModel().rows.length }} of
      {{ table.getFilteredRowModel().rows.length }} row(s) selected.
    </div>
    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">
          Rows per page
        </p>
        <Select
          @update:model-value="(value) => updatePageSize(Number(value))"
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${pagination.items_per_page}`" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [10, 20, 30, 40, 50]" :key="pageSize" :value="`${pageSize}`">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="w-[100px] flex items-center justify-center text-sm font-medium">
        Page {{ pagination.current_page }} of {{ pagination.total_pages }}
      </div>

      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!canPreviousPage"
          @click="goToPage(1)"
        >
          <span class="sr-only">Go to first page</span>
          <Icon name="i-radix-icons-double-arrow-left" class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!canPreviousPage"
          @click="goToPage(pagination.current_page - 1)"
        >
          <span class="sr-only">Go to previous page</span>
          <Icon name="i-radix-icons-chevron-left" class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!canNextPage"
          @click="goToPage(pagination.current_page + 1)"
        >
          <span class="sr-only">Go to next page</span>
          <Icon name="i-radix-icons-chevron-right" class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!canNextPage"
          @click="goToPage(pagination.total_pages)"
        >
          <span class="sr-only">Go to last page</span>
          <Icon name="i-radix-icons-double-arrow-right" class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
