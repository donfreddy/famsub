<script setup lang="ts">
import {motion} from "motion-v"

const ownerSteps = [
  {
    title: "Créez une offre",
    description: "Publiez votre abonnement et définissez combien de co-abonnés vous souhaitez.",
  },
  {
    title: "Approuvez les membres",
    description: "Examinez et approuvez les co-abonnés vérifiés qui souhaitent rejoindre votre abonnement.",
  },
  {
    title: "Paiements sécurisés",
    description: "Famsub gère tous les paiements et vous transfère automatiquement les fonds chaque mois.",
  },
  {
    title: "Réduisez vos coûts",
    description: "Réduisez vos frais d’abonnement jusqu’à 80 % tout en gardant le contrôle total de votre compte.",
  },
]

const subscriberSteps = [
  {
    title: "Trouvez des abonnements",
    description: "Parcourez les abonnements disponibles proposés par des propriétaires vérifiés sur notre marketplace sécurisée.",
  },
  {
    title: "Demandez à rejoindre",
    description: "Envoyez une demande pour rejoindre l’abonnement de votre choix via notre plateforme sécurisée.",
  },
  {
    title: "Paiement facile",
    description: "Configurez un paiement mensuel automatique via notre système de paiement sécurisé.",
  },
  {
    title: "Faites des économies",
    description: "Profitez de votre abonnement à une fraction du prix habituel, sans tracas.",
  },
]
</script>

<template>
  <LandingBaseSection
      id="how-it-works"
      title="Comment ça marche ?"
      description="Que vous soyez propriétaire d'un abonnement ou que vous souhaitiez en rejoindre un, notre processus est simple et sécurisé."
      :bgGrid="true"
      overflow="overflow-hidden"
      titleSpac ing="mb-0"
  >
    <div class="grid gap-8 md:grid-cols-2 items-stretch">
      <!--        Card for Subscription Owners-->
      <motion.div
          :initial="{ opacity: 0, x: -20 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5  }">
        <UCard variant="outline" :ui="{'header':'p-0 sm:px-0'}" class="h-full">
          <template #header>
            <div class="bg-primary-400/10 dark:border-primary-400/20 p-4 sm:px-6 rounded-t-lg">
              <h3 class="text-2xl font-bold flex items-center">
                Propriétaires
              </h3>
              <p class="mt-2 text-zinc-500 dark:text-zinc-400">Partagez votre abonnement et compensez vos coûts.</p>
            </div>
          </template>

          <div class="space-y-6">
            <div v-for="(step, index) in ownerSteps" :key="index" class="flex gap-4">
              <div
                  class="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary-400/10 dark:border-primary-400/20 text-orange-400">
                <span class="font-bold">{{ index + 1 }}</span>
              </div>
              <div>
                <h4 class="font-bold">{{ step.title }}</h4>
                <p class="text-sm text-zinc-500 dark:text-zinc-400">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </motion.div>


      <!--        Card for Co-subscribers-->
      <motion.div
          :initial="{ opacity: 0, x: 20 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <UCard variant="outline" :ui="{'header':'p-0 sm:px-0'}" class="h-full">
          <template #header>
            <div class="bg-primary-400/10 dark:border-primary-400/20 p-4 sm:px-6 rounded-t-lg">
              <h3 class="text-2xl font-bold flex items-center">
                Co-abonnés
              </h3>
              <p class="mt-2 text-zinc-500 dark:text-zinc-400">Rejoignez les abonnements et économisez de l'argent
                chaque
                mois.</p>
            </div>
          </template>

          <div class="space-y-6">
            <div v-for="(step, index) in subscriberSteps" :key="index" class="flex gap-4">
              <div
                  class="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary-400/10 dark:border-primary-400/20 text-orange-500">
                <span class="font-bold">{{ index + 1 }}</span>
              </div>
              <div>
                <h4 class="font-bold">{{ step.title }}</h4>
                <p class="text-sm text-zinc-500 dark:text-zinc-400">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </motion.div>
    </div>

    <!--        Card for Secure for Everyone-->
    <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.3}"
    >
      <UCard variant="outline" class="mt-16">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="flex-shrink-0">
            <UIcon name="i-uil-shield" class="size-16 text-primary-400"/>
          </div>
          <div>
            <h3 class="text-xl font-bold mb-2">Sécurisé pour tous</h3>
            <p class="text-zinc-500 dark:text-zinc-400">
              Famsub agit comme intermédiaire de confiance entre les titulaires d'abonnements et les co-abonnés. Nous
              vérifions tous les utilisateurs, gérons tous les paiements en toute sécurité et garantissons la protection
              des titulaires d'abonnements contre les impayés. Les co-abonnés n'ont jamais besoin de partager leurs
              informations personnelles avec les titulaires.
            </p>
          </div>
        </div>
      </UCard>
    </motion.div>
  </LandingBaseSection>
</template>

<style scoped>

</style>