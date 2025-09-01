export default defineAppConfig({
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'zinc',
    },
    button: {
      slots: {
        base: 'cursor-pointer transition-all duration-300',
      },
    },
    icons: {
      loading: 'i-lucide-loader',
    },
  },
  toaster: {
    position: 'top-right' as const,
  },
})
