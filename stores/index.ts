import {defineStore} from "pinia";
import dayjs from "dayjs";

export const useMainStore = defineStore('main',{
  state(){
    return {
      routeUrl:'' as string,
    }
  },
})

export const useLabelStore = defineStore('label',{
  state(){
    return {
      labelId:'' as string,
      labelTime:[
        dayjs().startOf('day').toDate(),
        dayjs().add(1,'day').startOf('day').toDate()
      ] as [Date,Date],
      labelStageName:'label' as string,
      labelSkipNum:100 as number,
    }
  },
  getters:{
    labelTimeStart():number{
      return dayjs(this.labelTime[0]).valueOf()
    },
    labelTimeStop():number{
      return dayjs(this.labelTime[1]).valueOf()
    },
  }
})
