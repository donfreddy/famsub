<script setup>
import {generateAvatarUrl} from '~~/app/shared/utils/avatar-utils.js'

const { data: subscriptions } = await useAsyncData('subscriptions', () => {
  return [
    {
      id: 1,
      title: 'Netflix',
      slug: 'netflix',
      price: '2 000 FCFA/mois',
      bgClass: 'bg-gradient-to-r from-[#E50914] to-[#FF6A6A] hover:brightness-110',
      avatars: Array.from({length: 3}, () => generateAvatarUrl())
    },
    {
      id: 2,
      title: 'Spotify',
      slug: 'spotify',
      price: '900 FCFA/mois',
      bgClass: 'bg-gradient-to-r from-[#1DB954] to-[#1ED760] hover:brightness-110',
      avatars: Array.from({length: 4}, () => generateAvatarUrl())
    },
    {
      id: 3,
      title: 'Canva Pro',
      slug: 'canva-pro',
      price: '5 000 FCFA/mois',
      bgClass: 'bg-gradient-to-r from-[#00C4CC] to-[#23D5AB] hover:brightness-110 transition-all',
      avatars: Array.from({length: 3}, () => generateAvatarUrl())
    },
    {
      id: 4,
      title: 'Apple Music',
      slug: 'apple-music',
      price: '1 000 FCFA/mois',
      bgClass: 'bg-gradient-to-r from-[#FA233B] to-[#FF5E5B] hover:brightness-110',
      avatars: Array.from({length: 4}, () => generateAvatarUrl())
    },
    {
      id: 5,
      title: 'Crunshyroll',
      slug: 'crunchyroll',
      price: '850 FCFA/mois',
      bgClass: 'bg-gradient-to-r from-[#F47521] to-[#F8A13B] hover:brightness-110',
      avatars: Array.from({length: 2}, () => generateAvatarUrl())
    },
    {
      id: 6,
      title: 'Duolingo',
      slug: 'duolingo',
      price: '1 500 FCFA/mois',
      bgClass: 'bg-gradient-to-r from-[#58CC02] to-[#A3E635] hover:brightness-110',
      avatars: Array.from({length: 5}, () => generateAvatarUrl())
    },
  ]
})
</script>

<template>
  <LandingBaseSection
    id="subscriptions"
    title="Économisez gros sur vos abonnements"
    description="Plus de 50 abonnements partageables : Netflix, Spotify, Duolingo, Adobe Creative, et bien plus encore."

    spacing="py-10"
    titleCenter
    titleSpacing="mb-12"
    contentMaxWidth="max-w-7xl"
  >
    <div class="flex-col space-y-10 text-center">

      <div
        class="flex w-full mx-auto  flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <SmartMarquee>
          <ul v-for="sub in subscriptions" :key="sub.id"
              class="flex py-5 items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none">
            <li class="">
              <UCard variant="outline" class="overflow-hidden rounded-xl shadow-lg w-72" :ui="{'body':'p-0 sm:p-0'}">
                <div class="p-1.5" :class="sub.bgClass">
                </div>
                <div class="p-4">
                  <h2 class="text-3xl font-bold pb-14 pt-10">{{ sub.title }}</h2>

                  <div class="flex space-x-1">
                    <USeparator/>
                    <UAvatar v-for="(avatar, i) in sub.avatars"
                             :key="i"
                             :src="avatar" :alt="`Avatar ${i + 1}`"/>
                    <USeparator/>
                  </div>

                  <p class="text-2xl font-bold  py-10">{{ sub.price }}</p>

                  <UButton
                    label="Rejoindre"
                    size="xl"
                    :to="`/app/marketplace/list/${sub.slug}`"
                    class="font-medium rounded-full  transition-all duration-300"
                    :class="sub.bgClass"
                    block
                  />
                </div>
              </UCard>
            </li>
          </ul>
        </SmartMarquee>
      </div>

      <UButton
        label="Voir tous les abonnements"
        color="neutral"
        size="xl"
        to="/app/marketplace"
        class="font-medium rounded-full  transition-all duration-300"
      />
    </div>
  </LandingBaseSection>
</template>

<style scoped>

</style>
