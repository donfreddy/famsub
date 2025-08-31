<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'

import type {User} from '../data/schema'
import type {PaginatedMeta} from '~/types/auth'
import {valueUpdater} from '@/lib/utils'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import {Loader2} from 'lucide-vue-next'
import DataTablePagination from '~/components/users/components/DataTablePagination.vue'
import DataTableToolbar from '~/components/users/components/DataTableToolbar.vue'

interface DataTableProps {
  columns: ColumnDef<User, any>[]
  data: User[]
  meta: PaginatedMeta
  updatePage: (newPage: number) => void
  updatePageSize: (newPageSize: number) => void
  exportToCsv: () => void
  addNewUser: () => void
  onDelete: () => void
  isLoading: boolean
}

const props = defineProps<DataTableProps>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  get meta() {
    return props.meta
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
  enableRowSelection: true,
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  manualPagination: true, // Pagination controlled by backend
  pageCount: props.meta?.total_pages || 1, // Total pages from API response
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
})

// Sync pagination changes with backend
watch(
    () => props.meta.current_page,
    (newPage) => {
      table.setPageIndex(newPage - 1) // TanStack Table uses 0-based index
    },
)
</script>

<template>
  <div class="space-y-4">
    <DataTableToolbar
        :table="table"
        :export-to-csv="exportToCsv"
        :add-new-user="addNewUser"
        :on-delete="onDelete"
    />
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table?.getHeaderGroups?.() || []"
                    :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                          :props="header.getContext()"/>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="h-10">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else-if="isLoading">
            <TableCell
                :colspan="columns.length"
                class="h-24 text-center"
            >
              <Loader2 v-if="isLoading" class="h-10 w-10 animate-spin text-primary"/>
            </TableCell>
          </TableRow>

          <TableRow v-else>
            <TableCell
                :colspan="columns.length"
                class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination
        :table="table"
        :pagination="meta"
        :update-page="updatePage"
        :update-page-size="updatePageSize"
    />
  </div>
</template>
