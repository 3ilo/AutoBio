const baseUrl = 'http://0.0.0.0:8000/api'

const generateImage = async (prompt: string) => {
  return await fetch(baseUrl + '/generate?prompt=' + prompt, {credentials: 'include', 
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
        'Access-Control-Allow-Origin': 'http://0.0.0.0:8000',
        },
    })
}

const generatePutImgUrl = function (imgTitle: string) {
  return fetch('/api/illustrations/generatePresignedUrl', {
    method: 'POST',
    body: JSON.stringify({title: imgTitle}),
    credentials: 'include', 
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        },
    })
}

const putImage = async (url: string, payload: Blob) => {
  await fetch(url, {
    method: "PUT",
    body: payload,
    headers: {
      "Content-Length": payload.size.toString(),
      'Content-Type': 'image/png',
      'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
      'Access-Control-Allow-Methods': 'OPTIONS,GET',
      'Access-Control-Allow-Origin': 'https://s3-illustrations-devo.s3.us-west-2.amazonaws.com',
    }
  });
}

const generateSummary = async (text: string) => {
  return await fetch(baseUrl + '/summarize?prompt=' + text, {credentials: 'include', 
    headers: {
        'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
        'Access-Control-Allow-Methods': 'OPTIONS,GET',
        'Access-Control-Allow-Origin': 'http://0.0.0.0:8000',
      },
  })
}

export { generateImage, generatePutImgUrl, putImage, generateSummary }