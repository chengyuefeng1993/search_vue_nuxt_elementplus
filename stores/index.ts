import {defineStore} from "pinia";
import dayjs from "dayjs";
import {ElMessage} from "element-plus";
import {Stage, Tag, Skip, Review, DataType} from "~/stores/types";
import axios from "axios";

export const useMainStore = defineStore('main', {
  state() {
    return {
      routeUrl: '' as string,
    }
  },
  actions:{
    backToTop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
})

export const useLabelStore = defineStore('label', {
  state() {
    return {
      labelId: '' as string,
      labelTime: [
        dayjs().startOf('day').toDate(),
        dayjs().add(1, 'day').startOf('day').toDate()
      ] as [Date, Date],
      labelStageName: 'label' as string,
      labelSkipNum: 100 as number,
      stageList: {} as Stage,
      tagList: [] as Array<Tag>,
      skipList: [] as Array<Skip>,
      labelIsLoading: 0 as number,
    }
  },
  getters: {
    labelTimeStart(): number {
      return dayjs(this.labelTime[0]).valueOf()
    },
    labelTimeStop(): number {
      return dayjs(this.labelTime[1]).valueOf()
    },
    isEmpty() {
      return !(Object.getOwnPropertyNames(this.stageList).length > 0 || this.tagList.length > 0 || this.skipList.length > 0)
    },
    isLoading() {
      if (this.labelIsLoading == 0) {
        return false
      } else if (this.labelIsLoading == 1) {
        return true
      } else if (this.labelIsLoading == 2) {
        return true
      } else if (this.labelIsLoading == 3) {
        return true
      } else if (this.labelIsLoading == 4) {
        return false
      }
    }
  },
  actions: {
    onLabelSearch() {
      if (this.labelId != '') {
        this.labelIsLoading = 1
        this.getStageData()
        this.getTagData()
        this.getSkipData()
      } else {
        ElMessage({
          message: '请输入ID！',
          type: 'error',
          duration: 1500,
        })
      }
    },
    labelIdChange() {
      window.localStorage.setItem('labelId', this.labelId)
    },
    labelSkipNumChange() {
      window.localStorage.setItem('skipNum', this.labelSkipNum)
    },
    async getStageData() {
      await axios.get('https://stagedata-stagedata-eaugarneuh.cn-beijing.fcapp.run', {
        params: {
          sourceid: this.labelId,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.stageList = res.data.result
        } else {
          this.stageList = {}
        }
        this.labelIsLoading += 1
      })
    },
    async getTagData() {
      await axios.get('https://tagdata-stagedata-uouqjvmbbx.cn-beijing.fcapp.run', {
        params: {
          sourceid: this.labelId,
          stagename: this.labelStageName,
          tmstart: this.labelTimeStart,
          tmstop: this.labelTimeStop,
        }
      }).then(res => {
        if (res.data.code == 200) {
          let list = res.data.result
          this.tagList = list.splice(0, list.length - 2)
        } else {
          this.tagList = []
        }
        this.labelIsLoading += 1
      })
    },
    async getSkipData() {
      await axios.get('https://skipdata-stagedata-pvbxlvkfpc.cn-beijing.fcapp.run', {
        params: {
          sourceid: this.labelId,
          stagename: this.labelStageName,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.skipList = res.data.result
        } else {
          this.skipList = []
        }
        this.labelIsLoading += 1
      })
    },
  }
})


export const useReviewStore = defineStore('review', {
  state() {
    return {
      reviewId: '' as string,
      reviewTime: [
        dayjs().startOf('day').toDate(),
        dayjs().add(1, 'day').startOf('day').toDate()
      ] as [Date, Date],
      reviewStageName: 'allReview' as string,
      pageNum: 1 as number,
      pageSize: 30 as number,
      userName: '' as string,
      dataId: '' as string,
      reviewList: {} as Review,
      reviewIsLoading: false as boolean,
      isFilter: false as boolean,
      imgIsShow: false as boolean,
    }
  },
  getters: {
    reviewTimeStart(): number {
      return dayjs(this.reviewTime[0]).valueOf()
    },
    reviewTimeStop(): number {
      return dayjs(this.reviewTime[1]).valueOf()
    },
  },
  actions: {
    onReviewSearch() {
      if (this.reviewId != '') {
        this.reviewIsLoading = true
        this.getReviewData()
      } else {
        ElMessage({
          message: '请输入ID！',
          type: 'error',
          duration: 1500,
        })
      }
    },
    reviewIdChange() {
      window.localStorage.setItem('reviewId', this.reviewId)
    },
    async getReviewData() {
      await axios.get('https://reviewdata-stagedata-klpwugxcyu.cn-beijing.fcapp.run', {
        params: {
          sourceid: this.reviewId,
          stagename: this.reviewStageName,
          tmstart: this.reviewTimeStart,
          tmstop: this.reviewTimeStop,
          username: this.userName,
          dataid: this.dataId,
          pagenum: this.pageNum,
          pagesize: this.pageSize,
        }
      }).then(res => {
        if (res.data.code == 200) {
          this.reviewList = res.data.result
        } else {
          this.reviewList = {}
        }
        this.reviewIsLoading = false
      })
    },
  }
})
