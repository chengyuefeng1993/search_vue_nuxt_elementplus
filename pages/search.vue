<template>
  <div class="search">
    <NavBar/>
    <NuxtPage/>
    <BackToTop/>
  </div>
</template>
<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
import {useRoute} from "#app";
import {useMainStore} from "~/stores";
import BackToTop from "~/components/BackToTop.vue";

const mainStore = useMainStore()
const route = useRoute()

onMounted(() => {
  if (route.path == '/home') {
    mainStore.routeUrl = 'home'
  } else if (route.path == '/search/label') {
    mainStore.routeUrl = 'label'
  } else if (route.path == '/search/review') {
    mainStore.routeUrl = 'review'
  }
})

watch(() => route.path, (newId) => {
  if (newId == '/home') {
    mainStore.routeUrl = 'home'
  } else if (newId == '/search/label') {
    mainStore.routeUrl = 'label'
  } else if (newId == '/search/review') {
    mainStore.routeUrl = 'review'
  }
})
</script>
<style scoped>
</style>
