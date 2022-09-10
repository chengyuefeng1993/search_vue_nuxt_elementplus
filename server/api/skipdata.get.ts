import {useQuery} from "h3";
import axios from "axios";


export default defineEventHandler(async (event) => {
  const props = useQuery(event)
  return await axios.get('http://114.116.41.110:4002/skipdata', {
    params: {
      sourceid: props.sourceid,
      stagename: props.stagename,
    }
  }).then(response => {
    return response.data
  })
})
