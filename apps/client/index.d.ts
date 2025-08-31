import type {AxiosInstance} from 'axios'

declare module '#app' {
  interface NuxtApp {
    $api: AxiosInstance
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance
  }
}

export {};
