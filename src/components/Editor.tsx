import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  ref: any,
  value: string;
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = forwardRef((props) => {

  const quillRef = useRef<ReactQuill>(null);

  // Expose functions to parent component through useImperativeHandle
  useImperativeHandle(props.ref, () => ({
    // Insert image from URL into the editor
    insertImage: (url: string) => {
      console.log("test2")
      if (quillRef.current) {
        console.log("test3")
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range?.index ?? 0, 'image', url);
        console.log("test4")
      }
    },
    // Get current editor content, including images
    getEditorContent: () => {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        return editor.root.innerHTML; // Returns HTML content
      }
      return '';
    },
  }));

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['link', 'image'],
    ],
  };

  return (
    <div>
      <ReactQuill value={props.value} onChange={props.onChange} modules={modules} />
    </div>
  );
});

export default TextEditor;