import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
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
  };
  return (
    <div className="content w-[70%] mb-4 bg-white">
      <ReactQuill
        className=" text-lg"
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
