<template>
  <div class="review">
    <ReviewBar/>
    <div class="review-main" v-loading="reviewStore.reviewIsLoading">
      <ReviewMain/>
    </div>
  </div>
</template>
<script setup lang="ts">

import ReviewBar from "~/components/reviewcomp/ReviewBar.vue";
import ReviewMain from "~/components/reviewcomp/ReviewMain.vue";
import {useReviewStore} from "~/stores";

const reviewStore = useReviewStore()
</script>
<style scoped>
</style>
