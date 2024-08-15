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
        <GenerateImage title={"thanks chatgpt"} text={"In the dappled sunlight of a summer afternoon, eight-year-old Emma and her little brother Max were huddled under the sprawling oak tree in their backyard, constructing a makeshift fortress from old blankets and garden chairs. With each crinkle of fabric and creak of wood, they imagined themselves as brave adventurers on a quest to save a mythical kingdom. The air was filled with their laughter and the sweet scent of fresh-cut grass, while their mother’s voice occasionally drifted from the kitchen window, reminding them that dinner would soon be ready. As the sun dipped lower, casting long shadows across their fortress, Emma felt an overwhelming sense of contentment, as if their little world under the oak tree was the very center of the universe."}/>
    </div>
    );
}
  