<template>
  <div class="label-bar">
    <el-space wrap>
      <ClientOnly>
        <el-date-picker v-model="labelStore.labelTime" type="datetimerange" teleported :shortcuts="shortcuts"
                        style="width: 360px"/>
      </ClientOnly>
      <ClientOnly>
        <el-select v-model="labelStore.labelStageName" style="width: 75px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                     teleported/>
        </el-select>
      </ClientOnly>
      <el-input v-model="labelStore.labelSkipNum" @input="labelStore.labelSkipNumChange" style="width: 170px">
        <template #prepend>
          <span>暂跳额度：</span>
        </template>
      </el-input>
      <el-input v-model="labelStore.labelId" :maxlength="5" style="width: 150px" clearable
                @keydown.enter="labelStore.onLabelSearch" @input="labelStore.labelIdChange"
                @clear="labelStore.labelIdChange">
        <template #append>
          <el-button @click="labelStore.onLabelSearch">查询</el-button>
        </template>
      </el-input>
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

const options = [
  {
    label: '标注',
    value: 'label'
  },
  {
    label: '一审',
    value: 'review'
  }
]

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
