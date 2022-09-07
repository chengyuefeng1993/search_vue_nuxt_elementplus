<template>
  <div class="label-bar">
    <el-space>
      <el-date-picker v-model="labelStore.labelTime" type="datetimerange" teleported :shortcuts="shortcuts"/>
      <el-select></el-select>
    </el-space>
  </div>
  <el-divider style="margin: 0"/>
</template>
<script setup lang="ts">
import {useLabelStore} from "~/stores";
import dayjs from "dayjs";

const labelStore = useLabelStore()

onMounted(() => {
  let labelId = window.localStorage.getItem('labelId')
  if (labelId != null) {
    labelStore.labelId = labelId
  }
  let skipNum = window.localStorage.getItem('skipNum')
  if (skipNum != null) {
    labelStore.labelSkipNum = Number(skipNum)
  }
})

const shortcuts = [
  {
    text: '前一天',
    onClick: () => {
      labelStore.labelTime = [
        dayjs(labelStore.labelTime[0]).subtract(1, 'day').toDate(),
        dayjs(labelStore.labelTime[1]).subtract(1, 'day').toDate()
      ]
    }
  },
  {
    text: '今天',
    onClick: () => {
      labelStore.labelTime = [
        dayjs().startOf('day').toDate(),
        dayjs().add(1, 'day').startOf('day').toDate()
      ]
    }
  },
  {
    text: '后一天',
    onClick: () => {
      labelStore.labelTime = [
        dayjs(labelStore.labelTime[0]).add(1, 'day').toDate(),
        dayjs(labelStore.labelTime[1]).add(1, 'day').toDate()
      ]
    }
  },
  {
    text: '半个月',
    onClick: () => {
      labelStore.labelTime = [
        dayjs().subtract(15, 'day').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  },
  {
    text: '一个月',
    onClick: () => {
      labelStore.labelTime = [
        dayjs().subtract(1, 'month').startOf('day').toDate(),
        dayjs().endOf('day').toDate()
      ]
    }
  }
]
</script>
<style scoped>
.label-bar {
  padding: 10px;
}
</style>
