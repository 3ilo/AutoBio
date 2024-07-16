
const checkToken = () => fetch('/api/auth/checkToken', {
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
    'Access-Control-Allow-Origin': 'http://localhost:3001',
  },
  credentials: 'include',
})

const logout = () => fetch('/api/auth/logout', {
    headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
    'Access-Control-Allow-Origin': 'http://localhost:3001',
  },
  credentials: 'include',
})

export { checkToken, logout }