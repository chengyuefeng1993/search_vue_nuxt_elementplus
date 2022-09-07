import {defineNuxtPlugin} from "#app";
import ElementPlus from "element-plus";

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.use(ElementPlus)
})
