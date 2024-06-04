import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const AddCardPage = () => {
  const [value, setValue] = useState('');

  return (
    <div className="main">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules = {{
          toolbar: [
            ['bold', 'italic']
          ]}
        }
      />
    </div>
  );
};
