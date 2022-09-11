<template>
  <div class="video-view" :style="{borderColor:item.reviewUser==null?'red':'green'}">
    <div class="caption">
      <el-tooltip placement="top">
        <template #content>
          {{ item.caption }}
        </template>
        <span class="caption-text">{{ item.caption }}</span>
      </el-tooltip>
    </div>
    <div class="img-view" v-show="reviewStore.imgIsShow">
      <el-image :src="poster(item.name)" fit="contain" hide-on-click-modal lazy
                :preview-src-list="imageList(item.name,item.frameIdList.length)"
                preview-teleported style="width: 200px;height: 300px;"/>
    </div>
    <div class="info">
      <p><b style="font-size: 16px">{{ item.defaultCategory }}</b></p>
      <el-space :size="25">
        <span class="search-btn" @click="toVideo(item.name)">dataId:{{ item.dataId }}</span>
        <span class="search-btn" @click="toBaiDu(item.defaultCategory)">百度</span>
      </el-space>
      <br/>
      <el-space :size="25">
        <span class="search-btn" @click="toKwai(item.defaultCategory)">快手</span>
        <span class="search-btn" @click="toKwaiInner(item.defaultCategory)">快手内部</span>
      </el-space>
    </div>
    <el-divider style="margin: 5px 0"/>
    <div class="history-list">
      <p v-for="i in historyList">{{ i }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">

import {useReviewStore} from "~/stores";

const {item, historyList} = defineProps(['item', 'historyList'])
const reviewStore = useReviewStore()

const toVideo = (photoId: string) => {
  window.open(`https://ml.corp.kuaishou.com/media/api/video/trans?photoId=${photoId}`)
}
const toBaiDu = (q: string) => {
  window.open(`https://www.baidu.com/s?wd=${q}`)
}
const toKwai = (q: string) => {
  window.open(`https://www.kuaishou.com/search/video?searchKey=${q}`)
}
const toKwaiInner = (q: string) => {
  window.open(`https://ml.corp.kuaishou.com/v2/search/online-search?query=${q}`)
}
const toInnerUrl = (url: string) => {
  window.open(url)
}
const poster = (photoId: string) => `https://api.chengyuefeng.fun/getimage?photoid=${photoId}&frameid=h`
const imageList = (photoId: string, num: number) => {
  let list = [`https://api.chengyuefeng.fun/getimage?photoid=${photoId}&frameid=h`]
  for (let i = 0; i < num; i++) {
    let url = `https://api.chengyuefeng.fun/getimage?photoid=${photoId}&frameid=${i}`
    list.push(url)
  }
  return list
}
</script>
<style scoped>
.video-view {
  width: 280px;
  border-width: 1px;
  border-style: solid;
  padding: 5px;
  text-align: center;
  font-size: 14px;
}

.caption {
  height: 30px;
}

.caption-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.search-btn {
  cursor: pointer;
  color: #616367;
}

.search-btn:hover {
  color: #03a9f4;
}
</style>
