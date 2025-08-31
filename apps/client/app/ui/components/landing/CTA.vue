<script setup lang="ts">
import {motion} from "motion-v"
</script>

<template>
  <section
      class="w-full py-20 md:py-32 bg-gradient-to-br from-primary-400 to-primary-400/80 dark:to-primary-400/40 relative overflow-hidden">
    <div class="absolute inset-0 -z-10 landing-grid"></div>
    <div class="absolute -top-24 -left-24 w-64 h-64 bg-white/10 dark:bg-zinc-900/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 dark:bg-zinc-900/10 rounded-full blur-3xl"></div>

    <div class="mx-auto max-w-7xl px-4 md:px-6 relative">
      <motion.div
          :initial="{ opacity: 0, x: 20 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5  }"
          class="flex flex-col items-center justify-center space-y-6 text-center"
      >
        <h2 class="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          On commence à économiser ?
        </h2>
        <p class="mx-auto max-w-[800px] md:text-lg">
          Rejoignez des milliers d'utilisateurs qui partagent leurs abonnements en toute sécurité et économisent de l'argent chaque mois.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 mt-4">
          <UButton
              label="Créer mon compte"
              icon="i-heroicons-arrow-right-20-solid"
              trailing
              color="neutral"
              size="xl"
              to="/signup"
              class="font-medium rounded-full  transition-all duration-300"
          />
          <UButton
              label="Parcourir les abonnements disponibles"
              trailing
              variant="outline"
              size="xl"
              to="/app/marketplace"
              class="font-medium rounded-full text-white border border-white  transition-all duration-300"
          />
        </div>
        <p class="text-sm text-primary-foreground/80">
          Aucun frais initial. Payez uniquement lorsque le partage est réussi.
        </p>
      </motion.div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>
