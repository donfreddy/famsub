export enum AuthProvider {
  MAGIC_LINK = 'magic_link',
  GOOGLE = 'google',
  GITHUB = 'github'
}

export enum AllProvider {
  MAGIC_LINK = 'magic_link',
  GOOGLE = 'google',
  GITHUB = 'github',
  GITLAB = 'gitlab',
  BITBUCKET = 'bitbucket'
}

export const GitProvider = {
  GITHUB: AllProvider.GITHUB,
  GITLAB: AllProvider.GITLAB,
  BITBUCKET: AllProvider.BITBUCKET
} as const;

export type GitProvider = typeof GitProvider[keyof typeof GitProvider];

export const PROVIDER_CONFIG = {
  auth: [AllProvider.MAGIC_LINK, AllProvider.GOOGLE, AllProvider.GITHUB],
  git: [AllProvider.GITHUB, AllProvider.GITLAB, AllProvider.BITBUCKET],
  deployment: [AllProvider.GITHUB, AllProvider.GITLAB]
};
