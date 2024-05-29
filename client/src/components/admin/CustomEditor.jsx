/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomEditor = ({
  name,
  labelText,
  defaultValue,
  setEditorContent,
  required = true,
}) => {
  const [value, setValue] = useState(defaultValue);
  const quill = useRef();

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        const res = await fetch('image-upload-api-url', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (quill.current) {
          const editor = quill.current.getEditor();
          const range = editor.getSelection();
          range && editor.insertEmbed(range.index, 'image', data.url);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
    'video',
    'color',
    'clean',
  ];

  return (
    <div className="form-row">
      <label htmlFor="name" className="form-label">
        {labelText || name}
        {required ? <span className="text-primary">*</span> : ''}
      </label>
      <ReactQuill
        ref={(el) => (quill.current = el)}
        theme="snow"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => {
          setValue(value);
          setEditorContent(value);
        }}
        placeholder="Nhập nội dung bài viết vào đây..."
      />
    </div>
  );
};
export default CustomEditor;
