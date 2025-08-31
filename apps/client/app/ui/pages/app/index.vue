<template>
  <div class="pt-20 min-h-screen">
    <UBreadcrumb :items="links"/>

    <div class="py-8">
      <h1 class="text-3xl font-bold mb-6">Abonnement (1)</h1>

      <!-- Abonnement Section -->
      <div class="mt-6 grid sm:grid-cols-2 gap-8">

        <!-- Abonnement 1 -->
        <UCard variant="outline"
               class="hover:shadow-lg  transition duration-500">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                   class="w-30 sm:w-40"
                   alt="Spotify"/>
            </div>
            <div class="text-right">
              <p class="text-xl sm:text-3xl font-bold">{{ formatCurrency(1245, 'XAF') }}</p>
              <p class="text-sm">/ par mois</p>
            </div>
          </div>

          <div class="flex items-center justify-between py-12">
            <p class="mt-2 font-medium">Spotify Famille</p>
            <p class="text-sm  mt-1"><strong>Privé</strong> | Public</p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <UAvatarGroup size="3xl">
                <UTooltip text="donfreddy" :delay-duration="0" arrow>
                  <UAvatar
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Yvan&backgroundColor=7ed6df"
                      alt="Don freddy"
                  />
                </UTooltip>

                <UTooltip text="romainhamel" :delay-duration="0" arrow>
                  <UAvatar
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Hamel&backgroundColor=7ed6df"
                      alt="Romain Hamel"
                  />
                </UTooltip>

                <UTooltip text="noook" :delay-duration="0" arrow>
                  <UAvatar
                      src="https://api.dicebear.com/9.x/avataaars/svg?seed=Richter&backgroundColor=7ed6df"
                      alt="Neil Richter"
                  />
                </UTooltip>
              </UAvatarGroup>
            </div>
            <div class="flex flex-col items-center justify-between">
              <p class="text-4xl"><strong class="text-primary-400">3</strong>/<strong>6</strong></p>
              <p class="text-sm ">Splitters</p>
            </div>
          </div>

          <div class="flex items-center justify-center gap-4 pt-10 mb-4">
            <UButton color="primary" variant="outline"
                     size="xl"
                     :to="`/app/offer/${offerId}`"
                     class="rounded-full cursor-pointer">Gérer l'abonnement
            </UButton>
            <UButton
                icon="i-uil-share"
                size="xl"
                color="neutral"
                variant="subtle"
                class="rounded-full  cursor-pointer"
            />
          </div>
        </UCard>

        <!-- Ajouter un abonnement -->
        <UDrawer v-model:open="open" :ui="{ content: 'sm:h-1/2 h-2/3 w-full' }">
          <UCard variant="outline"
                 class="border-dashed group h-80 sm:h-full items-center flex justify-center border border-zinc-200 hover:border-primary-400 transition-colors cursor-pointer dark:border-zinc-700">
            <div class=" text-center">
              <UAvatar icon="i-heroicons-plus" size="3xl"
                       :ui="{ icon: 'text-text-neutral-900 dark:text-white group-hover:text-white'}"
                       class="bg-zinc-200 dark:bg-zinc-800 group-hover:bg-primary-400 transition-colors"/>
              <h2 class="text-xl font-bold pt-2">Ajouter un abonnement</h2>
            </div>
          </UCard>

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
                         class="rounded-full cursor-pointer px-6">Partager
                </UButton>
                <UButton color="primary" variant="outline"
                         size="xl"
                         to="/app/marketplace"
                         class="rounded-full cursor-pointer">Souscrire
                </UButton>
              </div>

              <div class="relative z-20">
                <UBadge color="neutral" :ui="{
                    base: 'absolute top-0 inset-x-0 -mt-3 w-20  mx-auto flex justify-center',
                  }" variant="outline" class="font-bold px-2 py-1 -mt-3 rounded-full">Facile !
                </UBadge>

                <UCard variant="outline">
                  <div class="py-2">
                    <div class="font-semibold">Partager :</div>
                    <div class="text-sm">Je suis propriétaire d'un abonnement et je souhaite le partager.</div>
                  </div>
                  <div class="py-2">
                    <div class="font-semibold">Souscrire :</div>
                    <div class="text-sm">Je souhaite souscrire à un abonnement.</div>
                  </div>
                </UCard>
              </div>
            </div>

          </template>
        </UDrawer>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

const links = [{
  label: 'Home',
  to: '/app'
}]

const open = ref(false)
const offerId = '7d22fd01-d23a-4001-9a77-92dc90202474';

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('fr', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value,);
};

const toast = useToast()

function showToast() {
  toast.add({
    // add emoji
    title: 'Le partage sera bientôt disponible ! 🚀',
    color: 'info'
  })
  // close the drawer
  open.value = false
}

</script>
