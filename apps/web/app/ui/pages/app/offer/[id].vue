<script setup lang="ts">
const {params} = useRoute();

const offerId = params.id as string;

const sharingId = '67b8e2fe0f001';

const links = [
  {label: "Home", to: "/app"},
  {label: "Offer", to: "/app/offer" + offerId},
];

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

const placeCount = ref(6)
const open = ref(false)

const users = ref([
  {
    id: 1,
    username: 'johndoe',
    profileUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Yvan&backgroundColor=7ed6df',
  },
  {
    id: 2,
    username: 'romainhamel',
    profileUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Hamel&backgroundColor=7ed6df',
  },
  {
    id: 3,
    username: 'noook',
    profileUrl: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Richter&backgroundColor=7ed6df',
  }
])

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

const reservedPlaces = ref<number[]>([])
const reservePlace = (index: number) => {
  if (!users.value[index] && !reservedPlaces.value.includes(index)) {
    reservedPlaces.value.push(index)
  }
  // close the drawer
  open.value = false
}

const unReservedPlace = (index: number) => {
  if (reservedPlaces.value.includes(index)) {
    reservedPlaces.value = reservedPlaces.value.filter((place) => place !== index)
  }
  // close the drawer
  open.value = false
}

const toast = useToast()

function showToast() {
  toast.add({
    // add emoji
    title: "l'invitation a été envoyée avec succès ! 🚀",
    color: 'info'
  })
  // close the drawer
  open.value = false
}

const tabs = ref([
  {
    label: 'Paiements',
    slot: 'payment',
  },
  {
    label: 'Factures',
    slot: 'bill',
  },
  {
    label: 'Co-abonnés',
    slot: 'subscribers',
  },
])

const moreOptions = [
  [{
    label: 'La charte du propriétaire',
    onSelect() {
    }
  }], [{
    label: 'Comment partager Spotify ?',
    onSelect() {
    }
  }], [{
    label: 'Besoin d\'aide ?',
    onSelect() {
    }
  }]
]
</script>

