<template>
  <div class="home">
    <h1>HelloWorld!</h1>
    <el-date-picker type="datetimerange" teleported v-model="labelStore.labelTime"/>
  </div>
</template>
<script setup lang="ts">
import {useLabelStore} from "~/stores";

const labelStore = useLabelStore()
</script>
<style scoped>
</style>
