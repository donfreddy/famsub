<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-6">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold text-gray-900 text-center mb-4">Personnalisez votre avatar</h2>

      <!-- Avatar généré -->
      <div class="flex justify-center mb-4">
        <img :src="avatarUrl" alt="Avatar" class="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md" />
      </div>

      <!-- Options de personnalisation -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-gray-600 text-sm">Couleur de fond</label>
          <input type="color" v-model="backgroundColor" class="w-full h-10 border rounded">
        </div>
        <div>
          <label class="text-gray-600 text-sm">Style de cheveux</label>
          <select v-model="topType" class="w-full border rounded p-2">
            <option v-for="option in topTypes" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <div>
          <label class="text-gray-600 text-sm">Accessoires</label>
          <select v-model="accessoriesType" class="w-full border rounded p-2">
            <option v-for="option in accessoriesTypes" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <div>
          <label class="text-gray-600 text-sm">Expression</label>
          <select v-model="expressionType" class="w-full border rounded p-2">
            <option v-for="option in expressionTypes" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>

      <!-- Bouton d'enregistrement -->
      <div class="mt-6 flex justify-between">
        <router-link to="/app/(avatar)/choose-avatar" class="text-blue-600 text-sm">Choisir un avatar existant</router-link>
        <button @click="saveAvatar" class="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const seed = ref("User" + Math.floor(Math.random() * 1000));
const backgroundColor = ref("#7ed6df");
const topType = ref("ShortHair");
const accessoriesType = ref("Blank");
const expressionType = ref("Default");

const topTypes = ["ShortHair", "LongHair", "Hat", "Eyepatch", "Turban"];
const accessoriesTypes = ["Blank", "RoundGlasses", "Sunglasses", "Kurt", "Prescription01"];
const expressionTypes = ["Default", "Happy", "Sad", "Surprised", "Serious"];

/*
const avatarUrl = computed(() =>
    `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed.value}&backgroundColor=${backgroundColor.value.replace("#", "")}&topType=${topType.value}&accessoriesType=${accessoriesType.value}&faceType=${expressionType.value}`
);
*/

const avatarUrl = ref(getAvatarUrl());

// Fonction pour générer l'URL de l'avatar
function getAvatarUrl() {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed.value}&backgroundColor=${backgroundColor.value.replace("#", "")}&topType=${topType.value}&accessoriesType=${accessoriesType.value}&faceType=${expressionType.value}`;
}

// Watchers pour détecter les changements
watch([backgroundColor, topType, accessoriesType, expressionType], () => {
  avatarUrl.value = getAvatarUrl();
});

const saveAvatar = () => {
  console.log("Avatar sauvegardé :", avatarUrl.value);
  router.push({ name: "AvatarPreview", query: { avatar: avatarUrl.value } });
};
</script>