<template>
  <div class="pt-20">
    <UBreadcrumb :items="links"/>

    <div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto space-y-10 mb-10">

      <div class="flex items-center justify-between">
        <div></div>
        <div class="inline-flex justify-center items-center gap-2">
          <UButton
              icon="i-heroicons-magnifying-glass"
              size="lg"
              color="primary"
              :to="`/app/${sharingId}`"
              variant="subtle"
              label="Voir le partage"
              class="rounded-full cursor-pointer transition-colors"
          />
          <UDropdownMenu :items="moreOptions" :content="{ align: 'end' }" arrow>
            <UButton
                icon="i-heroicons-ellipsis-horizontal"
                size="lg"
                color="neutral"
                variant="subtle"
                class="rounded-full cursor-pointer"
            />
          </UDropdownMenu>

        </div>
      </div>

      <UCard variant="outline">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                 class="w-20 sm:w-35"
                 alt="Spotify"/>
            <UButton
                icon="i-uil-question"
                size="md"
                color="neutral"
                variant="solid"
                class="rounded-full cursor-pointer"
            />
          </div>
          <div class="inline-flex items-center gap-2">
            <div class="font-bold text-md">Prive</div>
            <USwitch/>
            <div class="text-md">Public</div>
          </div>
        </div>
      </UCard>

      <div class="grid sm:grid-cols-3 gap-8">
        <UCard variant="outline">
          <div class="text-center">
            <p class="text-lg font-bold">Spotify Famille</p>
            <p class="text-xl sm:text-4xl font-bold">{{ formatCurrency(4245, 'XAF') }}</p>
            <UButton
                variant="link"
                trailing
                color="neutral"
                icon="i-solar-pen-outline"
                class=" text-neutral-900 dark:text-white cursor-pointer transition-colors hover:text-primary-400"
            >
              Ajouter votre date de prélèvement
            </UButton>
          </div>
        </UCard>
        <UCard variant="outline">
          <div class="text-center">
            <p class="text-lg font-bold">Prix par personne</p>
            <p class="text-xl sm:text-4xl font-bold mb-1">
              {{ formatCurrency(1245, 'XAF') }}
            </p>
            <p class="text-sm font-semibold">/ par mois</p>
          </div>
        </UCard>
        <UCard variant="outline">
          <div class="text-center">
            <p class="text-lg font-bold">Nombre de Splitters</p>
            <p class="text-xl sm:text-4xl font-bold mb-1">
              <strong class="text-primary-400">3</strong>/<strong>6</strong>
            </p>
            <p class="text-sm font-semibold">Splitters</p>
          </div>
        </UCard>
      </div>

      <!-- Share Management -->
      <UCard variant="outline">
        <UCard variant="outline">
          <div class="text-center">
            <p>Vous ne réalisez pas encore d'économies sur votre abonnement Spotify Famille 🙁...</p>
            <p class="text-primary-400">Économiser jusqu'à {{ formatCurrency(3245, 'XAF') }}/mois en passant votre offre
              en public 🌎 !</p>
          </div>
        </UCard>

        <div class="flex items-center justify-center py-10 space-x-8">
          <div v-for="(n, index) in placeCount" :key="index">
            <!-- Taken Place -->
            <div v-if="users[index]" class="text-center space-y-2">
              <div class="size-20 bg-primary-400 rounded-full flex items-center justify-center">
                <img :src="users[index].profileUrl" alt="User Avatar" class="rounded-full"/>
              </div>

              <p class="font-medium">{{ users[index].username }}</p>
            </div>

            <!-- Reserved Place -->
            <div v-else-if="reservedPlaces.includes(index)" class="text-center space-y-2">
              <UDrawer v-model:open="open" :ui="{ content: 'sm:h-1/2 h-2/3 w-full' }">
                <button
                    class="hover:scale-105 duration-500 size-20 cursor-pointer bg-gray-400 rounded-full flex items-center justify-center">
                  <UIcon name="i-uil-lock" class="size-10 text-white"/>
                </button>
                <p class="font-medium">Réservé</p>

                <template #content>
                  <div class="flex items-end justify-end">
                    <UButton color="neutral" class="rounded-full cursor-pointer mr-4" size="xl" variant="subtle"
                             icon="i-heroicons-x-mark" @click="open = false"/>
                  </div>

                  <div class="sm:max-w-1/3 p-4 sm:p-0 mx-auto w-full text-center">
                    <h2 class="text-2xl font-bold pt-2">Libérer cette place ?</h2>
                    <div class="py-10">
                      <UButton color="primary" variant="outline"
                               size="xl"
                               @click="unReservedPlace(index)"
                               class="rounded-full cursor-pointer px-6" block>Confirmer
                      </UButton>
                    </div>
                  </div>

                </template>
              </UDrawer>
            </div>

            <!-- Free Place -->
            <div v-else class="text-center space-y-2">
              <UDrawer v-model:open="open" :ui="{ content: 'sm:h-1/2 h-2/3 w-full' }">
                <button
                    class="hover:scale-105 duration-500 size-20 cursor-pointer bg-primary-400 rounded-full flex items-center justify-center">
                  <UIcon name="i-uil-user-plus" class="size-10 text-white"/>
                </button>
                <p class="font-medium">Libre</p>

                <template #content>
                  <div class="flex items-end justify-end">
                    <UButton color="neutral" class="rounded-full cursor-pointer mr-4" size="xl" variant="subtle"
                             icon="i-heroicons-x-mark" @click="open = false"/>
                  </div>

                  <div class="sm:max-w-1/3 p-4 sm:p-0 mx-auto w-full text-center">
                    <h2 class="text-2xl font-bold pt-2">Que souhaitez-vous faire ?</h2>
                    <div class="flex items-center justify-center gap-4  py-10 mb-8">
                      <UButton color="primary" variant="outline"
                               size="xl"
                               @click="showToast"
                               class="rounded-full cursor-pointer px-6">Inviter
                      </UButton>
                      <UButton color="primary" variant="outline"
                               size="xl"
                               @click="reservePlace(index)"
                               class="rounded-full cursor-pointer">Réserver
                      </UButton>
                    </div>

                    <div class="relative z-20">
                      <UBadge color="neutral" :ui="{
                    base: 'absolute top-0 inset-x-0 -mt-3 w-20  mx-auto flex justify-center',
                  }" variant="outline" class="font-bold px-2 py-1 -mt-3 rounded-full">Facile !
                      </UBadge>

                      <UCard variant="outline">
                        <div class="py-2">
                          <div class="font-semibold">Inviter :</div>
                          <div class="text-sm">J'invite un proche à rejoindre mon abonnement sur Famsub.</div>
                        </div>
                        <div class="py-2">
                          <div class="font-semibold">Réserver :</div>
                          <div class="text-sm">Je réserve un emplacement pour un proche en dehors de ce partage.</div>
                        </div>
                      </UCard>
                    </div>
                  </div>

                </template>
              </UDrawer>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-4 mb-4">
          <UButton color="primary" variant="outline"
                   size="xl"
                   to="/app/messages"
                   leading-icon="i-solar-chat-dots-outline"
                   class="rounded-full transition-colors cursor-pointer">Contacter les co-abonnés
          </UButton>
          <UButton
              icon="i-uil-share"
              size="xl"
              color="neutral"
              @click="showToast"
              variant="subtle"
              class="rounded-full  cursor-pointer"
          />
        </div>
      </UCard>

      <!-- Payment, Bill, Subscribers -->
      <UTabs orientation="horizontal" variant="link" color="neutral" :items="tabs" class="gap-4 w-full">
        <template #payment>
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
              <div v-for="payment in payments" :key="payment.id" class="grid grid-cols-4 items-center text-center">
                <USeparator class="col-span-4 mb-4 "/>
                <div class="flex items-center space-x-4">
                  <UAvatar size="xl" :src="payment.avatar" alt="User Avatar"/>
                  <span class="font-medium">{{ payment.name }}</span>
                </div>
                <div class="font-medium">{{ formatCurrency(payment.amount, 'XAF') }}</div>
                <div class="">{{ payment.date }}</div>
                <div>À venir</div>
              </div>
            </div>
          </UCard>
        </template>

        <template #bill>
          <div class="flex items center justify-center h-48">
            <div class="text-center">
              <i class="i-heroicons-receipt text-9xl text-gray-300"></i>
              <h2 class="text-2xl font-semibold mt-4">Factures</h2>
              <p class="text-gray-500">Vous n'avez pas encore de facture</p>
            </div>
          </div>
        </template>

        <template #subscribers>
          <!-- List of Subscribers -->
          <UCard variant="outline">
            <h3 class="text-xl font-semibold py-1">Liste des co-abonnés sur Spotify Famille</h3>
            <div class="mt-6 space-y-4">
              <div v-for="payment in payments" :key="payment.id" class="grid grid-cols-3 items-center">
                <USeparator class="col-span-4 mb-4"/>
                <div class="flex items-center space-x-4">
                  <UAvatarGroup size="xl">
                    <UAvatar src="https://www.svgrepo.com/show/349511/spotify.svg" alt="User Avatar"/>
                    <UAvatar class="z-10" :src="payment.avatar" alt="User Avatar"/>
                  </UAvatarGroup>
                  <span class="font-medium">{{ payment.name }}</span>
                </div>
                <div class="flex flex-col items-start space-x-4">
                  <span class="font-bold">{{ payment.fullName }}</span>
                  <div class="font-medium">{{ payment.email }}</div>
                </div>
                <div class="w-full justify-end flex">
                  <UButton color="neutral" variant="outline" size="xl"
                           class="rounded-full w-min px-10 cursor-pointer transition-colors">
                    Modifier
                  </UButton>
                </div>

              </div>
            </div>
          </UCard>
        </template>
      </UTabs>

      <!-- Instant Acceptation -->
      <UCard variant="outline">
        <div class="text-center">
          <p class="text-lg font-bold">Acceptation Instantanée</p>
          <p class="text-md py-2">Activer l'acceptation instantanée permet aux co-abonnés de rejoindre directement votre
            partage.</p>
          <div class="inline-flex items-center gap-2">
            <div class="font-medium text-md">Non</div>
            <USwitch/>
            <div class="font-medium text-md">Oui</div>
          </div>
        </div>
      </UCard>

      <!-- Delete Share -->
      <UCard variant="outline">
        <div class="flex items-center justify-between">
          <p class="font-semibold">Supprimer mon partage</p>
          <UButton color="error" variant="outline"
                   size="lg"
                   class="rounded-full cursor-pointer transition-colors">Supprimer Spotify Famille
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>

<style scoped>

</style>