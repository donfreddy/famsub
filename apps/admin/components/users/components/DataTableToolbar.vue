<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'

import type { User } from '../data/schema'
import { computed } from 'vue'
import DataTableFacetedFilter from '~/components/users/components/DataTableFacetedFilter.vue'
import DataTableViewOptions from '~/components/users/components/DataTableViewOptions.vue'
import { userStatuses, userTypes } from '~/components/users/data/data'

interface DataTableToolbarProps {
  table: Table<User>
  exportToCsv: () => void
  addNewUser: () => void
  onDelete: () => void
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
const isSelected = computed(() => props.table.getFilteredSelectedRowModel().rows.length > 0)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Filter users..."
        :model-value="(table.getColumn('username')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('username')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="userStatuses"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('role')"
        :column="table.getColumn('role')"
        title="Role"
        :options="userTypes"
      />

      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Icon name="i-radix-icons-cross-2" class="ml-2 h-4 w-4" />
      </Button>
    </div>

    <div class="flex items-center space-x-2">
      <Button
        v-if="isSelected"
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
        @click="onDelete"
      >
        <Icon name="i-uil-trash" class="mr-2 h-4 w-4" />
        Delete ({{ table.getFilteredSelectedRowModel().rows.length }})
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
        @click="addNewUser"
      >
        <Icon name="i-uil-plus" class="mr-2 h-4 w-4" />
        New User
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="ml-auto hidden h-8 lg:flex"
        @click="exportToCsv"
      >
        <Icon name="i-uil-export" class="mr-2 h-4 w-4" />
        Export
      </Button>
      <DataTableViewOptions :table="table" />
    </div>
  </div>
</template>
