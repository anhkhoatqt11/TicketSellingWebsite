/** @format */

import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";

function EditorCustom({
  data,
  contentValue,
  setContentValue,
  disabled,
}: {
  data?: any;
  contentValue;
  setContentValue: any;
  disabled: boolean;
}) {
  return (
    <Editor
      id={process.env.NEXT_PUBLIC_TINYMCE_ID}
      disabled={disabled}
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
      initialValue={data?.content}
      value={contentValue}
      onEditorChange={(newValue) => {
        setContentValue(newValue);
      }}
      init={{
        width: "100%",
        height: 400,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",

          "code",
          "help",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "bold italic forecolor image | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        file_picker_types: "file image media",
        image_uploadtab: false,
      }}
    />
  );
}

export default EditorCustom;
