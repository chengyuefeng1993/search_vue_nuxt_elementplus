<template>
  <transition name=".el-fade-in-linear">
    <div class="skip" v-show="isShow">
      <el-divider>暂跳</el-divider>
      <el-table border size="small" :data="labelStore.skipList">
        <el-table-column prop="userName" label="姓名" align="center" :filters="filters" :filter-method="filterHandler"/>
        <el-table-column label="数量" align="center">
          <template #default="scope">
            <span :style="{color:scope.row.count >= labelStore.labelSkipNum ? 'red':'green'}">{{scope.row.count}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-divider>{{labelStore.skipList.length}}</el-divider>
    </div>
  </transition>
</template>
<script setup lang="ts">
import {useLabelStore} from "~/stores";
import {computed} from "#imports";
import {Tag} from "~/stores/types";
import {TableColumnCtx} from "element-plus/es/components/table/src/table-column/defaults";

const labelStore = useLabelStore()

const isShow = computed(() => {
  return labelStore.skipList.length > 0
})

const filters = computed(() => {
  let list = []
  for (let i = 0; i < labelStore.tagList.length; i++) {
    let item = {text: labelStore.tagList[i].userName, value: labelStore.tagList[i].userName}
    list.push(item)
  }
  return list
})

const filterHandler = (value: string,
                       row: Tag,
                       column: TableColumnCtx<Tag>) => {
  return row.userName === value
}
</script>
<style scoped>
.skip{
  border: 1px solid #dcdfe6;
  box-shadow: var(--el-box-shadow-light);
}
</style>
