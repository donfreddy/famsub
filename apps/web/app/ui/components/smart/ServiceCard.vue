<script setup lang="ts">
import type { MarketplaceService } from '@/app/core/entities';
import { formatCurrency } from '@/app/shared/utils/utils-helper';

defineProps<{
  service: MarketplaceService;
}>();
</script>

<template>
  <ULink as="div" :to="`/app/marketplace/list/${service.slug}`"
    class="text-default hover:scale-105  transition-all duration-500">
    <UCard class="text-center overflow-hidden rounded-xl shadow-md cursor-pointer" :ui="{ 'body': 'p-0 sm:p-0' }">
      <div class="p-1.5" :style="{ backgroundColor: service.background_color || '#b1060f' }">
      </div>
      <div class="p-4">
        <h2 class="text-2xl font-bold py-8">{{ service.name }}</h2>
        <div class="py-4 flex flex-col">
          <span class="text-xs font-medium">À partir de</span>
          <span class="font-bold text-3xl">{{ formatCurrency(service.offers.starting_price, service.offers.currency)
            }}</span>
          <span class="text-xs font-medium">/mois</span>
        </div>
      </div>
    </UCard>
  </ULink>
</template>