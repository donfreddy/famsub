<script setup lang="ts">
import {motion} from "motion-v"

const faqs = ref([
  {
    label: "Pourquoi les abonnements sont-ils si peu chers ?",
    content:
        "Les abonnements sont moins chers sur Famsub parce que vous partagez les frais avec d'autres utilisateurs. Plutôt que de laisser des places vacantes sur vos abonnements multi-comptes, vous invitez d'autres personnes à participer et réduisez ainsi vos coûts. C'est un peu comme le covoiturage : vous partagez le trajet et chacun paie moins cher pour profiter du même service."
  },
  {
    label: "Est-ce légal de partager des abonnements via Famsub ?",
    content:
        "Oui, Famsub permet de partager des plans d’abonnement autorisant plusieurs accès simultanés, dans le respect des termes et conditions des services concernés. Le partage d’abonnement est légal tant qu'il respecte les règles d’utilisation des plateformes et Famsub garantit une utilisation conforme et sécurisée."
  },
  {
    label: "Famsub est-il sécurisé ?",
    content:
        "Absolument ! Famsub sécurise toutes les transactions entre les membres et protège vos informations personnelles. Les paiements sont automatisés et sécurisés. De plus, vos données sont protégées par des mesures de cryptage rigoureuses."
  },
  {
    label: "Puis-je annuler ou arrêter le partage d'un abonnement ?",
    content:
        "Oui, Famsub est un service sans engagement : vous pouvez quitter un abonnement ou arrêter un partage à tout moment. L’annulation prend effet à la fin de la période de facturation en cours, sans frais supplémentaires."
  },
  {
    label: "Est-ce que je perds mes favoris en partageant mon abonnement ?",
    content:
        "Non, rassurez-vous ! Quand vous partagez votre abonnement sur Famsub, chacun dispose de son propre profil ou d’un compte séparé. Vos favoris, historiques et préférences restent uniquement à vous dans la grande majorité des cas, comme si personne d’autre n’utilisait l’abonnement."
  },
  {
    label: "Que se passe-t-il si, après avoir payé, mon accès à l’abonnement ne fonctionne pas ?",
    content:
        "Satisfait ou remboursé ! Pas de mauvaises surprises : sur Famsub, c'est simple : soit vous avez accès, soit vous êtes remboursé. Vous êtes protégé à 100 %."
  }
]);
</script>

<template>
  <LandingBaseSection
      id="faq"
      title="Questions fréquentes."
      description="Trouvez des réponses aux questions courantes sur notre plateforme de partage d'abonnement."
      overflow="overflow-hidden"
      titleSpacing="mb-0"
  >
    <div class="grid max-w-4xl mx-auto py-20">
      <motion.div
          :initial="{ opacity: 0, y: 10 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.3  }"
      >
        <UAccordion :items="faqs"/>
      </motion.div>
    </div>
  </LandingBaseSection>
</template>

<style scoped>

</style>