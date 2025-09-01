<script setup lang="ts">
import ServiceCardSkeleton from '~~/components/smart/ServiceCardSkeleton.vue';

const { useServicesForMarketplace } = useService();
const { useCategories } = useCategory();

const { data: services, isLoading: servicesLoading, error: serviceError } = useServicesForMarketplace();
const { data: categories, isLoading: categoriesLoading } = useCategories();

const selectedCategory = ref<number | null>(null);
const searchQuery = ref<string>('');

const searchServices = (servicesList: any[]) => {
  if (!searchQuery.value.trim()) return servicesList;

  const query = searchQuery.value.toLowerCase().trim();
  return servicesList.filter(service => {
    const nameMatch = service.name?.toLowerCase().includes(query);
    const categoryMatch = service.category?.name?.toLowerCase().includes(query);

    return nameMatch || categoryMatch;
  });
};

const filteredServices = (categoryId: number) => {
  if (!services.value) return [];
  const categoryServices = services.value.filter(service => service.category?.id === categoryId);
  return searchServices(categoryServices);
};

const getServicesForDisplay = () => {
  if (!services.value) return [];

  let list = services.value;
  if (selectedCategory.value !== null) {
    list = list.filter(service => service.category?.id === selectedCategory.value);
  }
  return searchServices(list);
};

const getCategoriesToDisplay = () => {
  if (!categories.value) return [];

  if (selectedCategory.value === null) {
    if (searchQuery.value.trim()) {
      return categories.value.filter(category => {
        const categoryServices = filteredServices(category.id);
        return categoryServices.length > 0;
      });
    }
    return categories.value;
  } else {
    const selectedCat = categories.value.find(cat => cat.id === selectedCategory.value);
    if (selectedCat && filteredServices(selectedCat.id).length > 0) {
      return [selectedCat];
    }
    return [];
  }
};

const clearSearch = () => {
  searchQuery.value = '';
};

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value;
};

const selectCategory = (categoryId: number | null) => {
  selectedCategory.value = categoryId;
};

const links = [
  { label: "Home", to: "/app" },
  { label: "Explore", to: "/app/marketplace" },
];

const items = ref([
  {
    label: 'Cameroun',
    value: 'cm',
    avatar: {
      src: '/img/cameroon-flag.png',
      alt: 'cameroun'
    }
  },
  {
    label: 'Gabon',
    value: 'ga',
    avatar: {
      src: '/img/gabon-flag.png',
      alt: 'gabon'
    }
  },
  {
    label: 'Nigeria',
    value: 'ng',
    avatar: {
      src: '/img/nigeria-flag.png',
      alt: 'nigeria'
    }
  },
  {
    label: 'Senegal',
    value: 'ab',
    avatar: {
      src: '/img/senegal-flag.png',
      alt: 'senegal'
    }
  },
  {
    label: "Cote d'ivoire",
    value: 'aa',
    avatar: {
      src: '/img/cote-d-ivoire-flag.png',
      alt: 'cote-d-ivoire'
    }
  },
])
const value = ref(items.value[0]?.value)
const avatar = computed(() => items.value.find(item => item.value === value.value)?.avatar)
</script>

<template>
  <div class="pt-20">
    <UBreadcrumb :items="links" />

    <div class="text-center py-12">
      <div v-if="categoriesLoading" class="text-center py-10">
        <USkeleton class="h-28 w-[800px] mx-auto" />
      </div>
      <div v-else>
        <h2 class="text-4xl font-bold mb-4">Share Subscriptions, Save Money</h2>
        <p class="text-xl  mb-8 max-w-2xl mx-auto">
          Join others to split the cost of your favorite subscriptions. Safe, secure, and simple.
        </p>

        <!-- Search Bar -->
        <div class="max-w-md mx-auto mb-6">
          <UInput class="w-full" :model-value="searchQuery" @input="handleSearchInput" icon="i-lucide-search" size="lg"
            variant="outline" placeholder="Search...">
            <template v-if="searchQuery" #trailing>
              <UButton color="neutral" variant="link" size="sm" icon="i-lucide-x" aria-label="Clear search"
                :aria-pressed="clearSearch" aria-controls="shearch" @click="clearSearch" />
            </template>
          </UInput>
        </div>

        <div class="flex justify-center mb-8">
          <USelect v-model="value" :items="items" selected-icon="i-lucide-map-pin-check-inside" value-key="value"
            :avatar="avatar" class="w-48" />
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-2 mb-8 justify-center">
          <!-- All Categories Button -->
          <UBadge class="cursor-pointer px-6 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
            :variant="selectedCategory === null ? 'solid' : 'outline'" @click="selectCategory(null)">
            All
          </UBadge>

          <!-- Individual Category Buttons -->
          <UBadge v-for="category in categories" :key="category.id"
            class="cursor-pointer px-6 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
            :variant="selectedCategory === category.id ? 'solid' : 'outline'" @click="selectCategory(category.id)">
            {{ category.name }}
          </UBadge>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="servicesLoading" class="text-center">
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10">
        <ServiceCardSkeleton v-for="n in 8" :key="n" />
      </div>
    </div>

    <!-- Services Grid -->
    <div v-else class="text-center py-1">
      <!-- No results message -->
      <div v-if="searchQuery && getServicesForDisplay().length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <UIcon name="i-lucide-search-x" class="w-16 h-16 mx-auto" />
        </div>
        <h3 class="text-lg font-medium mb-2">🤔 Aucun résultat trouvé</h3>
        <p class="mb-4">
          N'hésitez pas à nous suggérer un nouveau service.
        </p>
      </div>

      <!-- Show all services when "All" is selected -->
      <div v-else-if="selectedCategory === null && !searchQuery">
        <div v-for="category in getCategoriesToDisplay()" :key="category.id" class="py-4">
          <div v-if="filteredServices(category.id).length > 0">
            <div class="flex items-center justify-between mb-4">
              <h1 class="text-xl font-bold">
                {{ category.mkp_name }}
              </h1>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <SmartServiceCard v-for="service in filteredServices(category.id)" :key="service.id" :service="service" />
            </div>
          </div>
        </div>
      </div>

      <!-- Show services for selected category or search -->
      <div v-else>
        <div v-if="searchQuery && getServicesForDisplay().length > 0" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SmartServiceCard v-for="service in getServicesForDisplay()" :key="service.id" :service="service" />
        </div>

        <div v-else v-for="category in getCategoriesToDisplay()" :key="category.id" class="py-6">
          <div v-if="filteredServices(category.id).length > 0" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SmartServiceCard v-for="service in filteredServices(category.id)" :key="service.id" :service="service" />
          </div>

          <div v-else-if="!searchQuery" class="text-center py-8 text-gray-500">
            No services found in this category.
          </div>
        </div>
      </div>

      <!--
      <div class="col-span-full text-center py-12">
        <div class="text-lg font-medium mb-2">No subscriptions available in {{ items[0]?.label }}</div>
        <p class="text-muted-foreground">Try selecting a different country or check back later.</p>
      </div>
      -->

      <!-- Show create offer or suggest service buttons -->
      <div class="space-x-4 py-16">
        <UButton label="Proposer un abonnement" trailing color="primary" variant="outline" size="xl" to=""
          class="font-medium border-1.5 border-primary-500 text-black dark:text-white rounded-full px-5 py-2.5 hover:bg-primary-500" />

        <UButton label="Suggérer un service" trailing color="primary" variant="outline" size="xl" to=""
          class="font-medium border-1.5 border-primary-500 text-black dark:text-white rounded-full  px-5 py-2.5 hover:bg-primary-500" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
