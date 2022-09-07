import {defineNuxtPlugin} from "#app";
import ElementPlus,{ID_INJECTION_KEY } from "element-plus";

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.use(ElementPlus).provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  })
})
