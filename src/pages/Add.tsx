import './styles/Add.css';
import { AlignmentType, SectionHeader, InputField } from '../components/Commons';
import { useState } from "react";

export default function Add() {

    const tOverview = "Add a memory to your Autobiography";

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState(new Date());
  
    const handleTitleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setTitle(value)
    }
    const handleContentChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setContent(value)
    }
    const handleDateChange = (event: React.FormEvent<HTMLInputElement>) => {
        const value = new Date(event.currentTarget.value);
        setDate(value)
    }
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('/api/memories/add', {
            method: 'POST',
            body: JSON.stringify({title, contents: content, date}),
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Headers': 'origin,content-type,content-length,user-agent,host,accept,authorization',
              'Access-Control-Allow-Methods': 'OPTIONS,GET',
              'Access-Control-Allow-Origin': 'http://localhost:3001',
            },
            credentials: 'include',
          })
          .then(res => {
            if (res.status === 200) {
                setTitle("");
                setContent("");
                setDate(new Date());
                alert("Your submission has been saved!")
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

    return (
      <div className="add">
        <SectionHeader className={"addDescription"} text={tOverview} 
            alignment={AlignmentType.CENTER}/>
        <form className="loginForm" onSubmit={onSubmit}>
        <InputField 
            className="titleInput"
            alignment={AlignmentType.CENTER}
            type="text"
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            required
        />
        <br />
        <InputField 
            className="contentInput"
            alignment={AlignmentType.CENTER}
            type="text"
            name="content"
            placeholder="Enter your content"
            value={content}
            onChange={handleContentChange}
            required
        />
        <br />
        <InputField 
            className="dateInput"
            alignment={AlignmentType.CENTER}
            type="date"
            name="date"
            placeholder="Enter date"
            value={date.toISOString().split('T')[0]}
            onChange={handleDateChange}
            required
        />
        <br />
        <InputField 
            className="submit"
            alignment={AlignmentType.LEFT}
            type="submit"
            value="Submit"
        />
      </form>
      </div>
    );
}
  