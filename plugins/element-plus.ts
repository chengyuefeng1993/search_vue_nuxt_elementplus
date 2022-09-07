import {defineNuxtPlugin} from "#app";
import ElementPlus,{ID_INJECTION_KEY } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.use(ElementPlus,{
    locale:zhCn
  }).provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  })
})
