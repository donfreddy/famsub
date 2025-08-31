<script setup lang="ts">
import type { LayoutKey } from "#build/types/layouts";
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import type { MiddlewareKey } from "#build/types/middleware";

definePageMeta({
  layout: 'auth' as LayoutKey,
  middleware: 'guest' as MiddlewareKey,
})

const { useLogin } = useAuth();

const { mutate: login, isPending: isLoggingIn } = useLogin();

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required()
})

const state = reactive({
  email: 'johndoe@gmail.com',
  password: 'Password@123'
})

async function onSubmit(event: FormSubmitEvent<any>) {
  console.log(event.data);
  login(event.data)
}

const selected = ref(true)
</script>

<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center">
    <!-- Login Form -->
    <UCard class="max-w-sm  w-full bg-white/75 dark:bg-white/5 backdrop-blur ">
      <!-- Form Title -->


      <div class="flex flex-col justify-center items-center">
        <UIcon name="i-heroicons-lock-closed " class="w-8 h-8  mb-2" />
        <div class="text-2xl font-bold">Welcome back</div>
        <p class="mb-6 text-center  text-gray-700 dark:text-gray-400">
          Don't have an account?
          <ULink to="/signup" active-class="text-primary"
            inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200">
            Sign up
          </ULink>
        </p>
      </div>

      <!-- Form -->
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <!-- Email -->
        <SmartBaseInput v-model="state.email" label="Email" name="email" type="email" icon="i-heroicons-envelope"
          required placeholder="Enter your email" />

        <!-- Password -->
        <SmartPasswordInput v-model="state.password" name="password" label="Mot de passe" required />

        <!-- Remember Me and Forgot Password -->
        <div class="flex items-center py-1 justify-between">
          <UCheckbox v-model="selected" name="saveMe" label="Remember" />
          <ULink to="/signup" active-class="text-primary"
            inactive-class="text-sm text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200">
            Forgot password?
          </ULink>
        </div>

        <!-- Submit Button -->
        <UButton type="submit" color="neutral" variant="solid" class="rounded-md transition-colors" size="md" block
          :loading="isLoggingIn">
          Continue
        </UButton>
      </UForm>

      <USeparator label="Or continue with" class="py-5" />

      <div class="grid grid-cols-2 gap-4">
        <UButton class="w-full rounded-md transition-colors" color="neutral" variant="outline" label="Google"
          :avatar="{ src: 'https://www.svgrepo.com/show/355037/google.svg' }" size="lg" block disabled />
        <UButton class="w-full rounded-md transition-colors" color="neutral" variant="outline" label="Facebook"
          :avatar="{ src: 'https://www.svgrepo.com/show/448224/facebook.svg' }" size="lg" block disabled />
      </div>

      <!-- Sign Up Link -->
      <p class="text-center text-sm pt-5">
        By signing in, you agree to our
        <ULink to="/signup"
          inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200">
          Terms of Service
        </ULink>
      </p>
    </UCard>
  </div>
</template>

<style scoped>
/* Add any custom styles if necessary */
</style>
