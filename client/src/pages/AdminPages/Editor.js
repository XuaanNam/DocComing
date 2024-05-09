import ReactQuill from "react-quill";
import { useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";

export default function Editor({ value, onChange, className }) {
  const inputRef = useRef(null);
  const quillRef = useRef(null);

  const imageHandler = () => {
    const file = inputRef.current.files[0];
    const fd = new FormData();
    fd.append("image", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/api/post/image", true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        // this is callback data: url
        const url = JSON.parse(xhr.responseText).data;
        insertToEditor(url);
      }
    };
    xhr.send(fd);
  };

  function insertToEditor(url) {
    // push image url to rich editor.
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    editor.insertEmbed(range.index, "image", url);
  }
  const modules = useMemo(() => {
    return {
      //history: [{ delay: 500 }, { maxStack: 100 }, { userOnly: false }],
      toolbar: {
        container: [
          [{ header: [1, 2, 3, true] }],
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
        handlers: {
          // handlers object will be merged with default handlers object
          image: () => inputRef.current.click(),
        },
      },
    };
  }, []);

  return (
    <div className="content w-[70%] mb-4 bg-white">
      <input ref={inputRef} hidden type="file" onChange={imageHandler} />
      <ReactQuill
        className={className}
        ref={quillRef}
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
        preserveWhitespace
      />
    </div>
  );
}
