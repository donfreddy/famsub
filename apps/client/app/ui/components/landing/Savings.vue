<script setup lang="ts">
import {motion} from "motion-v"

const services = [
  {name: "Netflix Premium", price: 7000, shared: 1800},
  {name: "Spotify Family", price: 4000, shared: 900},
  {name: "Apple Music", price: 4500, shared: 1000},
  {name: "Duolingo Plus Family", price: 5500, shared: 1000},
  {name: "Crunchyroll Mega", price: 3500, shared: 900},
]

const forOwners = [
  "Gardez le contrôle total de votre compte",
  "Définissez vos propres règles de partage",
  "Paiements mensuels automatiques",
  "Gérez facilement l'accès des co-abonnés",
]

const forSubscribers = [
  "Économisez jusqu'à 80 % sur les abonnements",
  "Aucun engagement à long terme",
  "Paiement sécurisé",
  "Rejoignez des abonnements fiables",
]

/*const forOwners = [
  "Keep full control of your account",
  "Set your own sharing rules",
  "Automatic monthly payments",
  "Easily manage co-subscriber access",
]

const forSubscribers = [
  "Save up to 80% on subscription costs",
  "No long-term commitments",
  "Secure payment processing",
  "Join trusted subscriptions",
]*/

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
  <LandingBaseSection
      id="savings"
      title="Stop au gaspillage numérique."
      description="Chaque mois, des milliers de personnes dépensent plus que nécessaire. Ne soyez pas l’un d’eux. Découvrez le partage d’abonnement."
      :bgGradient="true"
      overflow="overflow-hidden"
  >
    <div class="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
      <motion.div
          :initial="{ opacity: 0, x: -20 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5  }"
      >

        <UCard variant="soft" class="shadow bg-transparent">
          <h3 class="text-2xl font-bold mb-4">Abonnements populaires</h3>

          <ul class="space-y-4">
            <li v-for="(service, index) in services" :key="index">
              <div class="flex justify-between items-cente mb-2">
                <span class="font-medium">{{ service.name }}</span>
                <div class="flex items-center gap-3">
                    <span
                        class="text-zinc-400 dark:text-zinc-400 line-through decoration-zinc-400 dark:decoration-zinc-500">{{
                        formatCurrency(service.price, 'XAF')
                      }}</span>
                  <span class="font-bold text-primary-400">{{ formatCurrency(service.shared, 'XAF') }}</span>
                </div>
              </div>
              <USeparator/>
            </li>
          </ul>
          <div class="mt-4 pt-4 flex justify-between items-center">
            <span class="font-bold text-lg">Économies annuelles</span>
            <div class="flex items-center gap-2">
              <UIcon name="i-uil-percentage" class="size-5 text-primary-400"/>
              <span class="font-bold text-lg text-primary-400">Économisez jusqu'à 80%</span>
            </div>
          </div>
        </UCard>
      </motion.div>

      <motion.div
          :initial="{ opacity: 0, x: 20 }"
          :whileInView="{ opacity: 1, x: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.2 }"
          class="flex flex-col gap-6"
      >
        <UCard variant="soft" class="bg-primary-400/10 dark:border-primary-400/20 ">
          <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
            <UIcon name="i-uil-users-alt" class="size-5 text-primary-400"/>
            Pour les propriétaires
          </h3>
          <p class="mb-4 text-start text-sm text-zinc-500 dark:text-zinc-400">
            Récupérez jusqu'à 80 % de vos frais d'abonnement en partageant en toute sécurité avec des co-abonnés de confiance.
          </p>
          <ul class="space-y-2">
            <li v-for="(item, index) in forOwners" :key="index" class="flex items-start gap-2">
              <UIcon name="i-tabler-check" class="size-5 text-primary-400"/>
              <span>{{ item }}</span>
            </li>
          </ul>
        </UCard>

        <UCard variant="soft" class="bg-primary-400/10 dark:border-primary-400/20">
          <h3 class="text-xl font-bold mb-2 flex items-center gap-2">
            <UIcon name="i-uil-credit-card" class="size-5 text-primary-400"/>
            Pour les co-abonnés
          </h3>
          <p class="mb-4 text-start text-sm text-zinc-500 dark:text-zinc-400">
            Accédez à des abonnements bien connus à une fraction du coût et profitez d'une expérience de partage transparente.
          </p>
          <ul class="space-y-2">
            <li v-for="(item, index) in forSubscribers" :key="index" class="flex items-start gap-2">
              <UIcon name="i-tabler-check" class="size-5 text-primary-400"/>
              <span>{{ item }}</span>
            </li>
          </ul>
        </UCard>
      </motion.div>
    </div>
  </LandingBaseSection>
</template>

<style scoped>

</style>