<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

const links = [
  {label: "Home", to: "/app"},
  {label: "My wallet", to: "/app/my-wallet"},
];

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

const payments = ref([
  {
    id: 1,
    name: "romainhamel",
    fullName: "Romainhamel",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Hamel&backgroundColor=7ed6df",
    amount: 1245,
    email: "romainhamel@gmail.com",
    date: "24 mars 2025"
  },
  {
    id: 2,
    name: "noook",
    fullName: "Noook",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Richter&backgroundColor=7ed6df",
    amount: 1245,
    email: "noookrichter@gmail.com",
    date: "24 mars 2025"
  },
])

</script>

<template>
  <div class="pt-20 min-h-screen">
    <UBreadcrumb :items="links"/>

    <div class="space-y-10 pt-8">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Mon solde</h1>
        <UButton
            icon="i-solar-add-circle-outline"
            size="xl"
            color="primary"
            variant="subtle"
            label="Recharger mon solde"
            class="rounded-full cursor-pointer transition-colors"
        />
      </div>

      <div class="mt-6 grid sm:grid-cols-2 gap-8">

        <UCard variant="outline"
               class="flex-shrink-0 relative overflow-hidden bg-orange-500 hover:shadow-lg  transition duration-500">
          <svg class="absolute bottom-0 left-0" viewBox="0 0 375 283" fill="none"
               style="transform: scale(1.5); opacity: 0.08;">
            <rect x="159.52" y="180" width="100" height="100" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
            <rect y="150" width="100" height="100" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
          </svg>
          <div class="relative pt-4  flex items-center justify-center">
            <div class="text-center text-white">
              <p class="text-md">Mon solde</p>
              <p class="text-xl sm:text-6xl font-bold">{{ formatCurrency(8675, 'XAF') }}</p>
            </div>
          </div>
        </UCard>

        <UCard variant="outline" class="hover:shadow-lg  transition duration-500">
          <div class="text-center pt-4">
            <p class="text-md">A venir dans les 30 prochains jours</p>
            <p class="text-xl sm:text-6xl font-bold">{{ formatCurrency(2490, 'XAF') }}</p>
          </div>
          <div class="flex items-center justify-center gap-4 pt-10 mb-4">
            <UButton color="primary" variant="outline"
                     size="xl"
                     icon="i-heroicons-clock"
                     class="rounded-full cursor-pointer">Details
            </UButton>
            <UButton
                icon="i-uil-file-alt"
                size="xl"
                color="neutral"
                variant="subtle"
                class="rounded-full  cursor-pointer"
            />
          </div>
        </UCard>
      </div>

      <!-- Historique des paiements -->
      <UCard variant="outline">
        <!-- Payment History Section -->
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold">Historique des paiements</h3>

          <!-- Month Navigation -->
          <div class="flex items-center justify-between space-x-10">
            <UButton
                icon="i-lucide-chevron-left"
                color="neutral"
                size="lg"
                variant="solid"
                class="cursor-pointer rounded-full transition-colors"
            />
            <span class="text-lg font-medium">Mars 2025</span>
            <UButton
                icon="i-lucide-chevron-right"
                color="neutral"
                size="lg"
                variant="subtle"
                class="cursor-pointer rounded-full transition-colors"
            />
          </div>
        </div>
        <div class="mt-6 space-y-4">
          <div v-for="payment in payments" :key="payment.id" class="grid grid-cols-6 items-center text-center">
            <USeparator class="col-span-6 mb-4 "/>
            <div class="flex items-center space-x-4">
              <UAvatar size="xl" :src="payment.avatar" alt="User Avatar"/>
              <span class="font-medium">{{ payment.name }}</span>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                 class="w-20 sm:w-24"
                 alt="Spotify"/>
            <div class="font-medium ">Payement reçu</div>
            <div class="font-medium text-primary-400">{{ formatCurrency(payment.amount, 'XAF') }}</div>
            <div class="">{{ payment.date }}</div>
            <div class="font-medium ">En attente</div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style scoped>

</style>