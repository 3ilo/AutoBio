import { InputField, AlignmentType } from '../components/Commons';
import { generateImage } from '../services/generateImage'
import { useState } from "react";

export default function GenerateImage() {
    const [prompt, setPrompt] = useState("");
    const [img, setImg] = useState("");
  
    const handlePromptChange = (event: React.FormEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setPrompt(value)
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const imageObjectURL = URL.createObjectURL(await (await generateImage(prompt)).blob());
        setImg(imageObjectURL);
    }

    return (
        <div className="generateImage"> 
            <form className="generateImageForm" onSubmit={onSubmit}>
                <InputField 
                    className="generateImagePrompt"
                    alignment={AlignmentType.LEFT}
                    type="text"
                    name="genImage"
                    placeholder="generate"
                    value={prompt}
                    onChange={handlePromptChange}
                    required
                />
            </form>
            <>
                <img src={img} alt="icons" />
            </>
        </div>
    )
}