
const baseUrl = 'http://0.0.0.0:8000/api/generate'

const generateImage = async (prompt: string) => {
  return await fetch(baseUrl + '?prompt=' + prompt, {credentials: 'include', 
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
        'Access-Control-Allow-Origin': 'http://0.0.0.0:8000',
        },
    })
}

export { generateImage }