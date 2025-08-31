<script lang="ts" setup>
import {getCurrentMonthYearCapitalized} from "~~/app/shared/utils/date-utils";

definePageMeta({
  layout: 'account'
});

// Get the current month and year in French format
const currentMonthYear = getCurrentMonthYearCapitalized();
</script>

<template>
  <div class="min-h-screen space-y-10">
    <div class="justify-between flex items-center mb-8">
      <div class="w-full sm:w-3/4">
        <h1 class="text-lg font-semibold">Moyens de paiement</h1>
        <div class="text-sm">Gérez votre solde Famsub et les moyens de paiement utilisés sur vos abonnements
        </div>
      </div>
    </div>

    <UCard variant="subtle">
      <template #header>
        <div class="flex justify-between items-center space-y-2">
          <div class="text-xl font-bold">Mon solde</div>
          <div class="text-4xl font-bold">
            <span class="tracking-wide">0</span>
            <sup class="text-xl">FCFA</sup>
          </div>
        </div>
      </template>

      <div class="flex justify-between items-center space-y-2">
        <div class="space-y-2">
          <div class="text-sm">Recharger votre solde à l'aide du moyen de paiement de votre choix :</div>
          <div class="inline-flex space-x-2">
            <img class="h-auto w-14 rounded-md"
                 src="https://payunit-paymentlinks-imgs.s3.us-west-2.amazonaws.com/psps/orange.png" alt="OM">
            <img class="h-auto w-14 rounded-md"
                 src="https://payunit-paymentlinks-imgs.s3.us-west-2.amazonaws.com/psps/mtn.png" alt="Momo">
            <img class="h-auto w-14 rounded-md"
                 src="https://payunit-paymentlinks-imgs.s3.us-west-2.amazonaws.com/psps/cb.png" alt="Card">
          </div>
        </div>
        <UButton
          color="primary"
          size="lg"
          label="Recharger mon solde"
          class=""
        />
      </div>

      <template #footer>
        <div class="flex justify-between items-center space-y-2">
          <div class="text-sm">Activer le paiement prioritaire avec mon solde</div>
          <div class="inline-flex items-center gap-2">
            <div class=" text-base">Non</div>
            <USwitch model-value/>
            <div class="font-semibold text-base">Oui</div>
          </div>
        </div>
      </template>
    </UCard>

    <UCard>
      <div class="flex flex-col justify-center items-center space-y-2">
        <div class="font-semibold">Pas d’abonnement pour le moment</div>
        <UButton
          color="primary"
          size="lg"
          label="Aller sur la marketplace"
          to="/app/marketplace"
          class=""
        />
      </div>
    </UCard>

    <UCard>
      <div class="flex items-center justify-between">
        <h3 class="text-lg  font-semibold">Historique des paiements</h3>

        <!-- Month Navigation -->
        <div class="flex items-center justify-between space-x-5">
          <UButton
            icon="i-lucide-chevron-left"
            color="neutral"
            size="lg"
            variant="subtle"
            class="cursor-pointer rounded-full transition-colors"
            disabled
          />
          <span class="text-base font-medium">{{ currentMonthYear }}</span>
          <UButton
            icon="i-lucide-chevron-right"
            color="neutral"
            size="lg"
            variant="subtle"
            class="cursor-pointer rounded-full transition-colors"
            disabled
          />
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>
