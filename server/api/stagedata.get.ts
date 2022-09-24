import {defineEventHandler, useQuery} from "h3";

export default defineEventHandler((event) => {
  const data = useQuery(event)
  return {
    id:'111',
    name:'222'
  }
})
