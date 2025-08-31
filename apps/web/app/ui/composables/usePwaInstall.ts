import {ref, onMounted} from 'vue';

export function usePwaInstall() {
  const deferredPrompt = ref<Event | null>(null)
  const hasDismissed = localStorage.getItem('pwa-install-dismissed') === 'true'
  const toast = useToast()

  const showPrompt = () => {
    toast.add({
      title: 'Ajouter Famsub à votre écran d’accueil ?',
      description: 'Vous pouvez installer cette application comme une app native.',
      duration: 0, // ne disparaît pas automatiquement
      actions: [
        {
          label: 'Installer',
          color: 'neutral',
          variant: 'outline',
          onClick: async () => {
            const promptEvent = deferredPrompt.value as any
            promptEvent.prompt()
            const {outcome} = await promptEvent.userChoice
            if (outcome === 'accepted') {
              deferredPrompt.value = null
              localStorage.setItem('pwa-install-dismissed', 'true')
            }
          }
        },
        {
          label: 'Plus tard',
          color: 'neutral',
          variant: 'outline',
          onClick: () => {
            localStorage.setItem('pwa-install-dismissed', 'true')
          }
        }
      ]
    })
  }

  onMounted(() => {
    if (hasDismissed) return

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt.value = e
      showPrompt()
    })

    window.addEventListener('appinstalled', () => {
      deferredPrompt.value = null
      toast.add({title: '✅ Application installée !', duration: 3000})
    })
  })
}

