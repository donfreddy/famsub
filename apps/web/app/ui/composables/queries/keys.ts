export const queryKeys = {
  // Auth
  auth: {
    sendMagicLinkEmail: ['auth', 'magic-link-email'] as const,
    loginWithMagicToken: ['auth', 'magic-token-login'] as const,
    logout: ['auth', 'logout'] as const,
    currentUser: ['auth', 'current-user'] as const,
  },

  // Servers
  servers: {
    all: ['servers'] as const,
    add: () => [...queryKeys.servers.all, 'add'] as const,
    testConnection: ['test-connection'] as const,
    byId: (id: string | number) => [...queryKeys.servers.all, 'id', id] as const,
    delete: () => [...queryKeys.servers.all, 'delete'] as const,
    update: () => [...queryKeys.servers.all, 'update'] as const,
  },
} as const
