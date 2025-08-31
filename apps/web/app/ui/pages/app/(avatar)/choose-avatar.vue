<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold text-gray-900 text-center mb-4">Choisissez un avatar</h2>

      <div class="grid grid-cols-3 gap-4">
        <img v-for="avatar in avatars" :key="avatar" :src="avatar" @click="selectAvatar(avatar)"
             class="w-20 h-20 rounded-full border-2 border-gray-300 shadow cursor-pointer hover:border-blue-500" />
      </div>

      <div class="mt-6 text-center">
        <router-link to="/app/(avatar)/customize-avatar" class="text-blue-600 text-sm">Créer un avatar personnalisé</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const avatars = [
  "https://api.dicebear.com/9.x/avataaars/svg?seed=User1",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=User2",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=User3",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=User4",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=User5",
];

const selectAvatar = (avatar) => {
  console.log("Avatar sélectionné :", avatar);
  router.push({ name: "AvatarPreview", query: { avatar } });
};
</script>
