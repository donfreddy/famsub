<script setup lang="ts">
import type {LayoutKey} from "#build/types/layouts";
import type {MiddlewareKey} from "#build/types/middleware";

definePageMeta({
  layout: 'empty' as LayoutKey,
  middleware: 'guest' as MiddlewareKey,
})

const {params} = useRoute();
const {isAuthenticated} = useAuthStore();

const textBtn = isAuthenticated ? 'Retour au compte' : 'Je me connecte';
const textBtn2 = isAuthenticated ? 'Gérer' : 'Rejoindre';

const sharingId = params.id as string;

const offer = ref({
  id: 1,
  title: 'Spotify Premium',
  description: 'De la musique en illimité pour vous et jusqu\'à cinq personnes vivant sous votre toit. Chacun peut désormais écouter sa propre musique, avec la possibilité de conserver les playlists.',
  price: 1245,
  currency: 'XAF',
  placeCount: 5,
  remainingPlaces: 3,
  isPublic: false,
  owner: {
    id: 1,
    username: 'donfreddy',
    profileUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Yvan&backgroundColor=7ed6df',
  },
  service: {
    id: 1,
    name: 'Spotify',
    price: 4245,
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
  },
  splitters: [
    {
      id: 1,
      username: 'romainh',
      profileUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Hamel&backgroundColor=7ed6df',
    },
    {
      id: 2,
      username: 'noook',
      profileUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Richter&backgroundColor=7ed6df',
    }
  ]
})

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Panel -->
    <div class="w-5/12 p-8 flex flex-col items-center">
      <div class="self-start">
        <ULink to="/" class="inline-flex items-center">
          <svg class="w-6 text-primary-400" viewBox="0 0 24 24" stroke-linejoin="round" stroke-width="2"
               stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" fill="none">
            <rect x="3" y="1" width="7" height="12"></rect>
            <rect x="3" y="17" width="7" height="6"></rect>
            <rect x="14" y="1" width="7" height="6"></rect>
            <rect x="14" y="11" width="7" height="12"></rect>
          </svg>
          <span class="ml-2 text-xl text-primary-400 font-bold tracking-wide">Famsub
          </span>
        </ULink>
      </div>

      <div class="flex flex-col items-center mt-48 max-w-xl space-y-6">
        <img :src="offer.owner.profileUrl" alt="User Profile" class="w-24 h-24 rounded-full object-cover"/>

        <h1 class="text-4xl font-bold text-primary-400 text-center">Rejoins mon Split !</h1>

        <p class="text-center">
          {{ offer.owner.username }} te propose de partager le prix de son abonnement. Il ne reste que
          {{ offer.remainingPlaces }} places, ne perds pas de temps !
        </p>

        <div class="flex justify-center gap-6 w-full">
          <div v-for="(n, index) in offer.placeCount" :key="index">
            <!-- Taken Place -->
            <div v-if="offer.splitters[index]" class="text-center space-y-2">
              <div class="size-12 bg-primary-400 rounded-full flex items-center justify-center">
                <img :src="offer.splitters[index].profileUrl" alt="User Avatar" class="rounded-full"/>
              </div>
              <p class="font-semibold text-xs">{{ offer.splitters[index].username }}</p>
            </div>

            <!-- Free Place -->
            <div v-else class="text-center space-y-2">
              <div
                  class="bg-primary-400 size-12  rounded-full flex items-center justify-center">
                <UIcon name="i-uil-user" class="size-6 text-white"/>
              </div>
              <p class="font-semibold text-xs">Libre</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="w-7/12 bg-orange-400 p-8 flex flex-col">
      <div class="self-end">
        <UButton color="neutral" variant="solid"
                 size="xl"
                 :label="textBtn"
                 :to="isAuthenticated ? '/app' : '/login'"
                 class="rounded-full cursor-pointer px-4 transition-colors"/>
      </div>

      <!-- Offer Card -->
      <UCard class="w-full max-w-4xl mt-20 mx-auto">
        <div class="flex justify-center py-6">
          <img :src="offer.service.logoUrl" alt="Spotify Logo" class="h-14"/>
        </div>

        <h2 class="text-2xl font-bold text-center mb-4">{{ offer.title }}</h2>

        <p class="text-center font-medium mb-8">
          {{ offer.description }}
        </p>

        <div class="flex justify-center">
          <div class="text-center">
            <div class="text-5xl font-bold">
                <span class="text-primary-400 tracking-wide">
                  {{ formatCurrency(offer.price, offer.currency) }}
                </span>
              <sup class="text-3xl">/ par mois</sup>
            </div>
            <div class="mt-6 font-medium">
              Au lieu de {{ formatCurrency(offer.service.price, offer.currency) }}<sup class="text-xs">/ mois</sup>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-6">
          <UButton color="primary" variant="solid"
                   size="xl"
                   :label="textBtn2"
                   to="/app/offer/7d22fd01-d23a-4001-9a77-92dc90202474"
                   class="rounded-full cursor-pointer px-4 transition-colors"/>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style scoped>

</style>