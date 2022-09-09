import axios from "axios";
import {useQuery} from "h3";


export default defineEventHandler((event) => {
  const props = useQuery(event)
  return axios.get('http://114.116.41.110:4002/stagedata', {
    params: {
      sourceid: props.sourceid
    }
  }).then(response => {
    return response.data
  })
})
