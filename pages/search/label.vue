<template>
  <div class="label">
    <LabelBar/>
    <div class="label-view" v-loading="labelStore.isLoading">
      <StageData/>
      <el-row :gutter="10" style="margin-top: 10px">
        <el-col :xs="24" :sm="16">
          <TagData/>
        </el-col>
        <el-col :xs="24" :sm="8">
          <SkipData/>
        </el-col>
      </el-row>
      <el-empty :image-size="300" v-show="labelStore.isEmpty"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import LabelBar from "~/components/labelcomp/LabelBar.vue";
import {useLabelStore} from "~/stores";
import StageData from "~/components/labelcomp/StageData.vue";
import TagData from "~/components/labelcomp/TagData.vue";
import SkipData from "~/components/labelcomp/SkipData.vue";
import {onMounted} from "#imports";

const labelStore = useLabelStore()
onMounted(() => {
  window.onfocus = () => {
    if (Object.getOwnPropertyNames(labelStore.stageList).length > 0) {
      labelStore.onLabelSearch()
    }
  }
})
</script>
<style scoped>
.label-view {
  padding: 10px;
}
</style>
