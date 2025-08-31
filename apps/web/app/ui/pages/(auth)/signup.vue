<script setup lang="ts">
import Joi from 'joi'
import type {FormSubmitEvent} from '#ui/types'
import type {LayoutKey} from "#build/types/layouts";
import type {MiddlewareKey} from "#build/types/middleware";

definePageMeta({
  layout: 'auth' as LayoutKey,
  middleware: 'guest' as MiddlewareKey,
})

const {useRegister} = useAuth();

const {mutate: register, isPending: isRegistering} = useRegister();

const schema = Joi.object({
  fname: Joi.string(),
  lname: Joi.string(),
  username: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
})

const state = reactive({
  fname: undefined,
  lname: undefined,
  username: undefined,
  email: undefined,
  password: undefined
})

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with event.data
  console.log(event.data)
  register(event.data)
}


const selected = ref(true)


</script>

<template>
  <div class="min-h-screen w-full flex flex-col items-center justify-center">
    <!-- Login Form -->
    <UCard class="max-w-sm  w-full bg-white/75 dark:bg-white/5 backdrop-blur ">
      <!-- Form Title -->


      <div class="flex flex-col justify-center items-center">
        <div class="text-2xl font-bold mb-1">Create an account</div>
        <p class="mb-6 text-center  text-gray-700 dark:text-gray-400">
          Already have an account?
          <ULink
            to="/login"
            active-class="text-primary"
            inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
          >
            Login
          </ULink>
        </p>
      </div>

      <!-- Form -->
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <!-- Name -->
        <div class="grid grid-cols-2 gap-2">
          <UFormField label="First name" name="fname" required>
            <UInput placeholder="Enter your fname" size="md" v-model="state.fname"/>
          </UFormField>
          <UFormField label="Last name" name="lname" required>
            <UInput placeholder="Enter your lname" size="md" v-model="state.lname"/>
          </UFormField>
        </div>

        <!-- Username -->
        <UFormField label="Username"
                    name="username"
                    description="You can choose one to hide your name.">
          <UInput placeholder="Enter your username" class="w-full" size="md" v-model="state.username"/>
        </UFormField>

        <!-- Email -->
        <UFormField label="Email" name="email" required>
          <UInput placeholder="you@example.com" class="w-full" size="md" v-model="state.email"
                  icon="i-heroicons-envelope"/>
        </UFormField>

        <!-- Password -->
        <UFormField label="Password" name="password" required>
          <UInput
            size="md"
            placeholder="***********"
            class="w-full"
            v-model="state.password"
            :type="showPassword ? 'text' : 'password'"
            icon="i-heroicons-lock-closed"
            :trailing-icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
            @click-trailing="togglePassword"
          />
        </UFormField>

        <!-- Submit Button -->
        <UButton
          type="submit"
          color="neutral"
          variant="solid"
          class="rounded-md transition-colors"
          size="md" block>
          Create account
        </UButton>

        <USeparator label="Or continue with" class="py-2"/>

        <div class="grid grid-cols-2 gap-4">
          <UButton
            class="w-full rounded-md transition-colors"
            color="neutral"
            variant="outline"
            label="Google"
            :avatar="{src: 'https://www.svgrepo.com/show/355037/google.svg'}"
            size="lg" block disabled/>
          <UButton
            class="w-full rounded-md transition-colors"
            color="neutral"
            variant="outline"
            label="Facebook"
            :avatar="{src: 'https://www.svgrepo.com/show/448224/facebook.svg' }"
            size="lg" block disabled/>
        </div>

        <!-- Sign Up Link -->
        <p class="text-center text-sm">
          By signing up, you agree to our
          <ULink
            to="/signup"
            inactive-class="text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
          >
            Terms of Service
          </ULink>
        </p>
      </UForm>
    </UCard>
  </div>
</template>

<style scoped>
/* Add any custom styles if necessary */
</style>

