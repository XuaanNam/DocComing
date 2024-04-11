import ReactQuill from "react-quill";
import { useRef } from 'react';

export default function Editor({ value, onChange }) {

  const quillRef = useRef();

  const imageHandler = () =>{
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => { 
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn('You could only upload images.');
      }
    };
  }

  function saveToServer(file) {
    const fd = new FormData();
    fd.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/api/post/image', true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        // this is callback data: url
        const url = JSON.parse(xhr.responseText).data;
        insertToEditor(url);
      }
    };
    xhr.send(fd);
  }

  function insertToEditor(url) {  
    // push image url to rich editor. 
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    editor.insertEmbed(range.index, 'image', url);
  }
  const modules = {
    //history: [{ delay: 500 }, { maxStack: 100 }, { userOnly: false }],
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      // handlers: {
      //   // handlers object will be merged with default handlers object
      //  // image: imageHandler
      // }
    }
  };

  return (
    <div className="content w-[70%] mb-4 bg-white">
      <ReactQuill
        className=" text-lg"
        ref={quillRef}
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules} 
      />
    </div>
  );
}
