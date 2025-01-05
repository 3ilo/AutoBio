import { useEffect, useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("");
    useEffect(() => {
        fetch('/api/home').then(res => res.text())
        .then(res => setMessage(res));
    }, [])
    return (
    <div>
        <h1>Home</h1>
        <p>{message}</p>
    </div>
    );
}
  