<template>
  <transition name=".el-fade-in">
    <div class="review-main" v-show="view != null">
      <el-space wrap alignment="start">
        <component :is="view" v-for="item in reviewData" :item="item"
                   :historyList="item.answers[0].historyList"></component>
      </el-space>
      <ClientOnly>
        <div class="pager">
          <el-pagination :total="total" layout="total,prev,pager,next,jumper,sizes"
                         v-model:current-page="reviewStore.pageNum" v-model:page-size="reviewStore.pageSize"
                         :page-sizes="pageSizes" background v-show="total !== 0"
                         @current-change="pageNumChange" @size-change="pageSizeChange"/>
        </div>
      </ClientOnly>
    </div>
  </transition>
</template>
<script setup lang="ts">
import {useMainStore, useReviewStore} from "~/stores";
import {computed} from "#imports";
import TextView from './TextView.vue'
import VideoView from './VideoView.vue'


const reviewStore = useReviewStore()
const mainStore = useMainStore()

const view = computed(() => {
  if (reviewStore.reviewList.dataType == 'text') {
    return TextView
  } else if (reviewStore.reviewList.dataType == 'video') {
    return VideoView
  }
})

const pageSizes = [10, 30, 50, 100, 200, 500, 1000]
const reviewData = computed(() => {
  if (reviewStore.isFilter) {
    return reviewStore.reviewList.data?.filter((a) => a?.reviewUser == null)
  } else {
    return reviewStore.reviewList.data
  }
})
const total = computed(() => {
  if (Object.getOwnPropertyNames(reviewStore.reviewList).length > 0) {
    return reviewStore.reviewList.totalSize
  } else {
    return 0
  }
})

const pageNumChange = (num:number) => {
  reviewStore.pageNum = num
  reviewStore.onReviewSearch()
  mainStore.backToTop()
}

const pageSizeChange = () => {
  reviewStore.pageNum = 1
  window.localStorage.setItem('pageSize',reviewStore.pageSize.toString())
  reviewStore.onReviewSearch()
  mainStore.backToTop()
}

</script>
<style scoped>
.review-main {
  padding: 16px;
}

.pager {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
}
</style>
