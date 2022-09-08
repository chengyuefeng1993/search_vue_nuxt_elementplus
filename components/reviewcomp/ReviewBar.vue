<template>
  <div class="review-bar">
    <el-space>
      <ClientOnly>
        <el-date-picker v-model="reviewStore.reviewTime" type="datetimerange" teleported :shortcuts="shortcuts"
                        style="width: 360px"/>
      </ClientOnly>
      <ClientOnly>
        <el-select v-model="reviewStore.reviewStageName" style="width: 75px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                     teleported/>
        </el-select>
      </ClientOnly>
      <el-input placeholder="用户名" v-model="reviewStore.userName" style="width: 160px"/>
      <el-input placeholder="dataId" v-model="reviewStore.dataId" style="width: 90px" clearable/>
      <el-input v-model="reviewStore.reviewId" :maxlength="5" style="width: 150px" clearable
                @keydown.enter="reviewStore.onReview" @input="reviewStore.reviewIdChange">
        <template #append>
          <el-button @click="reviewStore.onReview">查询</el-button>
        </template>
      </el-input>
    </el-space>
  </div>
  <el-divider style="margin: 0"/>
</template>
<script setup lang="ts">
import {useReviewStore} from "~/stores";
import dayjs from "dayjs";

const reviewStore = useReviewStore()

const options = [
  {
    label: '标注',
    value: 'label'
  },
  {
    label: '一审',
    value: 'review'
  },
  {
    label: '全部',
    value: 'allReview'
  }
]

onMounted(() => {
  let reviewId = window.localStorage.getItem('reviewId')
  if (reviewId != null) {
    reviewStore.reviewId = reviewId
  }
  let pageSize = window.localStorage.getItem('pageSize')
  if (pageSize != null) {
    reviewStore.pageSize = Number(pageSize)
  }
})

const shortcuts = [
  {
    text: '前一天',
    onClick: () => {
      reviewStore.reviewTime = [
        dayjs(reviewStore.reviewTime[0]).subtract(1, 'day').toDate(),
        dayjs(reviewStore.reviewTime[1]).subtract(1, 'day').toDate()
      ]
    }
  },
  {
    text: '今天',
    onClick: () => {
      reviewStore.reviewTime = [
        dayjs().startOf('day').toDate(),
        dayjs().add(1, 'day').startOf('day').toDate()
      ]
    }
  },
  {
    text: '后一天',
    onClick: () => {
      reviewStore.reviewTime = [
        dayjs(reviewStore.reviewTime[0]).add(1, 'day').toDate(),
        dayjs(reviewStore.reviewTime[1]).add(1, 'day').toDate()
      ]
    }
  },
  {
    text: '半个月',
    onClick: () => {
      reviewStore.reviewTime = [
        dayjs().subtract(15, 'day').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  },
  {
    text: '一个月',
    onClick: () => {
      reviewStore.reviewTime = [
        dayjs().subtract(1, 'month').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  }
]
</script>
<style scoped>
.review-bar {
  padding: 10px;
}
</style>
