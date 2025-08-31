<script setup lang="ts">
import {motion} from "motion-v"

const testimonials = [
  {
    name: "Brian Vidal",
    username: "@brian_vdl",
    feedback: "J’ai enfin trouvé une plateforme fiable pour rejoindre des abonnements partagés sans me prendre la tête !",
    date: "Feb 02, 2025",
    time: "09 : 10 AM",
    color: "22a6b3",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Brian&backgroundColor=7ed6df"
  },
  {
    name: "Aneka Petit",
    username: "@anekapetit",
    feedback: "Famsub m'a permis de réduire mes frais d'abonnement tout en gardant une gestion sécurisée des paiements. Je recommande !",
    date: "Feb 06, 2025",
    time: "10 : 30 AM",
    color: "6ab04c",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka&backgroundColor=badc58"
  },
  {
    name: "Marion Lefevre",
    username: "@marion_lfv",
    feedback: "Facile à utiliser et super pratique ! J’ai rejoint un abonnement YouTube Premium en quelques minutes.",
    date: "Feb 05, 2025",
    time: "08 : 15 PM",
    color: "eb4d4b",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Marion&backgroundColor=ff7979"
  },
  {
    name: "Hugo Martin",
    username: "@hugo_mrt",
    feedback: "Le système de paiement automatique est un vrai plus. Plus besoin de courir après les participants pour récupérer l'argent.",
    date: "Feb 04, 2025",
    time: "05 : 50 PM",
    color: "b6e3f4",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Hugo&backgroundColor=b6e3f4"
  },
  {
    name: "Camille Durand",
    username: "@camille_drd",
    feedback: "Je partage mon abonnement Deezer depuis plusieurs mois avec Famsub. Aucun souci, tout fonctionne parfaitement !",
    date: "Feb 03, 2025",
    time: "12 : 20 PM",
    color: "f0932b",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Camille&backgroundColor=ffbe76"
  },
  {
    name: "Laura Moreau",
    username: "@laura_mre",
    feedback: "Une plateforme bien pensée qui sécurise le partage des abonnements. Fini les soucis de gestion entre amis ou inconnus !",
    date: "Feb 01, 2025",
    time: "04 : 45 PM",
    color: "b6e3f4",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Laura&backgroundColor=b6e3f4"
  },
  {
    name: "Thomas Garnier",
    username: "@thomas_g",
    feedback: "Famsub m'a permis de partager mon abonnement Disney+ avec des amis sans prise de tête. Super service !",
    date: "Feb 06, 2025",
    time: "10 : 30 AM",
    color: "b6e3f4",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Thomas&backgroundColor=b6e3f4"
  },
  {
    name: "Sophie Lambert",
    username: "@sophie_lbr",
    feedback: "Grâce à Famsub, je partage mon abonnement Netflix en toute sécurité et je réduis mes dépenses. Super pratique !",
    date: "Feb 05, 2025",
    time: "08 : 15 PM",
    color: "b6e3f4",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sophie&backgroundColor=b6e3f4"
  },
  {
    name: "Manon Richard",
    username: "@manon_rch",
    feedback: "L’interface est fluide et intuitive. En quelques clics, j’ai pu rejoindre un abonnement Disney+ à moindre coût.",
    date: "Feb 03, 2025",
    time: "12 : 20 PM",
    color: "b6e3f4",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Manon&backgroundColor=b6e3f4"
  },
];
</script>

<template>
  <LandingBaseSection
      id="testimonials"
      title="Ce que les gens disent."
      description="Écoutez les propriétaires d'abonnements et les co-abonnés qui économisent de l'argent et partagent en toute sécurité."
      :bgGrid="true"
      overflow="overflow-hidden"
      titleSpacing="mb-0"
  >
    <!--  Loop through the testimonials array and display each testimonial in a card -->
    <ul class="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:gap-10 lg:mt-20 lg:max-w-none lg:grid-cols-3">
      <motion.li
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :initial="{ opacity: 0, y: 10 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{  duration: 0.3, delay: index * 0.05  }"
      >
        <UCard variant="outline" class="text-center">
          <div class="relative w-14 h-14 mx-auto -mt-12 rounded-full bg-(--ui-bg-elevated) p-1">
            <img :src="testimonial.avatar" class="w-full h-full rounded-full object-cover" alt="User avatar">
          </div>
          <h3 class="mt-2 text-sm font-semibold">{{ testimonial.name }}</h3>
          <p class="text-xs" :style="{ color: `#${testimonial.color}` }">{{ testimonial.username }}</p>
          <p class="text-sm pb-3 mt-3">" {{ testimonial.feedback }} "</p>
          <USeparator/>
          <div class="pt-2 flex justify-between">
            <div class="text-zinc-600 text-xs font-medium">{{ testimonial.date }}</div>
            <div class="text-zinc-500 text-xs">{{ testimonial.time }}</div>
          </div>
        </UCard>
      </motion.li>
    </ul>
  </LandingBaseSection>
</template>

<style scoped>

</style>
