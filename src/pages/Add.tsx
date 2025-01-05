import './styles/Add.css';
import { AlignmentType, SectionHeader, InputField, CustomTextArea, CustomButton } from '../components/Commons';
import { useState, useRef } from "react";
import { addMemory } from '../services/memoriesService'
import GenerateImage from '../components/GenerateImage';
import TextEditor from '../components/Editor';

export default function Add() {

    const tOverview = "Add a memory to your Autobiography";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState<Date>(new Date());
    const [dateChanged, setDateChanged ] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [editorState, setEditorState] = useState<string>('');

    const textEditorRef = useRef<any>(null);

    const handleEditorChange = (change: string) => {
        console.log(editorState);
        setEditorState(change);
    };
    const handleInsertImage = (event: any) => {
        event.preventDefault()
        console.log(event)
        const imageUrl = 'https://s3-illustrations-devo.s3.us-west-2.amazonaws.com/1723870172920-milo%40gmail.com-Chess%20is%20the%20best.png'; // Example image URL
        if (textEditorRef.current) {
            console.log("test Milo")
            textEditorRef.current.insertImage(imageUrl); // Insert the image programmatically
        }
    };
    const handleGetEditorContent = (event: any) => {
        event.preventDefault()
        if (textEditorRef.current) {
            const content = textEditorRef.current.getEditorContent(); // Get current editor content
            console.log(content); // Logs HTML content of the editor
        }
    };
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
        addMemory({title, content, date, images: [imageUrl] })
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
        <button onClick={handleInsertImage}>Insert Image</button>
        <button onClick={handleGetEditorContent}>Get Editor Content</button>
        <TextEditor ref={textEditorRef} value={editorState} onChange={handleEditorChange} />
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
        {showImage && <GenerateImage title={title} text={content} imgUrlSetter={setImageUrl}/>}
        <br />
        <div className="row">
            <CustomButton 
                className="generate"
                alignment={AlignmentType.LEFT}
                text="Generate illustration"
                onClick={handleGenerate}
            />
            {/* <InputField 
                className="submit"
                alignment={AlignmentType.RIGHT}
                type="submit"
                value="Save"
            /> */}
        </div>
      </form>
      </div>
    );
}
  