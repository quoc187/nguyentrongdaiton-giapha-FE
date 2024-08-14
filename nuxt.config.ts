// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  imports: {
    autoImport: false,
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  // ssr: false,
  vite: {
    optimizeDeps: {
      exclude: ["vee-validate"],
    },
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        baseUrl: ".",
      },
    },
  },
  modules: [
    "@nuxt/eslint",
    "nuxt-typed-router",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
  ],
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "vi",
    langDir: "lang",
    locales: [
      {
        file: "vi.json",
        code: "vi",
      },
      {
        code: "en",
        file: "en.json",
      },
    ],
    lazy: true,
  },
  tailwindcss: {
    config: {
      content: ["./components/**/*.vue", "./features/**/*.vue"],
    },
  },
})
