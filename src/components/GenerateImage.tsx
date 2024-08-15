import { InputField, AlignmentType, CustomButton } from '../components/Commons';
import { generateImage, generatePutImgUrl, putImage, generateSummary } from '../services/imageService'
import { useState, useEffect } from "react";
import { ColorRing } from "react-loader-spinner";

import './styles/GenerateImage.css';

export interface GenerateImageProps {
    text: string
    title: string
}

export default function GenerateImage(props: GenerateImageProps) {
    const [prompt, setPrompt] = useState("");
    const [img, setImg] = useState("");
    const [title, ] = useState(props.title);
    const [loading, setLoading] = useState(true);
  
    const handlePromptChange = (event: React.FormEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setPrompt(value)
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const imageObjectURL = blobToLink(await (await generateImage(prompt)).blob());
        setImg(imageObjectURL);
        setLoading(false);
    }

    const blobToLink = (blob: Blob) => {
        return URL.createObjectURL(blob);
    }

    const linkToBlob = async () => {
        return await (await fetch(img)).blob();
    }

    const handleGetSignedUrl = async (imgTitle: string) => {
        try {
            const response = await generatePutImgUrl(imgTitle);
            if (!response.ok) {
                throw new Error(`Error response status: ${response.status}`);
            }
            const data = await response.json();
            return data.putUrl;
        } catch (e) {
            console.error(`Error getching url: [${e}]`, e);
        }
    }

    const handleUploadImage = async () => {
        const signedPutUrl = await handleGetSignedUrl(title + '.png');
        const imgBlob = await linkToBlob();
        putImage(signedPutUrl, imgBlob);
    }

    const handleRegenerate = async () => {
        setLoading(true);
        const imageObjectURL = blobToLink(await (await generateImage(prompt)).blob());
        setImg(imageObjectURL);
        setLoading(false);
    }

    const handleGenerateSummary = async () => {
        const response = await generateSummary(props.text);
        console.log(response)
    }

    useEffect(() => {handleGenerateSummary()}, [])

    useEffect(() => {
        handleRegenerate();
    }, [prompt])

    return (
        <div className="other"> 
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

            <div className="generateImage"> 
                {loading ? 
                <div className="loader">
                    <ColorRing />
                </div> : 
                <div className="generatedImage">
                    <img className="diffusionImage" src={img} alt="icons"/>
                    <div className="row">
                        <CustomButton className="regenerateButton" text="Regenerate?" onClick={handleRegenerate}/>
                        <CustomButton className="looksGoodButton" text="Looks good" onClick={handleUploadImage}/> 
                    </div>
                </div>}
            </div>
        </div>
    )
}