import { useEffect, useState } from "react";

export default function Secret() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch('http://localhost:3001/api/secret', {
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
            'Access-Control-Allow-Methods': 'OPTIONS,GET',
            'Access-Control-Allow-Origin': 'http://localhost:3001',
          },
          credentials: 'include',
        }).then(res => res.text())
        .then(res => setMessage(res));
    }, [])
    return (
    <div>
        <h1>Home</h1>
        <p>{message}</p>
    </div>
    );
}
  