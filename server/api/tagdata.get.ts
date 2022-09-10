import {useQuery} from "h3";
import axios from "axios";


export default defineEventHandler(async (event) => {
  const props = useQuery(event)
  return await axios.get('http://114.116.41.110:4002/tagdata', {
    params: {
      sourceid: props.sourceid,
      stagename: props.stagename,
      tmstart: props.tmstart,
      tmstop: props.tmstop,
    }
  }).then(res => {
    return res.data
  })
})
