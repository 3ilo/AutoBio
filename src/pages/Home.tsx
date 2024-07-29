import { useEffect, useState } from "react";
import GenerateImage from "../components/GenerateImage"

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
        <GenerateImage />
    </div>
    );
}
  