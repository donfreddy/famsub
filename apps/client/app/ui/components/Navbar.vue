<script setup lang="ts">
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const {isAuthenticated} = useAuthStore();
const {useLogout} = useAuth();
const {mutate: logout} = useLogout();
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const colorMode = useColorMode();
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: () => colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
});
const horizontalLinks = [
  {label: "Home", to: "/app"},
  {label: "Explore", to: "/app/marketplace"},
  {label: "Messages", to: "/app/messages"},
];
const verticalLinks = [...horizontalLinks];

defineShortcuts({
  meta_k: () => isSearchOpen.value = !isSearchOpen.value
})

const groups = ref([

  {
    id: 'service',
    label: 'Services',
    items: [
      {
        label: 'Netflix',
        suffix: 'Popular streaming platform',
        icon: 'i-mdi-netflix',
        to: '/app/marketplace/list/netflix',
        onSelect: () => isSearchOpen.value = false
      },
      {
        label: 'Spotify',
        suffix: 'Music streaming service',
        icon: 'i-mdi-spotify',
        to: '/app/marketplace/list/spotify',
        onSelect: () => isSearchOpen.value = false
      },
      {
        label: 'Apple Music',
        suffix: 'Apple’s music platform',
        icon: 'i-mdi-apple',
        to: '/app/marketplace/list/apple-music',
        onSelect: () => isSearchOpen.value = false
      }
    ]
  },
  {
    id: 'category',
    label: 'Category',
    items: [
      {
        label: 'SVOD',
        suffix: 'Streaming Video on Demand',
        icon: 'i-mdi-movie',
        to: '/app/marketplace',
        onSelect: () => isSearchOpen.value = false
      },
      {
        label: 'Musique',
        suffix: 'Music streaming services',
        icon: 'i-mdi-music',
        to: '/app/marketplace',
        onSelect: () => isSearchOpen.value = false
      },
      {
        label: 'Security',
        suffix: 'Online security & VPN',
        icon: 'i-mdi-lock',
        to: '/app/marketplace',
        onSelect: () => isSearchOpen.value = false
      },
      {
        label: 'Video Games',
        suffix: 'Gaming & cloud services',
        icon: 'i-mdi-gamepad',
        to: '/app/marketplace',
        onSelect: () => isSearchOpen.value = false
      },
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
          isSearchOpen.value = false
        }
      },
      {
        label: 'Dark',
        icon: 'i-heroicons-moon',
        onSelect() {
          colorMode.preference = colorMode.value = 'dark'
          isSearchOpen.value = false
        }
      }
    ]
  }
]);

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('fr', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value,);
};

const items = [
  [{
    label: formatCurrency(8675, 'XAF'),
    slot: 'balance',
    disabled: true
  }], [{
    label: 'My wallet',
    icon: 'i-heroicons-wallet',
    to: '/app/my-wallet'
  }, {
    label: 'Payment method',
    icon: 'i-heroicons-credit-card',
    to: '/app/account/payment-methods'
  }, {
    label: 'Account',
    icon: 'i-heroicons-user',
    to: '/app/account/personal-info'
  }], [{
    label: 'Benefits and Offers',
    icon: 'i-heroicons-gift'
  }], [{
    label: 'Need help ?',
    icon: 'i-heroicons-question-mark-circle'
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    kbds: ['shift', 'meta', 'q'],
    onSelect() {
      logout()
    }
  }]
]
</script>

<template>
  <div
    class="flex fixed backdrop-filter h-16 backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-950/10 dark:border-gray-50/[0.1]">

    <UContainer class="w-full flex items-center justify-between">
      <div>
        <ULink to="/" class="inline-flex items-center">
          <Logo/>
          <UBadge
            label="beta"
            size="sm"
            variant="subtle"
            class="mb-0.5 ml-1"
          />
        </ULink>
      </div>
      <!--      <UButton @click="toggleMenu()" class="block md:hidden">
              <Icon :name="isMenuOpen ? 'pajamas:close' : 'pajamas:hamburger'" class="w-4 h-4 mt-1"/>
            </UButton>-->
      <div class="hidden md:flex">

        <UNavigationMenu
          variant="link"
          :items="horizontalLinks">
          <!--          <template #default="{ link }">
                      <span class="group-hover:text-primary relative">{{ link.label }}</span>
                    </template>-->
        </UNavigationMenu>
      </div>
      <div v-if="isMenuOpen"
           class="flex flex-col md:hidden absolute top-10 z-10 left-1/2 transform -translate-x-1/2 p-4 items-center">
        <UNavigationMenu :items="verticalLinks"/>
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
          <UTooltip text="Search" :delay-duration="0" :kbds="['meta', 'k']">
            <UModal v-model:open="isSearchOpen">
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
                  @update:open="isSearchOpen = $event"
                  close
                />
              </template>
            </UModal>
          </UTooltip>
        </ClientOnly>
        <template v-if="isAuthenticated">
          <UDropdownMenu :items="items" :popper="{ placement: 'bottom' }">
            <UAvatar
              chip-color="primary"
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Yvan&backgroundColor=7ed6df"
              chip-text="!"
              chip-position="top-right"
              alt="Don Freddy"
              size="md"
            />
            <template #balance="{ item }">
              <div class="text-left">
                <p class="text-xs">
                  Available Balance
                </p>
                <p class="truncate font-medium text-lg text-gray-900 dark:text-white">
                  {{ item.label }}
                </p>
              </div>
            </template>

            <template #item="{ item }">
              <span class="truncate">{{ item.label }}</span>

              <UIcon :name="item.icon!" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"/>
            </template>
          </UDropdownMenu>
        </template>
        <template v-else>
          <UButton
            label="Login"
            color="neutral"
            to="/login"
            variant="link"
            class="rounded-md"
          />
          <UButton
            label="Sign up"
            icon="i-heroicons-arrow-right-20-solid"
            trailing
            color="neutral"
            to="/signup"
            class="hidden lg:flex rounded-full"
          />
        </template>
      </div>
    </UContainer>
  </div>
</template>
