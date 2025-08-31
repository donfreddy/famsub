<script setup lang="ts">
const { params } = useRoute();
const serviceSlug = params.service as string;

const { useOffersByService } = useOffer();

const { data: offers, isLoading: offersLoading } = useOffersByService(serviceSlug);

//const service = computed(() => offers.value?.data.items[0]?.service)

const open = ref(false)

const serviceName = serviceSlug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const links = [
  { label: "Home", to: "/app" },
  { label: "Explore", to: "/app/marketplace" },
  { label: serviceName, to: "/app/marketplace/list/" + serviceSlug }
];

// Fonction pour formater la monnaie
const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('fr', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value,);
};



// Fonction pour calculer les valeurs du cercle de confiance
const getCircleData = (trustScore: number) => {
  const radius = 45; // Rayon du cercle
  const circumference = 2 * Math.PI * radius; // Périmètre du cercle
  const strokeDashOffset = circumference * (1 - trustScore / 100);

  const circleColor =
    trustScore < 30 ? "#ef4444" : trustScore < 70 ? "#f59e0b" : "#10b981"; // Rouge, Orange, Vert

  return { circumference, strokeDashOffset, circleColor };
};

const getMembershipAge = (joinDateStr: string) => {
  const joinDate = new Date(joinDateStr);
  const now = new Date();
  const diffInMonths = (now.getFullYear() - joinDate.getFullYear()) * 12 + (now.getMonth() - joinDate.getMonth());

  if (diffInMonths < 1) return 'Nouveau';
  if (diffInMonths < 12) return `${diffInMonths} mois`;

  const years = Math.floor(diffInMonths / 12);
  return years === 1 ? '1 an' : `${years} ans`;
};

const page = ref(1)
const itemsPerPage = 7;
const users = [
  {
    name: "Yvan",
    image: "https://via.placeholder.com/64", // Replace with actual image
    trustScore: 100,
    verified: true,
    price: 1245,
    created_add: "2025-02-15"
  },
  {
    name: "Quentin",
    image: "https://via.placeholder.com/64",
    trustScore: 65,
    verified: false,
    price: 1519,
    created_add: "2024-11-15"
  },
  {
    name: "Louis",
    image: "https://via.placeholder.com/64",
    trustScore: 28,
    verified: false,
    price: 1000,
    created_add: "2024-08-15"
  },
  {
    name: "Yvan",
    image: "https://via.placeholder.com/64", // Replace with actual image
    trustScore: 100,
    verified: true,
    price: 1245,
    created_add: "2024-10-15"
  },
  {
    name: "Quentin",
    image: "https://via.placeholder.com/64",
    trustScore: 65,
    verified: false,
    price: 1519,
    created_add: "2024-12-15"
  },
  {
    name: "Louis",
    image: "https://via.placeholder.com/64",
    trustScore: 28,
    verified: false,
    price: 1000,
    created_add: "2025-02-15"
  }
]

// Liste des questions et réponses
const faqs = ref([
  {
    label: "Pourquoi les prix des abonnements Spotify peuvent-ils être différents ?",
    content:
      "La différence de prix entre les abonnements Spotify s'explique par le type d'offre choisie par le propriétaire. L'offre Spotify Duo permet de diviser le coût entre 2 places, tandis que l'offre Spotify Famille le divise entre 6 places. Le contenu de l'abonnement est parfaitement identique."
  },
  {
    label: "Est-ce légal de partager mon abonnement Spotify ?",
    content:
      "Chez Famsub, nous prenons la légalité au sérieux ! Nous respectons scrupuleusement les règles et les conditions des plateformes. Vous pouvez donc partager vos abonnements en toute tranquillité ! 😊"
  },
  {
    label: "Est-ce que c'est facile de se co-abonner ?",
    content:
      "Sur Famsub, se co-abonner est simple et intuitif. Très accessible, notre plateforme vous guide pas à pas, rendant l'expérience facile et agréable. Notre service client est également là pour vous aider."

  },
  {
    label: "Puis-je me désabonner à tout moment ?",
    content:
      "Le partage sur Famsub est sans engagement. Lorsque vous avez rejoint un abonnement en tant que co-abonné, vous pouvez vous en désabonner à tout moment."
  }
]);
</script>

