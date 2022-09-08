<template>
  <div class="search">
    <NavBar/>
    <NuxtPage/>
    <el-backtop :bottom="50" :right="30" :visibility-height="120">
      <div
          style="
        height: 100%;
        width: 100%;
        background-color: #616367;
        box-shadow: var(--el-box-shadow);
        text-align: center;
        line-height: 40px;
        color: #ffffff;
      "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>
<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
import {useRoute} from "#app";
import {useMainStore} from "~/stores";
import {ElBacktop} from "element-plus";

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
