<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next';
import PasswordInput from '~/components/PasswordInput.vue';
import { useAuthMutation } from '~/composables/mutations/useAuthMutation';

const { login, isLoggingIn } = useAuthMutation();

const email = ref('freddytamwo@gmail.com');
const password = ref('Famsub@2024');

function onSubmit(event: Event) {
  event.preventDefault();
  if (!email.value || !password.value)
    return;

  login({ email: email.value, password: password.value });
}
</script>

<template>
  <form class="grid gap-6" @submit="onSubmit">
    <div class="flex flex-col gap-4">
      <Button variant="outline" class="w-full gap-2" disabled>
        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" class="h-5 w-5">
        Login with Google
      </Button>
    </div>
    <Separator label="Or continue with" />
    <div class="grid gap-2">
      <Label for="email">
        Email
      </Label>
      <Input
        id="email"
        v-model="email"
        type="email"
        placeholder="name@example.com"
        :disabled="isLoggingIn"
        auto-capitalize="none"
        auto-complete="email"
        auto-correct="off"
      />
    </div>
    <div class="grid gap-2">
      <div class="flex items-center">
        <Label for="password">
          Password
        </Label>
        <NuxtLink
          to="/forgot-password"
          class="ml-auto inline-block text-sm underline"
        >
          Forgot your password?
        </NuxtLink>
      </div>
      <PasswordInput id="password" v-model="password" />
    </div>
    <Button type="submit" class="w-full" :disabled="isLoggingIn">
      <Loader2 v-if="isLoggingIn" class="mr-2 h-4 w-4 animate-spin" />
      Login
    </Button>
  </form>
  <div class="mt-4 text-center text-sm text-muted-foreground">
    Don't have an account?
    <NuxtLink to="#" class="underline">
      Contact us
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>
