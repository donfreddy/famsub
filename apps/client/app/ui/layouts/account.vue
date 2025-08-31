<script lang="ts" setup>
import type {NavigationMenuItem} from '@nuxt/ui'
import {useRoute} from '#imports'


const route = useRoute()
//router.replace('/app/account/account')

const links = computed(() => {
  const baseLinks = [
    {
      label: 'Accueil',
      to: '/app'
    },
    {
      label: 'Compte',
    }
  ]

  // Get the current page label from the item array
  const currentPath = route.path
  const currentItem = items.value[0]?.find((item: NavigationMenuItem) => item.to === currentPath)

  if (currentItem) {
    baseLinks.push({
      label: currentItem.label,
      to: currentItem.to
    })
  }

  return baseLinks
})

const items = ref<NavigationMenuItem[]>([
  [
    {
      label: 'Information personnelle',
      icon: 'i-heroicons-user',
      to: '/app/account/personal-info',
    },
    {
      label: 'Moyens de paiement',
      icon: 'i-heroicons-credit-card',
      to: '/app/account/payment-methods'
    },
    {
      label: 'Appareils récents',
      icon: 'i-lucide-monitor-smartphone',
      to: '/app/account/recent-devices'
    },
    {
      label: 'Indice de confiance',
      icon: 'i-heroicons-shield-check',
      to: '/app/account/trust-score',
    },
    {
      label: 'Verifier mon profile',
      icon: 'i-heroicons-document-check',
      to: '/app/account/documents-form',
    },
  ],
])

</script>


<template>
  <Navbar/>
  <UContainer>
    <div class="pt-20">

      <UBreadcrumb :items="links"/>

      <div class="pt-10">
        <div class="grid grid-cols-8 gap-12 pt-4 sm:grid-cols-10">

          <div class="col-span-3 hidden sm:block">
            <UCard :ui="{'body':'p-0 sm:p-2'}" class="w-full">
              <UNavigationMenu
                orientation="vertical"
                class="w-full"
                variant="link"
                :items="items"
              />
            </UCard>
          </div>

          <div class="col-span-7 ">
            <keep-alive>
              <NuxtPage/>
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
  <Footer/>
</template>
