import { defineNuxtConfig } from 'nuxt'
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";

const lifecycle = process.env.npm_lifecycle_event;
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr:true,
  meta: {
    title: "量",
    link: [{ rel: "icon", type: "svg", href: "/kuaishou.svg" }],
  },
  css: ["~/assets/scss/index.scss"],
  build: {
    transpile: lifecycle === "build" ? ["element-plus"] : [],
  },
  modules:[
    "@pinia/nuxt",
    "unplugin-icons/nuxt",
    "@vueuse/nuxt",
    "nuxt-windicss",
  ],
  vueuse: {
    ssrHandlers: true,
  },
  windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },
})
