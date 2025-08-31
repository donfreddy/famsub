<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-6">
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Aperçu de votre avatar</h2>

      <div class="flex justify-center">
        <img :src="avatarUrl" alt="Avatar Preview" class="w-40 h-40 rounded-full border-4 border-gray-300 shadow-md" />
      </div>

      <div class="mt-6 flex justify-between">
        <router-link to="/app/(avatar)/customize-avatar" class="text-blue-600 text-sm">Modifier</router-link>
        <button @click="confirmAvatar" class="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-green-700 transition">
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const avatarUrl = route.query.avatar || "https://api.dicebear.com/9.x/avataaars/svg?seed=Default";

const confirmAvatar = () => {
  console.log("Avatar confirmé :", avatarUrl);
  router.push({ name: "Profile" });
};
</script>
