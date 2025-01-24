// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: "http://localhost:8000"
    },
  },
  css: [
    '@/assets/css/output.css',
    '@/assets/tabler/tabler.css',
    'swiper/swiper-bundle.css'
  ],
  app: {
    head: {
      title: "گزارش مشکلات شهری", 
      meta: [
        { name: 'description', content: "گزارش مشکلات شهری" },
        { name: 'keywords', content: "گزارش مشکلات شهری" },
        { name: 'author', content: 'حسن محمدزاده' },
      ],
      htmlAttrs: {
        dir: 'rtl',
      },
      bodyAttrs: {
        class: 'font-amir bg-stone-50',
      },
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