<template>
  <div class=" pt-20">
    <UBreadcrumb :items="links" />

    <div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <div class="py-10">

        <div class="flex items-center justify-between">
          <div></div>
          <h1 class="text-4xl font-bold mb-4">{{ serviceName }}</h1>
          <div class="inline-flex justify-center items-center gap-2">
            <UButton icon="i-heroicons-link" size="lg" color="neutral" variant="subtle"
              class="rounded-full  cursor-pointer" />
            <UButton icon="i-heroicons-question-mark-circle" size="lg" color="neutral" variant="subtle"
              class="rounded-full cursor-pointer" />
          </div>
        </div>
        <div></div>


        <p class="max-w-2xl mx-auto text-center py-2">{{ serviceName }}</p>
      </div>

      <div class="grid grid-cols-8 gap-10 sm:grid-cols-10">

        <div class="col-span-3 hidden sm:block">
          <UCard variant="outline">
            <div class="flex flex-col">
              <div class="space-y-4">
                <div class="">
                  <div class=" mb-2 flex justify-between items-center">
                    <h5 class="text-sm font-bold inline-flex justify-center items-center gap-2">
                      <UIcon name="i-heroicons-check-badge-solid" class="w-6 h-6" />
                      Facture vérifiée
                    </h5>
                    <USwitch default-value />
                  </div>
                  <div class="text-sm">Le propriétaire a fait vérifier son abonnement avec une facture.
                  </div>
                </div>
                <USeparator class="space-y-4" />
                <div class="">
                  <div class=" mb-2 flex justify-between items-center">
                    <h5 class="text-sm font-bold inline-flex justify-center items-center gap-2">
                      <UIcon name="i-heroicons-bolt" class="w-6 h-6" />
                      Acceptation Instantanée
                    </h5>
                    <USwitch default-value />
                  </div>
                  <div class=" text-sm">Le propriétaire accepte instantanément les nouveaux co-abonnés.
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <div class="col-span-7">
          <ul>
            <li v-for="(user, index) in users" :key="index" class="mb-4">
              <UCard variant="outline">
                <div class="w-full flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <UTooltip :delay-duration="0" text="L'indicateur de confiance définit l'activité de l'utilisateur sur Famsub.
