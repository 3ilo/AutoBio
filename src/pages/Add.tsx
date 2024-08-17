import './styles/Add.css';
import { AlignmentType, SectionHeader, InputField, CustomTextArea, CustomButton } from '../components/Commons';
import { useState } from "react";
import { addMemory } from '../services/memoriesService'
import GenerateImage from '../components/GenerateImage';

export default function Add() {

    const tOverview = "Add a memory to your Autobiography";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [dateChanged, setDateChanged ] = useState(false);
    const [showImage, setShowImage] = useState(false);
  
    const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setTitle(value)
    }
    const handleContentChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        setContent(value)
    }
    const handleDateChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = new Date(event.currentTarget.value);
        setDate(value)
        setDateChanged(true)
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addMemory({title, content, date, images: [] })
          .then(res => {
            if (res.status === 200) {
                setTitle("");
                setContent("");
                setDate(new Date());
                setDateChanged(false)
                alert("Your submission has been saved!")
            } else if (res.status == 401) {
                window.location.href = "/login";
            } else {
                res.text().then((text) => {
                    const error = new Error(text);
                    throw error;
                })
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error submitting memory please try again');
          });
    }

    const handleGenerate = () => {
        setShowImage(true)
    }

    return (
      <div className="add">
        <SectionHeader className={"addDescription"} text={tOverview} 
            alignment={AlignmentType.CENTER}/>
        <form className="addForm" onSubmit={onSubmit}>
        <InputField 
            className="titleInput"
            alignment={AlignmentType.CENTER}
            type="text"
            name="title"
            placeholder="Give it a title"
            value={title}
            onChange={handleTitleChange}
            required
        />
        <br />
        <InputField 
            className="dateInput"
            alignment={AlignmentType.CENTER}
            type="date"
            name="date"
            placeholder="Enter date"
            value={dateChanged ? date?.toISOString().split('T')[0] : undefined}
            onChange={handleDateChange}
            required
        />
        <br />
        <CustomTextArea 
            className="contentInput"
            alignment={AlignmentType.CENTER}
            name="content"
            placeholder="Describe your memory"
            value={content}
            onChange={handleContentChange}
            rows={20}
            cols={100}
            required
        />
        {showImage && <GenerateImage title={title} text={content}/>}
        <br />
        <div className="row">
            <CustomButton 
                className="generate"
                alignment={AlignmentType.LEFT}
                text="Generate illustration"
                onClick={handleGenerate}
            />
            <InputField 
                className="submit"
                alignment={AlignmentType.RIGHT}
                type="submit"
                value="Save"
            />
        </div>
      </form>
      </div>
    );
}
  