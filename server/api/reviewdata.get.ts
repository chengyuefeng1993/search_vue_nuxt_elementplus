import axios from "axios";
import {useQuery} from "h3";
import {Review} from "~/stores/types";


export default defineEventHandler(async (event) => {
  const props = useQuery(event)
  return await axios.get('http://114.116.41.110:4002/review',{
    params:{
      sourceid:props.sourceid,
      stagename:props.stagename,
      tmstart:props.tmstart,
      tmstop:props.tmstart,
      username:props.username,
      dataid:props.dataid,
      pagenum:props.pagenum,
      pagesize:props.pagesize
    }
  }).then(res => {
    console.log(res.data)
    return res.data
  })
})