Plus celui-ci est élevé, plus vous avez de chance d'obtenir une réponse rapidement." arrow>
                      <div class="relative w-20 h-20 flex items-center justify-center">
                        <!-- Cercle de progression -->
                        <svg class="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <!-- Cercle de fond -->
                          <circle cx="50" cy="50" r="35" stroke="#e5e7eb" stroke-width="6" fill="transparent" />
                          <!-- Cercle progressif -->
                          <circle cx="50" cy="50" r="35" stroke-linecap="round" stroke-width="6" fill="transparent"
                            :stroke="getCircleData(user.trustScore).circleColor"
                            :stroke-dasharray="getCircleData(user.trustScore).circumference"
                            :stroke-dashoffset="getCircleData(user.trustScore).strokeDashOffset" />
                        </svg>

                        <!-- Avatar -->
                        <UAvatar size="3xl"
                          :src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}&backgroundColor=7ed6df`"
                          alt="Avatar" />

                        <!-- Score affiché en haut au centre -->
                        <div
                          class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 w-6 h-6 flex items-center justify-center  font-medium text-white text-[11px] rounded-full"
                          :style="{ backgroundColor: getCircleData(user.trustScore).circleColor }">
                          {{ user.trustScore }}
                        </div>
                      </div>
                    </UTooltip>


                    <div class="">
                      <div class="flex items-center justify-between">
                        <h5 class="text-2xl font-semibold">
                          {{ user.name }}
                          <UTooltip :delay-duration="0"
                            :text="`Membre depuis ${new Date(user.created_add).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}`">
                            <UBadge color="neutral" size="sm" class=" ml-1 rounded-full -translate-y-2"
                              variant="outline">
                              {{ getMembershipAge(user.created_add) }}
                              <!--                              Membre depuis {{
                                                              new Date(user.created_add).toLocaleDateString('fr-FR', {
                                                                year: 'numeric',
                                                                month: 'short'
                                                              })
                                                            }}-->
                            </UBadge>
                          </UTooltip>
                        </h5>
                      </div>
                      <p class="text-lg">Partage <span class="font-bold">{{ serviceName }} </span></p>
                      <template v-if="user.verified">
                        <UBadge icon="i-heroicons-check-badge-solid" label="Facture vérifiée" variant="solid"
                          color="success" size="sm" class="mt-2 rounded-[4px]" />
                      </template>

                    </div>
                  </div>
                  <div class="inline-flex items-center gap-8">
                    <div class="text-right">
                      <p class="text-2xl font-bold">{{ formatCurrency(user.price, 'XAF') }}</p>
                      <p class="text-sm">/mois</p>
                    </div>

                    <UDrawer v-model:open="open" :ui="{ content: 'h-full', overlay: '' }">
                      <UButton color="primary" variant="solid"
                        class="rounded-full px-6 py-2 transition-colors  cursor-pointer">Rejoindre
                      </UButton>

                      <template #content>
                        <div class="flex items-end justify-end">
                          <UButton color="neutral" class="rounded-full cursor-pointer mr-4" size="xl" variant="outline"
                            icon="i-heroicons-x-mark" @click="open = false" />
                        </div>

                        <div class="grid max-w-4xl mx-auto w-full text-center">
                          <div class="text-3xl font-bold "> Rejoindre l'abonnement</div>
                          <div class="py-2 mb-6">Vous serez instantanément ajouté au partage de {{ user.name }}.</div>

                          <USeparator />
                          <div class="flex items-center justify-between py-2">
                            <div class="flex items-center gap-2">
                              <div class="relative w-20 h-20 flex items-center justify-center">
                                <!-- Cercle de progression -->
                                <svg class="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                  <!-- Cercle de fond -->
                                  <circle cx="50" cy="50" r="35" stroke="#e5e7eb" stroke-width="6" fill="transparent" />
                                  <!-- Cercle progressif -->
                                  <circle cx="50" cy="50" r="35" stroke-linecap="round" stroke-width="6"
                                    fill="transparent" :stroke="getCircleData(user.trustScore).circleColor"
                                    :stroke-dasharray="getCircleData(user.trustScore).circumference"
                                    :stroke-dashoffset="getCircleData(user.trustScore).strokeDashOffset" />
                                </svg>

                                <!-- Avatar -->
                                <UAvatar size="3xl"
                                  :src="`https://api.dicebear.com/9.x/avataaars/svg?seed=${user.name}&backgroundColor=7ed6df`"
                                  alt="Avatar" />

                                <!-- Score affiché en haut au centre -->
                                <div
                                  class="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 w-6 h-6 flex items-center justify-center  font-medium text-white text-[11px] rounded-full"
                                  :style="{ backgroundColor: getCircleData(user.trustScore).circleColor }">
                                  {{ user.trustScore }}
                                </div>
                              </div>
                              <div class="text-start">
                                <div class="text-lg font-semibold"> {{ user.name }}</div>
                                <div class="inline-flex">
                                  <UIcon name="i-heroicons-clock" />
                                  <div class="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
                                    Temps de réponse moyen : 20 minutes.
                                  </div>
                                </div>

                              </div>
                            </div>

                            <div class="font-bold text-3xl">Spotify</div>
                          </div>
                          <USeparator />

                          <div class="py-6 text-start">
                            <UAlert color="warning" variant="subtle"
                              description="Spotify limite le changement de famille : vous ne pouvez changer de famille qu'une fois tous les 12 mois."
                              icon="i-heroicons-exclamation-triangle" />
                          </div>


                          <div class="">
                            <div class="flex items-center justify-between py-2">
                              <div class=" text-start ">
                                <div class="text-lg font-semibold"> Participation mensuelle</div>
                                <div class="text-md text-neutral-500 dark:text-neutral-400">
                                  Sans aucun engagement
                                </div>
                              </div>
                              <div class="font-bold text-primary-400 text-2xl">{{
                                formatCurrency(1476.35, 'XAF')
                              }}
                              </div>
                            </div>

                            <div class="flex items-center justify-end w-full mb-2">
                              <div class="w-1/2 flex justify-between">
                                <div class="font-medium">Montant payé au propriétaire</div>
                                <div class="font-semibold text-md">{{ formatCurrency(1276.35, 'XAF') }}</div>
                              </div>
                            </div>
                            <div class="flex items-center justify-end w-full mb-6">
                              <div class="w-1/2 flex justify-between">
                                <div class="font-medium">Frais de fonctionnement</div>
                                <div class="font-semibold text-md">{{ formatCurrency(176.35, 'XAF') }}</div>
                              </div>
                            </div>
                            <div class="flex items-center justify-end w-full">
                              <div class="w-1/2 flex flex-col items-start justify-start">
                                <div class="font-semibold mb-2">Les frais de fonctionnement comprennent :</div>
                                <div class="inline-flex items-center">
                                  <UIcon name="i-heroicons-shield-check" />
                                  <div class="ml-2 font-medium">Protection anti-fraude</div>
                                </div>
                                <div class="inline-flex items-center">
                                  <UIcon name="i-heroicons-credit-card" />
                                  <div class="ml-2 font-medium">Garantie co-abonné</div>
                                </div>
                                <div class="inline-flex items-center">
                                  <UIcon name="i-heroicons-users" />
                                  <div class="ml-2 font-medium">Vérification du profil</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <USeparator class="py-6" />

                          <UCheckbox
                            description="Je reconnais et accepte que Famsub et Spotify ne sont en aucune manière liés dans le cadre de la fourniture des services fournis sur la plateforme. A ce titre, je confirme avoir pris connaissance des CGU de Spotify et m'engage à les respecter et à l'égard desquelles je suis seul(e) responsable." />


                          <UButton color="neutral" icon="i-heroicons-rocket-launch"
                            class="w-full py-4 mt-10 cursor-pointer transition-colors" size="xl" block>
                            Recharger mon solde
                          </UButton>

                        </div>


                      </template>
                    </UDrawer>
                  </div>
                </div>
              </UCard>
            </li>
          </ul>

          <div class="hidden py-2 sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm ">
                Showing
                {{ ' ' }}
                <span class="font-medium">1</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span class="font-medium">{{ Math.min(page * itemsPerPage, users.length) }}</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span class="font-medium">{{ users.length }}</span>
                {{ ' ' }}
                results
              </p>
            </div>
            <UPagination show-edges :sibling-count="1" v-model="page" variant="outline" size="md"
              :items-per-page="itemsPerPage" :total="users.length" />
          </div>

        </div>
      </div>
    </div>

    <div class="grid max-w-4xl mx-auto py-20">
      <UAccordion :items="faqs" />
    </div>
  </div>

</template>
