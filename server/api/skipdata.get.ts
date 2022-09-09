import {useQuery} from "h3";
import axios from "axios";


export default defineEventHandler((event) => {
  const props = useQuery(event)
  return axios.get('http://114.116.41.110:4002/skipdata', {
    params: {
      sourceid: props.sourceid,
      stagename: props.stagename,
    }
  }).then(response => {
    return response.data
  })
})
