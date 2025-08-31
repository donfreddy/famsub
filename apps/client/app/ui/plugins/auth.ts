import { defineNuxtPlugin } from '#app';
import { setupAuthDependencies } from "~~/app/di/authContainer";
import { setupServiceDependencies } from "~~/app/di/serviceContainer";
import { setupCategoryDependencies } from "~~/app/di/categoryContainer";
import { setupOfferDependencies } from "~~/app/di/offerContainer";

export default defineNuxtPlugin(async (nuxtApp) => {
  // Setup dependencies
  setupAuthDependencies(nuxtApp.vueApp);
  setupServiceDependencies(nuxtApp.vueApp);
  setupCategoryDependencies(nuxtApp.vueApp);
  setupOfferDependencies(nuxtApp.vueApp);

  // Initialize auth store
  const authStore = useAuthStore();
  authStore.initializeAuth();

  // Set up global navigation guards if needed
  nuxtApp.hook('app:created', () => {
    // Add global navigation guards here if needed
  });
});
