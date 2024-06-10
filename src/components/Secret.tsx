import { useEffect, useState } from "react";

export default function Secret() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch('http://localhost:3001/api/secret').then(res => res.text())
        .then(res => setMessage(res));
    }, [])
    return (
    <div>
        <h1>Home</h1>
        <p>{message}</p>
    </div>
    );
}
  