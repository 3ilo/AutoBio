import { CustomButton } from '../components/Commons';
import { generateImage, generatePutImgUrl, putImage, generateSummary } from '../services/imageService'
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ColorRing } from "react-loader-spinner";

import './styles/GenerateImage.css';

export interface GenerateImageProps {
    text: string
    title: string
    imgUrlSetter?: Dispatch<SetStateAction<string>>
}

export default function GenerateImage(props: GenerateImageProps) {
    const [img, setImg] = useState("");
    const [loading, setLoading] = useState(true);

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
        props.title.replace('?','X')
        const signedPutUrl = await handleGetSignedUrl(props.title + '.png');
        const imageUrl = signedPutUrl.split('?')[0]
        props.imgUrlSetter && props.imgUrlSetter(imageUrl);
        const imgBlob = await linkToBlob();
        putImage(signedPutUrl, imgBlob);
    }

    const handleRegenerate = async () => {
        setLoading(true);
        const response = await generateSummary(props.text);
        const imageObjectURL = blobToLink(await (await generateImage(await response.text())).blob());
        setImg(imageObjectURL);
        setLoading(false);
    }

    useEffect(() => {handleRegenerate()}, [])

    return (
        <div className="other"> 
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