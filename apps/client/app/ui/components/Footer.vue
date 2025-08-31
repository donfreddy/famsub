<script setup lang="ts">
interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  href: string;
  icon: string;
}

const footerSections: FooterSection[] = [
  {
    title: 'Plateforme',
    links: [
      { text: 'Comment ça marche', href: '#how-it-works' },
      { text: 'Économies', href: '#savings' },
      { text: 'Témoignages', href: '#testimonials' },
      { text: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { text: 'Centre d’aide', href: '' },
      { text: 'Blog', href: '' },
      { text: 'Guides', href: '' },
      { text: 'Support', href: '' },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { text: 'À propos', href: '' },
      { text: 'Carrières', href: '' },
      { text: 'Presse', href: '' },
      { text: 'Contactez-nous', href: '' },
    ],
  },
]

const legalLinks: FooterLink[] = [
  { text: 'Conditions générales', href: '' },
  { text: 'Politique de confidentialité', href: '' },
  { text: 'Cookies', href: '' },
]

const socialLinks: SocialLink[] = [
  {
    href: '',
    icon: 'M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z'
  },
  {
    href: '',
    icon: 'M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z M17.5 6.51L17.51 6.49889'
  },
  {
    href: '',
    icon: 'M16.8198 20.7684L3.75317 3.96836C3.44664 3.57425 3.72749 3 4.22678 3H6.70655C6.8917 3 7.06649 3.08548 7.18016 3.23164L20.2468 20.0316C20.5534 20.4258 20.2725 21 19.7732 21H17.2935C17.1083 21 16.9335 20.9145 16.8198 20.7684Z M20 3L4 21'
  }
]
</script>

<template>
  <footer class="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div class="grid pb-16 gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-6">
      <!-- Logo and Description -->
      <div class="lg:col-span-3 space-y-4">
        <ULink to="/">
          <Logo/>
        </ULink>
        <div class="lg:max-w-md mt-4">
          <p class="text-sm">
            Famsub est une plateforme qui vous permet de partager ou de rejoindre des abonnements avec d'autres, vous
            aidant ainsi à économiser de l'argent tout en profitant de vos services préférés.
          </p>
          <p class="text-sm mt-4">
            Nous sommes une équipe de développeurs passionnés qui se consacrent à l'utilisation de la technologie pour
            vous faciliter la vie.
          </p>
        </div>
      </div>

      <!-- Navigation Sections -->
      <div v-for="section in footerSections" :key="section.title" class="space-y-4">
        <h4 class="text-base font-bold tracking-wide">{{ section.title }}</h4>
        <ul class="space-y-2 text-sm transition-all duration-500">
          <li v-for="link in section.links" :key="link.text">
            <ULink :href="link.href">{{ link.text }}</ULink>
          </li>
        </ul>
      </div>
    </div>

    <USeparator/>

    <!-- Footer Bottom -->
    <div class="flex flex-col-reverse justify-between pt-5 pb-10 lg:flex-row">
      <p class="text-sm">&copy; 2024-2025 Famsub SAS. Tous droits réservés.</p>

      <!-- Legal Links -->
      <ul class="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
        <li v-for="link in legalLinks" :key="link.text">
          <a :href="link.href" class="text-sm transition-colors duration-300 hover:text-deep-purple-accent-400">
            {{ link.text }}
          </a>
        </li>
      </ul>

      <!-- Social Links -->
      <div class="flex items-center mt-1 space-x-3">
        <ULink v-for="(social, index) in socialLinks"
               :key="index"
               :href="social.href"
               class="text-zinc-500 transition-colors duration-300 hover:text-orange-400 cursor-pointer">
          <svg width="1.5em" height="1.5em" stroke-width="1.5" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg" color="currentColor" class="h-4 w-4">
            <path :d="social.icon" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </ULink>
      </div>
    </div>
  </footer>
</template>
