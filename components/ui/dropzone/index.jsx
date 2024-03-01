import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useFieldArray } from 'react-hook-form';
import { FaX } from 'react-icons/fa6';

const ImageUpload = ({ control, name }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
    rules: {
      maxLength: 4
    }
  });

  const onDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({ file }));
    append(files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg']
    },
    maxFiles: 4
  });
  

  return (
    <div>
      <div {...getRootProps()} className="border-2 border-dashed border-cyan-300 p-5 mt-5 mb-5 text-center cursor-pointer">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
        {fields.map((field, index) => (
          <div key={field.id} className="relative">
            <img src={URL.createObjectURL(field.file)} alt={`Image ${index + 1}`} />
            <button className="absolute size-10 bg-white top-[-20px] right-[-20px] rounded-full flex items-center justify-center" type="button" onClick={() => remove(index)}>
              <FaX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
