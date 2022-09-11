<template>
  <transition name=".el-fade-in-linear">
    <div class="stage" v-show="isShow">
      <el-divider orientation="left">包数据</el-divider>
      <div class="stage-data">
        <span>总数：{{ labelStore.stageList?.totalCount }}</span><br>
        <span>审核完成：{{ labelStore.stageList?.finishedCount }}</span><br>
        <span>未领取：{{ labelStore.stageList?.waitForMarkCount }}</span><br>
        <span>总暂跳：{{ labelStore.stageList?.markingSkipCount }}</span><br>
        <span>已领取未提交：{{ labelStore.stageList?.markingHandlingCount }}</span><br>
        <span>质检未领取：{{ labelStore.stageList?.auditWaitForMarkCount }}</span><br>
        <span>质检暂跳：<span :style="{color:Number(labelStore.stageList.auditSkipCount)>0?'red':''}">{{
            labelStore.stageList?.auditSkipCount
          }}</span></span><br>
        <span>质检领取未提交：{{ labelStore.stageList?.unAuditCount }}</span>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import {useLabelStore} from "~/stores";
import {computed} from "#imports";

const labelStore = useLabelStore()
const isShow = computed(() => {
  return Object.getOwnPropertyNames(labelStore.stageList).length > 0
})
</script>
<style scoped>
.stage {
  border: 1px solid #dcdfe6;
  padding: 8px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
