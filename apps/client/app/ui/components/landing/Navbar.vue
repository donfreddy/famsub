<script setup lang="ts">
const isMenuOpen = ref(false);
const {isAuthenticated} = useAuthStore();
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const colorMode = useColorMode();
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
});

const horizontalLinks = [
  {label: "Comment ça marche ?", to: "#how-it-works"},
];
const verticalLinks = [...horizontalLinks];

const groups = ref([
  {
    id: 'category',
    label: 'Category',
    items: [
      {label: 'SVOD', suffix: 'Streaming Video on Demand', icon: 'i-mdi-movie'},
      {label: 'Musique', suffix: 'Music streaming services', icon: 'i-mdi-music'},
      {label: 'Security', suffix: 'Online security & VPN', icon: 'i-mdi-lock'},
      {label: 'Video Games', suffix: 'Gaming & cloud services', icon: 'i-mdi-gamepad'}
    ]
  },
  {
    id: 'service',
    label: 'Services',
    items: [
      {
        label: 'Netflix',
        suffix: 'Popular streaming platform',
        icon: 'i-mdi-netflix',
        to: '/app/marketplace/list/netflix'
      },
      {
        label: 'Spotify',
        suffix: 'Music streaming service',
        icon: 'i-mdi-spotify',
        to: '/app/marketplace/list/spotify'
      },
      {
        label: 'Apple Music',
        suffix: 'Apple’s music platform',
        icon: 'i-mdi-apple',
        to: '/app/marketplace/list/apple-music'
      },
      {
        label: 'Canal+',
        suffix: 'French TV channel',
        icon: 'i-mdi-television',
        to: '/app/marketplace'
      }
    ]
  },
  {
    id: 'theme',
    label: 'Theme',
    items: [
      {
        label: 'Light',
        icon: 'i-heroicons-sun',
        onSelect() {
          colorMode.preference = colorMode.value = 'light'
        }
      },
      {
        label: 'Dark',
        icon: 'i-heroicons-moon',
        onSelect() {
          colorMode.preference = colorMode.value = 'dark'
        }
      }
    ]
  }
]);
</script>

<template>
  <div
      class="flex fixed backdrop-filter h-16 backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-950/10 dark:border-gray-50/[0.1]">
    <UContainer class="w-full flex items-center justify-between">
      <div>
        <ULink to="/" class="inline-flex items-center">
          <Logo />
          <UBadge
              label="v1.0.0"
              size="sm"
              variant="subtle"
              class="mb-0.5 ml-1"
          />
        </ULink>
      </div>

      <div class="hidden md:w-full md:flex md:justify-end">
        <UNavigationMenu
            variant="link"
            color="primary"
            :items="horizontalLinks">
        </UNavigationMenu>
      </div>

      <div class="flex items-center justify-center gap-2">
        <ClientOnly>
          <UButton
              :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
              color="neutral"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
          />
          <UModal>
            <UButton
                color="neutral"
                variant="ghost"
                icon="i-lucide-search"
            />

            <template #content>
              <UCommandPalette
                  :groups="groups"
                  placeholder="Type a command or search..."
                  class="h-80"
                  close
              />
            </template>
          </UModal>
        </ClientOnly>
        <UButton
            label="Connexion"
            color="primary"
            to="/login"
            variant="ghost"
            class="rounded-full"
        />
        <UButton
            label="Commencer"
            icon="i-heroicons-arrow-right-20-solid"
            trailing
            color="neutral"
            to="/signup"
            class="hidden lg:flex rounded-full"
        />
      </div>
    </UContainer>
  </div>
</template>
