<template>
  <div>
    <NuxtPage/>
  </div>
</template>
<script setup lang="ts">
import {useDark} from "@vueuse/core";

const isdark = useDark()
</script>
