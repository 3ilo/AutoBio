import { MemoryProps } from '../components/Memory'

const baseUrl = '/api/memories'

const getMemories = () => {
  return fetch(baseUrl, {credentials: 'include'})
}

const addMemory = (props: MemoryProps) => {
  const { title, content, date } = props;
  return fetch(baseUrl + '/add', {
    method: 'POST',
    body: JSON.stringify({title, contents: content, date}),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
      'Access-Control-Allow-Methods': 'OPTIONS,GET',
      'Access-Control-Allow-Origin': 'http://localhost:3001',
    },
    credentials: 'include',
  })
}

export { getMemories, addMemory }